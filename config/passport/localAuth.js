// 'use strict'
//
// const LocalStrategy = require('passport-local').Strategy
//
// // let User = require('../../models/modelUsers')
// function localConfig(app, passport, config) {
//     const User = app.models.modelUsers
//
//     passport.use('local-login', new LocalStrategy({
//         usernameField     : config.localAuth.username,
//         passwordField     : config.localAuth.password,
//         passReqToCallback : true  // Agrega la peticion para que pueda ser pasada por parametro
//
//     },
//     (req, email, password, done) => {  // Parametros que recibe
//         console.log(`\n[Passport.localAuth]: Username que se va a comparar: ${email}`)
//         console.log(`\n[Passport.localAuth]: Password que se va a comparar: ${password}`)
//         if (email)
//             email = email.toLowerCase()
//         process.nextTick(function () {
//             User.findOne({ email : email }, (err, user) => {
//                 if (err) {
//                     console.log(`\n[Passport.localAuth]: (1)=> Existe un error en localAuth ${err}`)
//                     return done(err)
//                 }
//                 if (!user) {
//                     console.log('\n[Passport.localAuth]: (2)=> No existe registros de este usuario')
//                     return done(null, false, req.flash('error', 'Usuario no encontrado en la base de datos'))
//                 } else {
//                     console.log(`\n[Passport.localAuth]: (3)=> Usuario encontrado: ${user}\n`)
//                     user.comparePassword(password, user.password, function (err, isMatch) {
//                         if (err) {
//                             console.log(`\n[Passport.localAuth]: (3)(1)=> Error al comparar las contraseñas ${err}`)
//                             return  done(null, false, req.flash('error', 'Ups. Hubo un error en auth local'))
//                         }
//                         else if (!isMatch) {
//                             console.log('\n[Passport.localAuth]: (3)(2)=> El usuario y/o la contraseña no coinciden')
//                             return done(null, false, req.flash('error', 'Ups. El usuario y/o contraseña con coinciden'))
//                         }
//                         else {
//                             console.log('\n[Passport.localAuth]: (3)(3)=> Listo, Estas autenticado')
//                             return done(null, user, req.flash('info', 'Bienvenido'))
//                         }
//                     })
//                 }
//             })
//         })
//     }))
//
//     app.post('/auth/local', passport.authenticate('local-login', {
//         successRedirect  : config.successRedirect,
//         failureRedirect  : config.failureRedirect,
//         failureFlash     :  true,
//     }))
// }
//
//
// module.exports = localConfig
