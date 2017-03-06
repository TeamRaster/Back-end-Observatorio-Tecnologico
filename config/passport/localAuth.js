'use strict'

const LocalStrategy = require('passport-local').Strategy

function localConfig(app, passport, config) {
    const User = app.models.modelUsers

    passport.use(new LocalStrategy({
        usernameField  : config.localAuth.username,
        passwordField  : config.localAuth.password,
        passReqToCallback: true  // Agrega la peticion para que pueda ser pasada por parametro

    }, (req, username, password, done) => {  // Parametros que recibe
        console.log(`Username que se va a comparar: ${username}`)
        console.log(`Password que se va a comparar: ${password}`)
        User.findOne({ email : username }, (err, storedUser) => {
            if (err) {
                console.log('(1)=> Existe un error en localAuth \n' + err)
                return done(err)
            } else if (!storedUser) {
                console.log('(2)=> No existe registros de este usuario \n')
                return done(null, false, req.flash('err', 'Usuario no encontrado en la base de datos'))
            } else {
                console.log(`(3)=> Usuario encontrado: ${storedUser}\n`)
                storedUser.comparePassword(password, storedUser.password, function (err, isMatch) {
                    if (err) {
                        console.log('(3)(1)=> Error al comparar las contraseñas\n' + err)
                        return  done(null, false, req.flash('err', 'Ups. Hubo un error en auth local'))
                    }
                    else if (!isMatch) {
                        console.log('(3)(2)=> El usuario y/o la contraseña no coinciden')
                        return done(null, false, req.flash('err', 'Ups. El usuario y/o contraseña con coinciden'))
                    }
                    else {
                        console.log('(3)(3)=> Listo, Estas autenticado')
                        return done(null, storedUser, req.flash('info', 'Bienvenido'))
                    }
                })
            }
        })
    }))

    app.post('/auth/local', passport.authenticate('local', {
        successRedirect  : config.successRedirect,
        failureRedirect  : config.failureRedirect,
        failureFlash     : true,
    }))
}


module.exports = localConfig
