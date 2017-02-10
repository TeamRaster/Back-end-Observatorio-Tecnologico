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
    getViewOffer: function(req, res) {
        res.render('viewsUserPlus/offers/offer')
    },
    getViewOfferEdit: function(req, res) {
        res.render('viewsUserPlus/offers/offerUpdate', {id: req.params.id})
    },

    getViewDemand: function(req, res) {
        res.render('viewsUserPlus/demands/demand', {id: req.params.id})
    },

    getViewDemandEdit: function(req, res) {
        res.render('viewsUserPlus/demands/demandUpdate', {id: req.params.id})
    },

    getViewNews: function(req, res) {
        // res.render('news/New')
    },

    getViewGroups: function(req, res) {
        // res.render('groups/group')
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
