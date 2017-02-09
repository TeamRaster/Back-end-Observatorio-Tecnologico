'use strict'

const LocalStrategy = require('passport-local').Strategy
const User = require('../../models/modelUsers')

function localConfig(app, passport, config) {
    passport.use(new LocalStrategy({
        usernameField  : config.localAuth.username,
        passwordField  : config.localAuth.password

    }, (username, password, done) => {
        console.log(username)
        console.log(password)
        User.findOne({ email : username }, (err, user) => {
            if (err) return done(err)
            else if(!user) return done(null, false, { msg: 'No existe el usuario' })
            user.comparePassword(password, user.password, function (err, isMatch) {
                if (err) return  done(null, false, {message: `Error en auth local ${err}`})
                else if (!isMatch) return done(null, false, { msg: 'El usuario o contraseña con coinciden' })
                else return done(null, user, { msg: 'success' })
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
