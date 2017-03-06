'use strict'

module.exports = (app) => {
    const user = app.controllers.controllerUsers  // Llama al controlador de los usuarios
        , auth = app.middlewares.auth  // Llamada del middleware para la validacion de las rutas
        , find = app.middlewares.find  // Llamada del middleware para la busqueda
        , validate = app.middlewares.validations

    app.all('/user/:id*', find.findUser)

    app.get('/users/new', [auth.isLogged, user.getViewUserNew])  // Formulario para un nuevo usuario via admin
    app.get('/user/:id/edit', [auth.isLogged, user.getViewUserEdit])  // Formulario para editar un usuario

// Manejo de las sesiones ==============================================================================================
    app.get('/accounts/signin', (req, res) => {  // Formualrio para iniciar sesion
        res.render('signin', {
            err: req.flash('error'),
            info: req.flash('info'),
            success: req.flash('success')
        })
    })


    app.get('/accounts/signup', (req, res) => {  // Formulario para registro de usurio
        res.render('signup', {
            err: req.flash('err'),
            info: req.flash('info'),
            success: req.flash('success')
        })
    })

    app.get('/accounts/login', (req, res) => {  // URL de callback que crea y establece una nueva sesion
        res.render('./viewsUserPlus/users/view', {user: req.session.user})
    })

    app.get('/accounts/logout', (req, res) => {  // URL para eliminar y cerrar la sesion
        req.logout()
        req.session.destroy()
        res.redirect('/')
    })


// CRUD Users ==========================================================================================================
    app.route('/user/:id')
        .get([auth.isLogged, user.getUser])  // Obtener un usuario
        .put([auth.isLogged, validate.ifUserExists, user.updateUser])  // Actualizar un usuario
        .delete([auth.isLogged, user.deleteUser])  // Eliminar un usuario

    app.route('/users')
        .get([auth.isLogged, user.getUsers])  // Obtener todos los usuarios
        .post([user.setUser])  // Agregar un nuevo usuario
        // .post([validate.ifUserExists, user.setUser])  // Agregar un nuevo usuario
}
