// Autenticacion con Facebook
'use strict'

const passport = require('passport')
const facebookStrategy = require('passport-facebook')
const User = require('../../models/modelUsers')

function facebookConfig(app) {
  passport.use(new facebookStrategy({
    clientID: '196096000859413',
    clientSecret: '60f39e62bfca0fe5662cd39abc5afa89',
    callbackURL: '/auth/facebook/callback'
  },
  function (accessToken, refreshToken, profile, done) {
    let username = profile._json.name.split(' ').join('.')
    console.log(username);
    User.findOne({'facebook.id': profile._json.id})
      .then(function (user) {
        if(user) {
          return done(null, user)
        } else {
          let user = new User({
            name: username,
            'facebook.id': profile._json.id
          })
          user.save(function (err) {
            if (!err) return done(null, user)
            console.log(user + ' Usuario guardado exitosamente');
          })
        }
      })
  }))

  app.get('/auth/facebook', passport.authenticate('facebook'))
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/sign_in',
  }))
}

module.exports = facebookConfig
