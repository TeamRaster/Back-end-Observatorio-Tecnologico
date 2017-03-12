'use strict'

const fs = require('fs')
    , multer = require('multer')
    , passport = require('passport')

module.exports = (app) => {
    const user = app.controllers.controllerUsers  // Llama al controlador de los usuarios
        , auth = app.middlewares.auth  // Llamada del middleware para la validacion de las rutas
        , find = app.middlewares.find  // Llamada del middleware para la busqueda
        , validate = app.middlewares.validations  // Llama al middleware para las validaciones

    let storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'public/images/imagesUsers/')  // URL donde se almacenan las imagenes
            },
            filename: function (req, file, cb) {
                cb(null, 'imageUser-' + Date.now() + '.' + file.originalname.split('.').pop())  // Renombra el archivo, despues lo mueve
            },
            onError: function (error, next) {
                console.log(`\n[routesUser.storage]: Ups hay un error => ${error}`)
                next(error)
            }
        })
    , upload = multer({ storage: storage })  // Usa el storage especificado con anterioridad


    app.all('/user/:id*', find.findUser)  // Middleware que busca un usuario y lo almacena en locals

    app.get('/users/new', [auth.isLogged, user.getViewUserNew])  // Formulario para un nuevo usuario via admin
    app.get('/user/:id/edit', [auth.isLogged, user.getViewUserEdit])  // Formulario para editar un usuario
    app.get('/user/contact', [auth.isLogged, user.getViewUsercontact])  // Formulario para completar Informacion de contacto

    app.get('/users/profile', (req, res) => {  // URL paraa ver el perfil del usuario
        res.render('./viewsUserPlus/users/view', {
            storedUser : req.user,
            user       : req.user,
            err        : req.flash('err'),  // Si hay mensajes de error, los almacena
            warning    : req.flash('warning'),  // Si hay mensajes de Precaucion
            info       : req.flash('info'),  // Si hay mensajes informativos, los almacena
            success    : req.flash('success')  // Si hay mensajes afirmativos, los almacena
        })  // Usa el usuario que esta logeado actualmente
    })

    app.get('/accounts/logout', (req, res) => {  // URL para eliminar y cerrar la sesion
        req.logout()  // Sale de la sesion actual
        req.session.destroy()  // Destruye la sesion que se genera todo En produccion, ya no sera necesario si se implementa bien deserializeUser
        res.redirect('/')  // Redirige al inicio
    })

    app.post('/user/:id/contact', [auth.isLogged, user.setContact])  // URL para completar informacion de contacto

// =====================================================================================================================
// AUTENTICACION LOCAL Y REDES SOCIALES POR 1a Vez =====================================================================
// =====================================================================================================================
    app.get('/accounts/signin', (req, res) => {  // Formualrio para iniciar sesion
        res.render('signin', {
            err     : req.flash('err'),  // Si hay mensajes de error, los almacena
            warning : req.flash('warning'),  // Si hay mensajes de Precaucion
            info    : req.flash('info'),  // Si hay mensajes informativos, los almacena
            success : req.flash('success')  // Si hay mensajes afirmativos, los almacena
        })
    })

    app.post('/accounts/signin', passport.authenticate('local-signin', {  // URL de callback
        successRedirect : '/',  // Redirecciona si el proceso es exitoso
        failureRedirect : '/accounts/signin',  // Redirecciona si el proceso falla
        failureFlash : true  // Permite enviar mensajes Flash
    }))

// Local ***************************************************************************************************************
    app.get('/accounts/signup', (req, res) => {  // Formulario para registro de usurio
        res.render('signup', {
            err     : req.flash('err'),  // Si hay mensajes de error, los almacena
            warning : req.flash('warning'),  // Si hay mensajes de Precaucion
            info    : req.flash('info'),  // Si hay mensajes informativos, los almacena
            success : req.flash('success')  // Si hay mensajes afirmativos, los almacena
        })
    })

    app.post('/accounts/signup', passport.authenticate('local-signup', {  // URL de callback
        successRedirect : '/',  // Redirecciona si el proceso es exitoso
        failureRedirect : '/accounts/signup',  // Redirecciona si el proceso falla
        failureFlash    : true  // Permite enviar mensajes Flash
    }))

// Facebook ************************************************************************************************************
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope : 'email'
    }))
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {  // URL de callback
        successRedirect : '/',  // Redirecciona si el proceso es exitoso
        failureRedirect : '/accounts/signin',  // Redirecciona si el proceso falla
        failureFlash    : true  // Permite enviar mensajes Flash
    }))

// Twitter *************************************************************************************************************
    app.get('/auth/twitter', passport.authenticate('twitter', {
        scope : 'email'
    }))
    app.get('/auth/twitter/callback', passport.authenticate('twitter', {  // URL de callback
        successRedirect : '/',  // Redirecciona si el proceso es exitoso
        failureRedirect : '/accounts/signin',  // Redirecciona si el proceso falla
        failureFlash    : true  // Permite enviar mensajes Flash
    }))

// Linkedin ************************************************************************************************************
    app.get('/auth/linkedin', passport.authenticate('linkedin'))
    app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {  // URL de callback
        successRedirect : '/',  // Redirecciona si el proceso es exitoso
        failureRedirect : '/accounts/signin',  // Redirecciona si el proceso falla
        failureFlash    : true  // Permite enviar mensajes Flash
    }))
// =====================================================================================================================
// AUTORIZACION(ENLAZAR REDES SOCIALES) ================================================================================
// =====================================================================================================================

// Local ***************************************************************************************************************
// todo Se puede reutilizar el formulario de registro
//     app.get('/connect/local', (req, res) => {
//         res.render('connect-local.ejs', { message: req.flash('loginMessage') })
//     })
//
//     app.post('/connect/local', passport.authenticate('local-signup', {
//         successRedirect : '/',  // Redirecciona si el proceso es exitoso
//         failureRedirect : '/connect/local',  // Redirecciona si el proceso falla
//         failureFlash : true
//     }))

// Facebook ************************************************************************************************************
    app.get('/connect/facebook', passport.authorize('facebook', {
        scope : 'email'
    }))

    app.get('/connect/facebook/callback',
        passport.authorize('facebook', {  // Solicita la autorizacion
            successRedirect : '/users/profile',  // Redirecciona si el proceso es exitoso
            failureRedirect : '/'  // Redirecciona si el proceso falla
        }))

// Twitter *************************************************************************************************************
    app.get('/connect/twitter', passport.authorize('twitter', {
        scope : 'email'
    }))

    app.get('/connect/twitter/callback',
        passport.authorize('twitter', {  // Solicita la autorizacion
            successRedirect : '/users/profile',  // Redirecciona si el proceso es exitoso
            failureRedirect : '/'  // Redirecciona si el proceso falla
        }))

// Linkedin ************************************************************************************************************
    app.get('/connect/linkedin', passport.authorize('linkedin', {
        scope : 'email'
    }))

    app.get('/connect/linkedin/callback',
        passport.authorize('linkedin', {  // Solicita la autorizacion
            successRedirect : '/users/profile',  // Redirecciona si el proceso es exitoso
            failureRedirect : '/'  // Redirecciona si el proceso falla
        }))

// #####################################################################################################################
// OPERACIONES CRUD USUARIOS ###########################################################################################
// #####################################################################################################################
    app.route('/user/:id')
        .get([auth.isLogged, user.getUser])  // Obtener un usuario
        .put([auth.isLogged, upload.single('photo'), validate.ifUserExists, user.updateUser])  // Actualizar un usuario
        .delete([auth.isLogged, user.deleteUser])  // Eliminar un usuario

    app.route('/users')
        .get([auth.isLogged, user.getUsers])  // Obtener todos los usuarios
        .post([upload.single('photo'), validate.ifUserExists, user.setUser])  // Agregar un nuevo usuario
}
