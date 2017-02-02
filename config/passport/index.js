'use strict'

const passport = require('passport')
const User = require('../../models/modelUsers')

function passportConfig(app) {
    // Passport middlewares
    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser(function(obj, done) {
        done(null, obj)
    })

    app.use(passport.initialize())
    app.use(passport.session())

    // Configuracion facebook autenticacion
    require('./facebookAuth')(app)
}

module.exports = passportConfig
