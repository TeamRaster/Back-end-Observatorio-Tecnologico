// Todas las consultas que se requieran en las aplicaciones iran dentro de aqui
'use strict'

const User = require('../models/modelUsers')

module.exports = {

// Usuario =======================================================
    getUserOne: function(req, res) { },

    getUsersAll: function(req, res) { },

    getUserById: function(req, res) { },

    updateUserById: function(req, res) { },

    deleteUserById: function(req, res) { },

    setUser: function(req, res) {
        let user = new User({
            username   : req.body.username,
            email      : req.body.email,
            photo      : req.body.photo,
            password   : req.body.password,
            provider   : 'Local',
        })

        if (req.body.options === "true") user.administrator = true
        else user.administrator = false

        user.save().then((us) => {
            console.log('[Successful]: Usuario guardado')
            res.redirect('/')
        }, (error) => {
            console.log(`[Error Save]: Usuario no almacenado ${error}`)
            res.render('signup')
        })
    },

// Oferta ========================================================
    getOfertaOne: function(req, res) { },

    getOfertasAll: function(req, res) { },

    getOfertaById: function(req, res) { },

    setOferta: function(req, res) { },

    updateOfertaById: function(req, res) { },

    deleteOfertaById: function(req, res) { },


// Demanda =======================================================
    getDemandaOne: function(req, res) { },

    getDemandasAll: function(req, res) { },

    getDemandaById: function(req, res) { },

    setDemanda: function(req, res) { },

    updateDemandaById: function(req, res) { },

    deleteDemandaById: function(req, res) { },


// Noticia =======================================================
    getNoticiaOne: function(req, res) { },

    getNoticiasAll: function(req, res) { },

    getNoticiaById: function(req, res) { },

    setNoticia: function(req, res) { },

    updateNoticiaById: function(req, res) { },

    deleteNoticiaById: function(req, res) { },

}

