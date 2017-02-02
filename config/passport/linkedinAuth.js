'use strict'

const LinkedinStrategy = require('passport-linkedin').Strategy
const User = require('../../models/modelUsers')

function linkedinConfig(app, passport, config) {
    passport.use(new LinkedinStrategy({
        consumerKey    : config.linkedinAuth.consumerKey,
        consumerSecret : config.linkedinAuth.consumerSecret,
        callbackURL    : config.linkedinAuth.callbackURL

    }, (token, tokenSecret, profile, done) => {
        process.nextTick(() => {
            console.log(profile)
            User.findOne({ providerId : profile.id }, (err, user) => {
                if (err) return done(err)
                if (user) return done(null, user)
                else {
                    let username = profile._json.firstName + ' ' + profile._json.lastName
                    let newUser = new User()
                    newUser.providerId  = profile.id
                    newUser.username    = username
                    newUser.provider    = 'Linkedin'

                    newUser.save((err) => {
                        if (err) throw err
                        return done(null, newUser)
                    })
                }
            })
        })
    }))
    app.get('/auth/linkedin', passport.authenticate('linkedin'))
    app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
        successRedirect  : config.successRedirect,
        failureRedirect  : config.failureRedirect
    }))
}


module.exports = linkedinConfig
