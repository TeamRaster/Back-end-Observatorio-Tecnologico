'use strict'

const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../../models/modelUsers')

function facebookConfig(app, passport, config) {
    passport.use(new FacebookStrategy({
        clientID       : config.facebookAuth.clientID,
        clientSecret   : config.facebookAuth.clientSecret,
        callbackURL    : config.facebookAuth.callbackURL,
        profileFields  : ['id', 'emails', 'displayName', 'picture']

    }, (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
            User.findOne({ providerId : profile.id}, (err, user) => {
                if (err) return done(err)
                if (user) return done(null, user)
                else {
                    let newUser = new User()
                    newUser.providerId  = profile.id
                    newUser.username    = profile.displayName
                    newUser.photo       = profile.photos[0].value
                    newUser.provider    = 'Facebook'

                    newUser.save((err) => {
                        if (err) throw err
                        return done(null, newUser)
                    })
                }
            })
        })
    }))
    app.get('/auth/facebook', passport.authenticate('facebook'))
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect  : config.successRedirect,
        failureRedirect  : config.failureRedirect
    }))
}


module.exports = facebookConfig
