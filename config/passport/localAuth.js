'use strict'

const LocalinStrategy = require('passport-local').Strategy
const User = require('../../models/modelUsers')

function localConfig(app, passport, config) {
    passport.use(new LocalinStrategy({
        usernameField  : config.localAuth.username,
        passwordField  : config.localAuth.password

    }, (username, password, done) => {
        User.findOne({ username : username }, (err, user) => {
            if (err) return done(err)
            else if(!user) return done(null, false)
            else if(user.password === password) return done(null, user)
            else return done(null, false, {message: 'El usuario o contraseña con coinciden'})
        })
    }))
    app.get('/auth/local', passport.authenticate('local', {
        successRedirect  : config.successRedirect,
        failureRedirect  : config.failureRedirect,
        failureFlash     : true
    }))
}


module.exports = localConfig
