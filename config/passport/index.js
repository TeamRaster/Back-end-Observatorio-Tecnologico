'use strict'

const passport = require('passport')

function passportConfig(app) {
  console.log('configuracion de passport');
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    done(null, user)
  })

  require('./local')(app)
}

module.exports = passportConfig
