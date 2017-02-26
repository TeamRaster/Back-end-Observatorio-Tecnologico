'use strict'

const models = require('../models')

module.exports = {
    // Formulario para nuevas Noticias, y para editar
    getViewNewNew: (req, res) => {
        res.render('viewsUserPlus/demands/new')
    },

    getViewNewEdit: (req, res) => {
        New.findById(req.params.id,  (err, StoredNew) => {
            if(err) {
                console.log('=========================================================')
                console.log('[viewsController/getViewDemandEdit]: Error al hacer la busqueda')
                console.log('=========================================================')
                res.redirect('/app/demands')
            }

            res.render('viewsUserPlus/news/update', {noti: StoredNew})
        })
    },

    // Formulario para nuevos Grupos, y para editar
    getViewGroupNew: (req, res) => {
        res.render('viewsUserPlus/groups/new')
    },

    getViewGroupEdit: (req, res) => {
        New.findById(req.params.id,  (err, StoredNew) => {
            if(err) {
                console.log('=========================================================')
                console.log('[viewsController/getViewDemandEdit]: Error al hacer la busqueda')
                console.log('=========================================================')
                res.redirect('/app/demands')
            }

            res.render('viewsUserPlus/news/update', {noti: StoredNew})
        })
    },
}
