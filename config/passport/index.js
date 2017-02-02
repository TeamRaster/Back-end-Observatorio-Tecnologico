'use strict'

const passport = require('passport')
const config = require('./configAuth')

function passportConfig(app) {
    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser(function(obj, done) {
        done(null, obj)
    })

    app.use(passport.initialize())
    app.use(passport.session())

    // Configuracion Facebook autenticacion
    require('./facebookAuth')(app, passport, config)
    // Configuracion Twitter autenticacion
    require('./twitterAuth')(app, passport, config)
    // Configuracion Local autenticacion
    // require('./twitterAuth')(app, passport, config)
}

module.exports = passportConfig
