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
        res.send('Pagina del usuario con inicio de sesion')
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

    getViewFile: function(req, res) {
        res.send('Tu puedes ver tus archivos publicados')
    },

    getViewFileEdit: function(req, res) {
        res.send('Tu puedes eliminar archivos, que solo tu has publicado')
    },

// Administradores =================================================
    getViewIndexAdministrator: function(req, res) {
        res.send('Pagina principal del administrador')
    },

    getViewSlider: function(req, res) {
        res.send('Tu puedes agregar una nueva imagen al Slider')
    },

    getViewSliderEdit: function(req, res) {
        res.send('Tu puedes editar una imagen del Slider')
    },

    getViewFileAdmin: function(req, res) {
        res.send('Tu puedes ver los archivos publicados')
    },

    getViewFileEditAdmin: function(req, res) {
        res.send('Tu puedes eliminar archivos, aunque esten dentro de un grupo')
    },

    getViewCommentId: function(req, res) {
        res.send('Tu puedes ver todos los comentarios por cada noticia')
    },

    getViewStatsId: function(req, res) {
        res.send('Tu puedes ver todos los stats(likes, dislikes) por cada noticia')
    },


}
