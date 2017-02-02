'use strict'

const passport = require('passport')

const config = require('./configAuth')
const User = require('../../models/modelUsers')

function passportConfig(app) {
    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser((obj, done) => {
        // User.findById(user.id, function(err, user) {
        //     done(err, user)
        // })
        done(null, obj)
    })

    app.use(passport.initialize())
    app.use(passport.session())

    // Configuracion Facebook autenticacion
    require('./facebookAuth')(app, passport, config)
    // Configuracion Twitter autenticacion
    require('./twitterAuth')(app, passport, config)
    // Configuracion Local autenticacion
    require('./linkedinAuth')(app, passport, config)
}

module.exports = passportConfig
