'use strict'

const fs = require('fs')

module.exports = (app) => {
    let User = app.models.modelUsers  // Manda a llamar el modelo de Usuarios

    this.ifUserExists = (req, res, next) => {
        if (res.locals.user && res.locals.user.email === req.body.email) {
            console.log('El usuario no ha modificado o usara el mismo correo')
            next()
        } else {
            console.log('El usuario intento cambiar de correo, pero ya estaba ocupado')
            User.findOne({email: req.body.email}, (err, storedUser) => {
                if (storedUser != null && storedUser.email === req.body.email) {
                    console.log('storedUser.path ' + storedUser.path)
                    console.log('storedUser.photo ' + storedUser.photo)
                    fs.unlink(storedUser.path + storedUser.photo)  // Elimina la foto que se ha subido al servidor
                    console.log('[Middleware.ifUserExists]: Lo sentimos pero este usuario ya esta registrado')
                    req.flash('err', 'Lo sentimos pero este usuario ya esta registrado')  // Mensaje al usuario
                    if (req.path.indexOf('/user') > 0 && req.method === 'PUT') {
                        res.redirect(`/user/${req.params.id}/edit`)  // Cuando se actualiza un usuario
                    }else {
                        res.redirect('/accounts/signup')  // Cuando se crea un usuario
                    }
                } else {  // Si el correo electronico no existe
                    next()  // Continua con la siguiente funcion
                }
            })
        }
    }

    this.canBeDelete = (req, res, next) => {
        // Si eres administrador y la cuenta que sera eliminada no es la tuya puedes hacerlo
        if (res.locals.user.administrator && req.params.id != res.locals.user._id) {
            next()
        // Si eres un usuario normal, puedes eliminar tu propia cuenta
        } else if (req.params.id === res.locals.user._id && !res.locals.user.administrator) {
            next()
        // Si quieres eliminar tu cuenta de administrador, no sera valido
        // Si eres un usuario normal y quieres eliminar otra cuenta que no es tuya
        } else {
            req.flash('err', 'No es posible eliminar esta cuenta, No cuentas con los permisos suficientes')
            return res.redirect('/users')
        }
    }


    return this
}
