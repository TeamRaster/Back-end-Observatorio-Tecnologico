// Autenticacion con Facebook
'use strict'

const passport = require('passport')
const FacebookStrategy = require('passport-facebook')
// const TwitterStrategy = require('passport-twitter')
const User = require('../../models/modelUsers')

const config = require('./configAuth')

function facebookConfig(app) {
    passport.use(new FacebookStrategy({
        clientID: config.facebookAuth.clientID,
        clientSecret: config.facebookAuth.clientSecret,
        callbackURL: config.facebookAuth.callbackURL,
        profileFields: ['id', 'emails', 'displayName', 'picture']
        }, (accessToken, refreshToken, profile, done) => {
            process.nextTick(() => {
                User.findOne({'facebook.id': profile.id}, (err, user) => {
                    if (err) return done(err)
                    if (user) return done(null, user)
                    else {
                        console.log('Entrando a crear un usuario')
                        let newUser = new User()
                        newUser.facebook.id = profile.id
                        newUser.facebook.name = profile.displayName
                        newUser.facebook.photo = profile.photos[0].value
                        newUser.facebook.provider = 'facebook'

                        newUser.save((err) => {
                            if (err) throw err
                            return done(null, newUser)
                        })
                    }
                })
            })
        }
    ))
    app.get('/auth/facebook', passport.authenticate('facebook'))
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/user',
        failureRedirect: '/sign_in'
    }))
}


module.exports = facebookConfig
