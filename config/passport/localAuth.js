'use strict'

const LocalStrategy = require('passport-local').Strategy
const User = require('../../models/modelUsers')

function localConfig(app, passport, config) {
    passport.use(new LocalStrategy({
        usernameField  : config.localAuth.username,
        passwordField  : config.localAuth.password

    }, (username, password, done) => {
        User.findOne({ email : username }, (err, storedUser) => {
            if (err) return done(err)
            else if(!storedUser) return done(null, false, { message: 'No existe el usuario' })
            storedUser.comparePassword(password, storedUser.password, function (err, isMatch) {
                if (err) return  done(null, false, {message: `Error en auth local ${err}`})
                else if (!isMatch) return done(null, false, { message: 'El usuario o contraseña con coinciden' })
                else return done(null, storedUser, { message: 'success' })
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
