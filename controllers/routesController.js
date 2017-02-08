'use strict'

module.exports = {

// Vistas =========================================================
    getViewIndex: function(req, res) {
        return res.render('index')
    },
    getViewSingin: function(req, res) {
        let error_message = req.flash('error')[0]
        res.locals.error_message = error_message
        res.render('signin', {error: res.locals.error_message})
    },
    getViewSingup: function(req, res) {
        res.render('signup')
    },


// Sesiones ========================================================
    getNewSession: function(req, res) {
        res.render('user', {user: req.user})
    },
    getDestroySession: function(req, res) {
        req.logout()
        res.redirect('/')
    },


// Usuarios plus ===================================================
    getViewIndexPlus: function (req, res) {
        res.send('Pagina del usuario con inicio de sesion ')
    },
    getViewNewOferta: function(req, res) {

    },

    getViewEditOferta: function(req, res) {

    },

    getViewNewDemanda: function(req, res) {

    },

    getViewEditDemanda: function(req, res) {

    },

    getViewNewNoticia: function(req, res) {

    },

    getViewEditNoticia: function(req, res) {

    },

    getViewCompletarRegistro: function(req, res) {

    },


// Administradores =================================================
    getViewIndexAdministrator: function(req, res) {
        res.send('Pagina del administrador')
    }
}
