'use strict'

const Offer = require('../models/modelOffer')
const Demand = require('../models/modelDemand')
const User = require('../models/modelUsers')
const Source = require('../models/modelSource')

module.exports = {

// Vistas =========================================================
    getViewIndex: (req, res) => {
        return res.render('index')
    },
    getViewSingin: (req, res) => {
        let error_message = req.flash('error')[0]
        res.locals.error_message = error_message
        res.render('signin', {error: error_message})
    },
    getViewSingup: (req, res) => {
        res.render('signup')
    },

// Usuarios plus ===================================================
    getViewIndexPlus:  (req, res) => {
        res.send('Pagina del usuario con inicio de sesion')
    },

    // Formulario para nuevas ofertas, y para editar
    getViewOffer: (req, res) => {
        res.render('viewsUserPlus/offers/offerNew')
    },
    getViewOfferEdit: (req, res) => {
        Offer.findById(req.params.id,  (err, StoredOffer) => {
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
    getViewDemand: (req, res) => {
        res.render('viewsUserPlus/demands/demandNew')
    },

    getViewDemandEdit: (req, res) => {
        Demand.findById(req.params.id,  (err, StoredDemand) => {
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
    getViewUserEdit: (req, res) => {
        User.findById(req.params.id,  (err, storedUser) => {
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
    getViewGroups: (req, res) => {
        // res.render('news/New')
    },

    getViewGroupsEdit: (req, res) => {
        // res.render('groups/group')
    },

    // Formulario para nuevos archivos, y para editar
    getViewFile: (req, res) => {
        res.send('Tu puedes ver tus archivos publicados')
    },

    getViewFileEdit: (req, res) => {
        res.send('Tu puedes eliminar archivos, que solo tu has publicado')
    },


// Administradores =================================================
    getViewIndexAdministrator: (req, res) => {
        res.send('Pagina principal del administrador')
    },

    // Formulario para nuevas fuentes de informacion, y para editar
    getViewSourceNew: (req, res) => {
        res.render('viewsAdministrator/sources/new')
    },

    getViewSourceEdit: (req, res) => {
        Source.findById(req.params.id, (err, storedSource) => {
            if (err) {
                console.log('=========================================================')
                console.log('[viewsController/getVieSourceEdit]: Error al hacer la busqueda')
                console.log('=========================================================')
                res.redirect('/app/administrator/sources')
            }
            res.render('viewsAdministrator/sources/update', {source: storedSource})
        })
    },


    // Formulario para administrar archivos, y para editar por id
    getViewFileAdmin: (req, res) => {
        res.send('Tu puedes ver los archivos publicados')
    },

    getViewFileEditAdmin: (req, res) => {
        res.send('Tu puedes eliminar archivos, aunque esten dentro de un grupo')
    },


    // Formulario para administrar commentarios, y para editar por id
    getViewCommentId: (req, res) => {
        res.send('Tu puedes ver todos los comentarios por cada noticia')
    },

    getViewStatsId: (req, res) => {
        res.send('Tu puedes ver todos los stats(likes, dislikes) por cada noticia')
    },


}
