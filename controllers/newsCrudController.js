'use strict'

const consultasController = require('../controllers/consultasController')
const Notice = require('../models/modelNews')

module.exports = {

// CRUD Noticia =======================================================
    setNewNoticia: function (req, res) {
        let notice = new Notice({
            titulo: req.body.titulo,
            imagen: req.body.imagen,
            extension: req.body.extension,
            texto: req.body.texto,
            categoria: req.body.categoria,
        })

        notice.save().then((noti) => {
            console.log('[Successful]: Noticia guardada')
            //res.redirect('/')
            //res.redirect('/')
            res.status(200).send({"notice": notice})
        }, (error) => {
            console.log(`[Error Save]: Noticia no almacenada ${error}`)
            res.render('signup')
        })

    },
    getAllNoticias: function(req, res) {

    },
    getNoticiaById: function(req, res) {

    },
    updateNoticiaById: function(req, res) {

    },
    removeNoticiaById: function(req, res) {

    },


}
