'use strict'

const News = require('../models/modelNews')

module.exports = {

// CRUD Noticia =======================================================
    setNewNoticia: function (req, res) {
        console.log(req.body)

        let notice = new News({
            titulo: req.body.titulo,
            imagen: req.body.imagen,
            extension: req.body.extension,
            texto: req.body.texto,
            categoria: req.body.categoria,
        })

        notice.save().then((noti) => {
            console.log('[Successful]: Noticia guardada')
            return res.status(200).send({"notice": noti})

        }, (error) => {
            console.log(`[Error Save]: Noticia no almacenada ${error}`)
            return res.status(500).send({"notice": error})
        })

    },

    getAllNoticias: function(req, res) {
        News.find({}), function (err, newsStored) {
            if(err) {
                console.log('Hubo un error al buscar todas las Noticias[newsCrudController]')
                res.status(500).send({"error": err})
            }
            console.log('Sucesss')
             return res.status(200).send({message: "pagina del admin    "});
        }

    },
    getNoticiaById: function(req, res) {
        News.findById(req.params.id, function (err, newStored) {
            if(err) {
                console.log('Hubo un error al buscar oferta por id [offerCrudController]')
                res.status(500).send({"error": err})
            }
            res.send(newStored)
        })

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

        });


    },
    removeNoticiaById: function(req, res) {
        News.findOneAndRemove({_id: req.params.id}, function (err) {
            if (err) {
                console.log('Error al borrar la oferta')
                res.status(500).send({message: 'Error en DB ' + err});
            }
            res.send('Se borro exitosamente')
        })
    },


}
