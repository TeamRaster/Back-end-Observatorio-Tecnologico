'use strict'

const FacebookStrategy = require('passport-facebook')
const User = require('../../models/modelUsers')

function facebookConfig(app, passport, config) {
    passport.use(new FacebookStrategy({
        clientID       : config.facebookAuth.clientID,
        clientSecret   : config.facebookAuth.clientSecret,
        callbackURL    : config.facebookAuth.callbackURL,
        profileFields  : ['id', 'emails', 'displayName', 'picture']

    }, (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
            User.findOne({'facebook.id': profile.id}, (err, user) => {
                if (err) return done(err)
                if (user) return done(null, user)
                else {
                    let newUser = new User()
                    newUser.facebook.id = profile.id
                    newUser.facebook.name = profile.displayName
                    newUser.facebook.photo = profile.photos[0].value
                    newUser.facebook.provider = 'Facebook'

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
        successRedirect: '/user',
        failureRedirect: '/sign_in'
    }))
}


module.exports = facebookConfig
