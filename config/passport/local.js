'use strict'

const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../../models/modelUsers')

function localConfig(app) {
  passport.use(new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function (username, password, done) {
    User.findOne({name: username})
    .then(function (user) {
      if (!user) {return done(null, false, { message: `Usuario: ${username} no existe`} )}
      if (user.password === password) return done(null, user)
      else done(null, false)
    })
  }))

  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/sign_in',
    failureFlash: true
  }))
}

module.exports = localConfig
