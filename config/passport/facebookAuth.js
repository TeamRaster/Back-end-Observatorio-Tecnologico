// Autenticacion con Facebook
'use strict'

const passport = require('passport')
const facebookStrategy = require('passport-facebook')
const User = require('../../models/modelUsers')

// Configuraciones de keys
const configAuth = require('./configAuth')
function facebookConfig(app) {
  // todo separar en varios archivos para tener un mejor orden
  passport.use(new facebookStrategy({
    clientID     : configAuth.facebookAuth.clientID,
    clientSecret : configAuth.facebookAuth.clientSecret,
    callbackURL  : configAuth.facebookAuth.callbackURL
  },
  function (accessToken, refreshToken, profile, done) {
    console.log(profile)
    // retorna el nombre del usuario
    let username = profile._json.name.split(' ').join('.')
    console.log(username)
    // realiza una busqueda para ver si ya esta registrado
    User.findOne({
      'facebook.id': profile._json.id
    })
    .then(function (user) {
        if(user) {
          return done(null, user)
        } else {
          let newUser = new User({
            'facebook.id'   : profile.id,
            'facebook.name' : username
          })
          newUser.save(function (err) {
            if (!err) return done(null, user)
          })
        }
      })
  }))

  app.get('/auth/facebook', passport.authenticate('facebook'))
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/success',
    failureRedirect: '/',
  }))
}

module.exports = facebookConfig
