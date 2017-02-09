'use strict'

const News = require('../models/modelNews')

module.exports = {

// CRUD Noticia =======================================================
    setNewNoticia: function (req, res) {
        let notice = new News({
            titulo: req.body.titulo,
            imagen: req.body.imagen,
            extension: req.body.extension,
            texto: req.body.texto,
            categoria: req.body.categoria,
        })

        News.save().then((noti) => {
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
        var newId = req.params.newId;
        var update = req.body;
        //lo que ecibe ña funcion callback la data ;)
        News.findByIdAndUpdate(newsId, update, (err, newsUpdated) => {
          if (err) {
            return res.status(500).send({message: 'Error en DB ' + err});
          }

            return res.status(200).send({news: newstUpdated});

          //return res.status(200).send({product});
        });


    },
    removeNoticiaById: function(req, res) {

    },


}
