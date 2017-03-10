// 'use strict'
//
// const TwitterStrategy = require('passport-twitter').Strategy
// const User = require('../../models/modelUsers')
//
// function twitterConfig(app, passport, config) {
//     passport.use(new TwitterStrategy({
//         consumerKey     : config.twitterAuth.clientID,
//         consumerSecret  : config.twitterAuth.clientSecret,
//         callbackURL     : config.twitterAuth.callbackURL
//
//     }, (token, tokenSecret, profile, done) => {
//         process.nextTick(() => {
//             User.findOne({ providerId : profile.id }, (err, user) => {
//                 if (err) return done(err)
//                 if (user) return done(null, user)
//                 else {
//                     let newUser = new User()
//                     newUser.providerId  = profile.id
//                     newUser.username    = profile.displayName
//                     newUser.photo       = profile.photos[0].value
//                     newUser.provider    = 'Twitter'
//
//                     newUser.save((err) => {
//                         if (err) throw err
//                         return done(null, newUser)
//                     })
//                 }
//             })
//         })
//     }))
//     app.get('/auth/twitter', passport.authenticate('twitter'))
//     app.get('/auth/twitter/callback', passport.authenticate('twitter', {
//         successRedirect  : config.successRedirect,
//         failureRedirect  : config.failureRedirect
//     }))
// }
//
// module.exports = twitterConfig
