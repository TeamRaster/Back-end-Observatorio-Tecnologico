'use strict'

const passport = require('passport')
const config = require('./configAuth')
const models = require('../../models')

function passportConfig(app) {
    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser((obj, done) => {
        done(null, obj)
        // models.modelUsers.findById(id, (err, user) => {
        // })
    })

    app.use(passport.initialize())
    app.use(passport.session())

    // Configuracion Facebook autenticacion
    require('./facebookAuth')(app, passport, config)
    // Configuracion Twitter autenticacion
    require('./twitterAuth')(app, passport, config)
    // Configuracion Linkedin autenticacion
    require('./linkedinAuth')(app, passport, config)
    // Configuracion Local autenticacion
    require('./localAuth')(app, passport, config)
}

module.exports = passportConfig
