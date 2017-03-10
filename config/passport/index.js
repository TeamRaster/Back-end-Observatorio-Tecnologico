// 'use strict'
//
// const passport = require('passport')
//     , config = require('./configAuth')
//
// function passportConfig(app) {
//     let User = app.models.modelUsers
//
//     passport.serializeUser(function(user, done) {
//         console.log('\n[Passport.index.serialize]: Entrando al metodo serializeUser')
//         done(null, user.id)
//     })
//
//     // used to deserialize the user
//     passport.deserializeUser(function(id, done) {
//         console.log('\n[Passport.index.serialize]: Entrando al metodo deserializeUser')
//         User.findById(id, function(err, user) {
//             console.log(`\n[Passport.index.serialize]: User: ${user}`)
//             done(err, user)
//         })
//     })
//
//     app.use(passport.initialize())
//     app.use(passport.session())
//
//     require('./facebookAuth')(app, passport, config)  // Configuracion Facebook autenticacion
//     require('./twitterAuth')(app, passport, config)  // Configuracion Twitter autenticacion
//     require('./linkedinAuth')(app, passport, config)  // Configuracion Linkedin autenticacion
//     require('./localAuth')(app, passport, config)  // Configuracion Local autenticacion
// }
//
// module.exports = passportConfig
