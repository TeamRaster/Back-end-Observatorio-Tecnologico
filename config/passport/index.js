'use strict'

const passport = require('passport')

function passportConfig(app) {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    done(null, user)
  })

  // Configuracion autenticacion de usuario local
  require('./local')(app)
  // Configuracion facebook autenticacion
  require('./facebook')(app)
}

module.exports = passportConfig
