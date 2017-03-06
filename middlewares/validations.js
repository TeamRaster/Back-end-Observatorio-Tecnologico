'use strict'

module.exports = (app) => {
    let User = app.models.modelUsers  // Manda a llamar el modelo de Usuarios

    this.ifUserExists = (req, res, next) => {
        User.findOne({email: req.fields.email}, (err, storedUser) => {
            if (storedUser != null && storedUser.email === req.fields.email) {
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


    return this
}
