'use strict'

const Offer = require('../models/modelOffer')
const Demand = require('../models/modelDemand')
const User = require('../models/modelUsers')

module.exports = {

// Vistas =========================================================
    getViewIndex: function(req, res) {
        return res.render('index')
    },
    getViewSingin: function(req, res) {
        let error_message = req.flash('error')[0]
        res.locals.error_message = error_message
        res.render('signin', {error: error_message})
    },
    getViewSingup: function(req, res) {
        res.render('signup')
    },

// Usuarios plus ===================================================
    getViewIndexPlus: function (req, res) {
        res.send('Pagina del usuario con inicio de sesion')
    },

    // Formulario para nuevas ofertas, y para editar
    getViewOffer: function(req, res) {
        res.render('viewsUserPlus/offers/offerNew')
    },
    getViewOfferEdit: function(req, res) {
        Offer.findById(req.params.id, function (err, StoredOffer) {
            if(err) {
                console.log('=========================================================')
                console.log('[viewsController/getViewOfferEdit]: Error al hacer la busqueda')
                console.log('=========================================================')
                res.redirect('/app/offers')
            }

            res.render('viewsUserPlus/offers/offerUpdate', {offer: StoredOffer})
        })
    },

    // Formulario para nuevas demandas, y para editar
    getViewDemand: function(req, res) {
        res.render('viewsUserPlus/demands/demandNew')
    },

    getViewDemandEdit: function(req, res) {
        Demand.findById(req.params.id, function (err, StoredDemand) {
            if(err) {
                console.log('=========================================================')
                console.log('[viewsController/getViewDemandEdit]: Error al hacer la busqueda')
                console.log('=========================================================')
                res.redirect('/app/demands')
            }

            res.render('viewsUserPlus/demands/demandUpdate', {demand: StoredDemand})
        })
    },

    // Formulario para editar usuarios
    getViewUserNew: (req, res) => {
        res.render('viewsUserPlus/users/userNew')
    },
    getViewUserEdit: function(req, res) {
        User.findById(req.params.id, function (err, storedUser) {
            if(err) {
                console.log('=========================================================')
                console.log('[viewsController/getViewUserEdit]: Error al hacer la busqueda')
                console.log('=========================================================')
                res.redirect('/app/users')
            }

            res.render('viewsUserPlus/users/userUpdate', {user: storedUser})
        })
    },

    // Formulario para nuevos grupos, y para editar
    getViewGroups: function(req, res) {
        // res.render('news/New')
    },

    getViewGroupsEdit: function(req, res) {
        // res.render('groups/group')
    },

    // Formulario para nuevos archivos, y para editar
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

    // Formulario para nuevas imagenes en el slider, y para editar
    getViewSlider: function(req, res) {
        res.send('Tu puedes agregar una nueva imagen al Slider')
    },

    getViewSliderEdit: function(req, res) {
        res.send('Tu puedes editar una imagen del Slider')
    },

    // Formulario para administrar archivos, y para editar por id
    getViewFileAdmin: function(req, res) {
        res.send('Tu puedes ver los archivos publicados')
    },

    getViewFileEditAdmin: function(req, res) {
        res.send('Tu puedes eliminar archivos, aunque esten dentro de un grupo')
    },

    // Formulario para administrar commentarios, y para editar por id
    getViewCommentId: function(req, res) {
        res.send('Tu puedes ver todos los comentarios por cada noticia')
    },

    getViewStatsId: function(req, res) {
        res.send('Tu puedes ver todos los stats(likes, dislikes) por cada noticia')
    },


}
