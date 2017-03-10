'use strict'

const LocalStrategy = require('passport-local').Strategy
    , FacebookStrategy = require('passport-facebook').Strategy
    , LinkedinStrategy = require('passport-linkedin').Strategy
    , TwitterStrategy = require('passport-twitter').Strategy
    , configAuth = require('../config/configAuth')
    , passport = require('passport')

module.exports = (app) => {
    let User = app.models.modelUsers

    passport.serializeUser(function(user, done) {
        console.log('\n[controllerPassport.index.serialize]: Entrando al metodo serializeUser')
        done(null, user.id)
    })

    passport.deserializeUser(function(id, done) {
        console.log('\n[controllerPassport.index.deserializeUser]: Entrando al metodo deserializeUser')
        User.findById(id, function(err, user) {
            console.log(`[controllerPassport.index.deserializeUser]: Usuario que se va a deserializar\n${user}`)
            done(err, user)
        })
    })

    app.use(passport.initialize())
    app.use(passport.session())

// Local Singin ########################################################################################################
    passport.use('local-signin', new LocalStrategy({
            usernameField     : 'email',
            passwordField     : 'password',
            passReqToCallback : true  // Agrega la peticion para que pueda ser pasada por parametro

        },
        (req, email, password, done) => {  // Parametros que recibe
            console.log(`\n[controllerPassport.local-signin]: Username que se va a comparar: ${email}`)
            console.log(`\n[controllerPassport.local-signin]: Password que se va a comparar: ${password}`)
            if (email)
                email = email.toLowerCase()
            process.nextTick(() => {
                User.findOne({ 'local.email' : email }, (err, user) => {
                    if (err) {
                        console.log(`\n[controllerPassport.local-signin]: (1)=> Existe un error en local-signin ${err}`)
                        return done(err)
                    }
                    if (!user) {
                        console.log('\n[controllerPassport.local-signin]: (2)=> No existe registros de este usuario')
                        return done(null, false, req.flash('err', 'Usuario no encontrado en la base de datos'))
                    } else {
                        console.log(`\n[controllerPassport.local-signin]: (3)=> Usuario encontrado: ${user}\n`)
                        if (!user.comparePassword(password, user.local.password)) {  // Si NO coincide la contraseña
                            console.log('\n[controllerPassport.local-signin]: (3)(1)=> El usuario y/o la contraseña no coinciden')
                            return done(null, false, req.flash('err', 'Ups. El usuario y/o contraseña con coinciden'))
                        } else {  // Si la contraseña coincide
                            console.log('\n[controllerPassport.local-signin]: (3)(1)=> Listo, Estas autenticado')
                            return done(null, user, req.flash('info', 'Bienvenido'))
                        }
                    }
                })
            })
        }))

// Local Singup ########################################################################################################
    passport.use('local-signup', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        (req, email, password, done) => {
            if (email)
                email = email.toLowerCase()  // El correo siempre ira en mayusculas
            console.log(`\n[controllerPassport.local-signup]: Correo recibido ${email}`)
            console.log(`[controllerPassport.local-signup]: Contraseña recibida ${password}`)
            process.nextTick(() => {
                if (!req.user) {  // Mientras el usuario no este logeado
                    User.findOne({ email :  email }, function(err, user) {
                        if (err)  // si exixte algun error
                            return done(err)
                        if (user) {  // Si ya existe un usuario registrado
                            return done(null, false, req.flash('err', 'Ups, parece que este correo ya esta ocupado'))
                        } else {  // si no hay un usuario, crea uno nuevo
                            let user = new User()
                            console.log(`\n[controllerPassport.local-signup]: Contraseña encriptada ${user.hashPassword(password)}\n`)
                            user.local.email     = email
                            user.local.password  = user.hashPassword(password)
                            user.save( err => {  // Guardar el nuevo usuario creado
                                if (!err) {
                                    console.log('\n[ControllerPassport.local-signup]: Usuario guardado con exito usando local Singup')
                                    req.flash('info', '[Servidor]: Los datos se han guardado con exito')
                                    return done(null, user)
                                } else {
                                    console.log(`\n[ControllerPassport.local-signup]: Ups! parece que hubo un error => ${err}`)
                                    req.flash('err', '[Servidor]: Ups! parece que hubo un error')  // Mensaje de error
                                    return done(err)
                                }
                            })
                        }

                    })
                } else if ( !req.user.email ) {  // Si esta logeado pero no con una cuenta local
                    User.findOne({ email : email}, function(err, user) {
                        if (err)
                            return done(err)
                        if (user) {
                            return done(null, false, req.flash('err', 'Ups, parece que este correo ya esta ocupado'))
                        } else {
                            let user = req.user
                            user.email    = email
                            user.password = user.hashPassword(password)
                            user.save(err => {
                                if (err)
                                    return done(err)
                                return done(null,user)
                            })
                        }
                    })
                } else {
                    // Si el usuario actual ya tiene una cuenta local, ignoramos el registro(Debe desconectarse antes de intentar crear una nueva cuenta)
                    return done(null, req.user)
                }
            })
        }))

// Facebook ############################################################################################################
    let FBStrategy = configAuth.facebookAuth

    passport.use(new FacebookStrategy(FBStrategy,
    (req, accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
            console.log(`\n[Controller.Facebook]: Perfil que llega: ${JSON.stringify(profile)}`)
            if (!req.user) {  // Verifica si el usuario no esta logeado de manera local
                User.findOne({ 'facebook.id' : profile.id}, (err, user) => {
                    if (err)
                        return done(err)  // Si hay error retorna el error
                    if (user) {  // Si hay registro de un usuario
                        if (!user.facebook.token) {  // Pero no hay token (El usuario fue eliminado)
                            user.facebook.token = accessToken
                            user.facebook.name  = profile._json.name
                            user.facebook.email = (profile._json.emails) ? profile._json.emails[0].value.toLowerCase() : ''
                            user.photo = (profile._json.url) ? profile._json.url : ''  // Si existe una foto del perfil
                            user.save(err => {
                                if (err)
                                    return done(err)
                                return done(null, user)
                            })
                        }
                        return done(null, user) // Si ya existe, no se puede registrar dos veces
                    } else {  // Si no hay usuario se crea uno nuevo
                        let newUser = new User()
                        // Guardamos los datos necesarios para la parte de facebook
                        newUser.facebook.id    = profile.id
                        newUser.facebook.token = accessToken
                        newUser.facebook.name  = profile._json.name
                        newUser.facebook.email = (profile._json.emails) ? profile._json.emails[0].value.toLowerCase() : ''
                        newUser.photo = (profile._json.url) ? profile._json.url : ''  // Si existe una foto del perfil
                        newUser.save(err => {
                            if (err)
                                return done(err)
                            return done(null,newUser)
                        })
                    }
                })
            } else {  // Si hay usuario con sesion iniciada, se vincula con la cuenta de facebook
                let user = req.user
                user.facebook.id    = profile.id
                user.facebook.token = accessToken
                user.facebook.name  = profile._json.name
                user.facebook.email = (profile._json.emails) ? profile._json.emails[0].value.toLowerCase() : ''
                user.photo = (profile._json.url) ? profile._json.url : ''  // Si existe una foto del perfil
                user.save(err => {
                    if (err)
                        return done(err)
                    return done(null,user)
                })
            }
        })
    }))

// Twitter #############################################################################################################
    let TTStrategy = configAuth.twitterAuth

    passport.use(new TwitterStrategy(TTStrategy,
    (req, token, tokenSecret, profile, done) => {
        process.nextTick(() => {
            console.log(`\n[Controller.Twitter]: Perfil que llega: ${JSON.stringify(profile)}`)
            if (!req.user) {
                User.findOne({ 'twitter.id' : profile.id }, (err, user) => {
                    if (err)
                        return done(err)
                    if (user) {  // Si hay registro de un usuario
                        if (!user.twitter.token) {  // Pero no hay token, posiblemente se borro
                            user.twitter.token       = token
                            user.twitter.username    = profile.username
                            user.twitter.displayName = profile.displayName

                            user.save(err => {
                                if (err)
                                    return done(err)
                                return done(null, user)
                            })
                        }
                        return done(null, user)  // Si hay token, ya esta registrado
                    } else {  // Si no existe, crea un nuevo registro
                        let newUser = new User()
                        newUser.twitter.id          = profile.id
                        newUser.twitter.token       = token
                        newUser.twitter.username    = profile.username
                        newUser.twitter.displayName = profile.displayName

                        newUser.save((err) => {
                            if (err) throw err
                            return done(null, newUser)
                        })
                    }
                })
            } else {  // Si hay sesion local iniciada, vinculamos con twitter
                let user = req.user
                user.twitter.id          = profile.id
                user.twitter.token       = token
                user.twitter.username    = profile.username
                user.twitter.displayName = profile.displayName

                user.save(err => {
                    if (err)
                        return done(err)
                    return done(null, user)
                })
            }
        })
    }))

// Linkedin ############################################################################################################
    let LKStrategy = configAuth.linkedinAuth

    passport.use(new LinkedinStrategy(LKStrategy,
    (req, token, tokenSecret, profile, done) => {
        // process.nextTick(() => {
        //     console.log(`\n[Controller.Linkedin]: Perfil que llega: ${JSON.stringify(profile)}`)
        //     if (!req.user) {  // Si no hay sesion iniciada
        //         User.findOne({ 'twitter.id' : profile.id }, (err, user) => {
        //             if (err)
        //                 return done(err)
        //             if (user) {
        //                 if (!user.linkedin.token) {  // Pero no hay token, posiblemente se borro
        //                     user.linkedin.id          = profile.id
        //                     user.linkedin.token       = token
        //                     user.linkedin.username    = profile._json.firstName + ' ' + profile._json.lastName
        //                     user.linkedin.displayName = profile.displayName
        //
        //                     user.save(err => {
        //                         if (err)
        //                             return done(err)
        //                         return done(null, user)
        //                     })
        //                 }
        //                 return done(null, user)
        //             }
        //             else {
        //                 let newUser = new User()
        //                 newUser.linkedin.id          = profile.id
        //                 newUser.linkedin.token       = token
        //                 newUser.linkedin.username    = profile._json.firstName + ' ' + profile._json.lastName
        //                 newUser.linkedin.displayName = profile.displayName
        //
        //                 newUser.save(err => {
        //                     if (err)
        //                         return done(err)
        //                     return done(null, newUser)
        //                 })
        //             }
        //         })
        //     } else {  // si ya hay sesion iniciada, vinculamos
        //         let user = req.user
        //         user.linkedin.id          = profile.id
        //         user.linkedin.token       = token
        //         user.linkedin.username    = profile._json.firstName + ' ' + profile._json.lastName
        //         user.linkedin.displayName = profile.displayName
        //
        //         user.save(err => {
        //             if (err)
        //                 return done(err)
        //             return done(null, user)
        //         })
        //     }
        // })
    }))
}
