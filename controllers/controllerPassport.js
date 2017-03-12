'use strict'

const LocalStrategy = require('passport-local').Strategy
    , FacebookStrategy = require('passport-facebook').Strategy
    , LinkedinStrategy = require('passport-linkedin').Strategy
    , TwitterStrategy = require('passport-twitter').Strategy
    , configAuth = require('../config/configAuth')
    , passport = require('passport')
    , moment = require('moment')  // Modulo para el tiempo

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
                    if (!user || !user.password) {
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
            console.log(`\n[controllerPassport.Facebook]: Perfil que llega: \n${JSON.stringify(profile)}`)
            if (!req.user) {  // Verifica si el usuario no esta logeado de manera local
                User.findOne({ 'facebook.id' : profile.id}, (err, user) => {
                    if (err)
                        return done(err)  // Si hay error retorna el error
                    if (user) {  // Si hay registro de un usuario
                        if (!user.facebook.token) {  // Pero no hay token (El usuario fue eliminado)
                            user.facebook.id     = profile.id
                            user.facebook.token  = accessToken
                            user.username        = profile.displayName
                            user.photo           = (profile.photos[0].value) ? profile.photos[0].value : ''  // Si existe una foto del perfil
                            user.updateDate.hour = moment().format('LT')  // Ingresa el formato de la hora
                            user.updateDate.date = moment().format('L')  // Ingresa el formato de la fecha

                            if (!user.provider)
                                user.provider = 'facebook'

                            user.save(err => {
                                if (err)
                                    return done(err)
                                req.flash('success', 'Se ha restaurado tu cuenta vinculada con Facebook')
                                return done(null, user)
                            })
                        }
                        return done(null, user) // Si ya existe, no se puede registrar dos veces
                    } else {  // Si no hay usuario se crea uno nuevo
                        let newUser = new User()
                        newUser.facebook.id       = profile.id
                        newUser.facebook.token    = accessToken
                        newUser.username          = profile.displayName
                        newUser.photo             = (profile.photos[0].value) ? profile.photos[0].value : ''
                        newUser.provider          = 'facebook'
                        newUser.creationDate.hour = moment().format('LT')
                        newUser.creationDate.date = moment().format('L')

                        newUser.save(err => {
                            if (err)
                                return done(err)
                            req.flash('success', 'Te has registrado por la opcion de Facebook')
                            return done(null, newUser)
                        })
                    }
                })
            } else {  // Si hay usuario con sesion iniciada(cuenta local), se vincula con la cuenta de facebook
                let user = req.user
                user.facebook.id     = profile.id
                user.facebook.token  = accessToken
                user.updateDate.hour = moment().format('LT')
                user.updateDate.date = moment().format('L')

                if (!user.username)  // Si no hay un nombre de usuario
                    user.username = profile.displayName
                else if (user.photo === '')
                    user.photo = (profile.photos[0].value) ? profile.photos[0].value : ''

                user.save(err => {
                    if (err)
                        return done(err)
                    req.flash('success', 'Tu cuenta ha sido vinculada con tu perfil de Facebook')
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
            console.log(`\n[controllerPassport.Twitter]: Perfil que llega: \n${JSON.stringify(profile)}`)
            if (!req.user) {
                User.findOne({ 'twitter.id' : profile.id }, (err, user) => {
                    if (err)
                        return done(err)
                    if (user) {  // Si hay registro de un usuario
                        if (!user.twitter.token) {  // Pero no hay token, posiblemente se borro
                            user.twitter.id      = profile.id  // Id del usuario de twitter
                            user.twitter.token   = token  // Clave secreta generada para la autenticacion
                            user.username        = profile.displayName  // Usa el nombre que tiene la cuenta
                            user.photo           = (profile.photos[0].value) ? profile.photos[0].value : ''
                            user.updateDate.hour = moment().format('LT')  // Ingresa el formato de la hora
                            user.updateDate.date = moment().format('L')  // Ingresa el formato de la fecha

                            if (!user.provider)  // Si no hay registro del metodo de registro
                                user.provider = 'twitter'  // Metodo de registro

                            user.save(err => {
                                if (err)
                                    return done(err)
                                req.flash('success', ' Se ha restaurado tu cuenta vinculada con Twitter')
                                return done(null, user)
                            })
                        }
                        return done(null, user)  // Si hay token, ya esta registrado
                    } else {  // Si no existe, crea un nuevo registro
                        let newUser = new User()
                        newUser.twitter.id        = profile.id
                        newUser.twitter.token     = token
                        newUser.username          = profile.displayName
                        newUser.photo             = (profile.photos[0].value) ? profile.photos[0].value : ''
                        newUser.provider          = 'twitter'
                        newUser.creationDate.hour = moment().format('LT')  // Ingresa el formato de la hora
                        newUser.creationDate.date = moment().format('L')  // Ingresa el formato de la fecha

                        newUser.save((err) => {
                            if (err)
                                return done(err)
                            req.flash('success', 'Te has registrado por la opcion de Twitter')
                            return done(null, newUser)
                        })
                    }
                })
            } else {  // Si hay sesion local iniciada, vinculamos con twitter
                let user = req.user
                user.twitter.id      = profile.id
                user.twitter.token   = token
                user.updateDate.hour = moment().format('LT')  // Ingresa el formato de la hora
                user.updateDate.date = moment().format('L')  // Ingresa el formato de la fecha

                if (!user.username)  // Si no hay un nombre de usuario
                    user.username = profile.displayName
                else if (user.photo === '')  // Si aun no cuenta con foto
                    user.photo = (profile.photos[0].value) ? profile.photos[0].value : ''  // Usa foto de la cuenta

                user.save(err => {
                    if (err)
                        return done(err)
                    req.flash('success', 'Tu cuenta ha sido vinculada con tu perfil de Twitter')
                    return done(null, user)
                })
            }
        })
    }))

// Linkedin ############################################################################################################
    let LKStrategy = configAuth.linkedinAuth

    passport.use(new LinkedinStrategy(LKStrategy,
    (req, token, tokenSecret, profile, done) => {
        process.nextTick(() => {
            console.log(`\n[controllerPassport.Linkedin]: Perfil que llega: ${JSON.stringify(profile)}`)
            if (!req.user) {  // Si no hay sesion iniciada
                User.findOne({ 'linkedin.id' : profile.id }, (err, user) => {
                    if (err)
                        return done(err)  // Si hay errores, retorna el error
                    if (user) {  // Si hay registros pero no estan completos, por ejemplo, tiene el token pero si el id
                        if (!user.linkedin.token) {  // Se completan los datos faltantes
                            user.linkedin.id     = profile.id  // Id que retorna el api
                            user.linkedin.token  = token  // Clave secreta generada para la autenticacion
                            user.username        = profile.displayName  // Usa el nombre que tiene la cuenta
                            user.updateDate.hour = moment().format('LT')  // Ingresa el formato de la hora
                            user.updateDate.date = moment().format('L')  // Ingresa el formato de la fecha

                            if (!user.provider)  // Si no hay registro del metodo de registro
                                user.provider = 'linkedin'  // Metodo de registro

                            user.save(err => {
                                if (err)
                                    return done(err)
                                req.flash('success', 'Se ha restaurado tu cuenta vinculada con Linkedin')
                                return done(null, user)
                            })
                        }
                        return done(null, user)
                    } else {  // Creacion de un nuevo usuario desde 0
                        let newUser = new User()
                        newUser.linkedin.id       = profile.id
                        newUser.linkedin.token    = token
                        newUser.username          = profile.displayName
                        newUser.provider          = 'linkedin'
                        newUser.creationDate.hour = moment().format('LT')  // Ingresa el formato de la hora
                        newUser.creationDate.date = moment().format('L')  // Ingresa el formato de la fecha

                        newUser.save(err => {
                            if (err)
                                return done(err)
                            req.flash('success', 'Te has registrado por la opcion de Linkedin')
                            return done(null, newUser)
                        })
                    }
                })
            } else {  // si ya hay sesion iniciada, vinculamos
                let user = req.user
                user.linkedin.id     = profile.id
                user.linkedin.token  = token
                user.updateDate.hour = moment().format('LT')  // Ingresa el formato de la hora
                user.updateDate.date = moment().format('L')  // Ingresa el formato de la fecha

                if(!user.username)  // Si no existe un nombre de usuario
                    user.username = profile.displayName  // Usa el nombre de usuario de la cuenta

                user.save(err => {
                    if (err)
                        return done(err)
                    req.flash('success', 'Tu cuenta ha sido vinculada con tu perfil de Linkedin')
                    return done(null, user)
                })
            }
        })
    }))
}
