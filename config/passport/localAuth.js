'use strict'

const LocalStrategy = require('passport-local').Strategy
const User = require('../../models/modelUsers')

function localConfig(app, passport, config) {
    passport.use(new LocalStrategy({
        usernameField  : config.localAuth.username,
        passwordField  : config.localAuth.password

    }, (username, password, done) => {
        User.findOne({ email : username }, (err, user) => {
            if (err) return done(err)
            else if(!user) return done(null, false)
            user.comparePassword(password, user.password, function (err, isMatch) {
                if (err) return  done(err)

                if (!isMatch) return done(null, false, { msg: 'El usuario o contraseña con coinciden' })

                return done(null, user, { msg: 'success' })
            })
        })
    }))
    app.post('/auth/local', passport.authenticate('local', {
        successRedirect  : config.successRedirect,
        failureRedirect  : config.failureRedirect,
        failureFlash     : true
    }))
}


module.exports = localConfig
