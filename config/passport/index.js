'use strict'

const passport = require('passport')
const User = require('../../models/modelUsers')

function passportConfig(app) {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

  // Configuracion facebook autenticacion
  require('./facebookAuth')(app)
}

module.exports = passportConfig
