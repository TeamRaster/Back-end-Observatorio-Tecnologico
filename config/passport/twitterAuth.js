'use strict'

const TwitterStrategy = require('passport-twitter')
const User = require('../../models/modelUsers')

function twitterConfig(app, passport, config) {
    passport.use(new TwitterStrategy({
        consumerKey     : config.twitterAuth.clientID,
        consumerSecret  : config.twitterAuth.clientSecret,
        callbackURL     : config.twitterAuth.callbackURL

    }, (token, tokenSecret, profile, done) => {
        process.nextTick(() => {
            User.findOne({ 'twitter.id' : profile.id }, (err, user) => {
                if (err) return done(err)
                if (user) return done(null, user)
                else {
                    let newUser = new User()
                    newUser.twitter.id       = profile.id
                    newUser.twitter.provider = 'Twitter'
                    newUser.twitter.token    = token
                    newUser.twitter.email    = profile.username
                    newUser.twitter.username = profile.displayName

                    newUser.save((err) => {
                        if (err) throw err
                        return done(null, newUser)
                    })
                }
            })
        })
    }))
    app.get('/auth/twitter', passport.authenticate('twitter'))
    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect : '/user',
        failureRedirect: '/sign_in'
    }))
}

module.exports = twitterConfig
