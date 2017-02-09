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

// Usuarios plus ===================================================
    getViewIndexPlus: function (req, res) {
        // res.send('Pagina del usuario con inicio de sesion')
    },
    getViewOferta: function(req, res) {
        // res.render('offers/newOffer')
    },

    getViewDemanda: function(req, res) {
        // res.render('demands/newDemand')
    },

    getViewNoticia: function(req, res) {
        // res.render('news/newNew')
    },

    getViewGroups: function(req, res) {
        // res.render('news/newNew')
    },

    getView: function(req, res) {
        // res.render('news/newNew')
    },

// Administradores =================================================
    getViewIndexAdministrator: function(req, res) {
        res.send('Pagina del administrador')
    },

    getViewIndexTodoUsers: function(req, res) {
        User.find()
        .then(function (users) {
            res.locals.users = users
            return res.render('getUsers', {users: res.locals.users})
            //return users
        });

    }
}
