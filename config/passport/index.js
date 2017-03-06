'use strict'

const passport = require('passport')
const config = require('./configAuth')

function passportConfig(app) {
    const User = app.models.modelUsers

    passport.serializeUser((user, done) => {
        console.log('SerializeUser')
        done(null, user.id)
        // done(null, user)
    })

    // passport.deserializeUser((obj, done) => {
    //     done(null, obj)
    // })
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            console.log('deserializeUser \n')
            done(err, user)
        })
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
