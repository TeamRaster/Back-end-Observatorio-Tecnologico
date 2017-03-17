'use strict'

const redis = require('redis')
const client = redis.creteClient()

const News = require('../models/modelNews')

module.exports = {

// CRUD Noticia =======================================================
    viewSetNewNoticia: function (req, res) {
            res.render('./viewsUserPlus/news/news');
        },

    setNewNoticia: function (req, res) {

            console.log(req.fields)

            let notice = new News({
                title: req.fields.title,
                image: req.fields.image,
                extension: req.fields.extension,
                text: req.fields.text,
                category: req.fields.category,
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
        News.find({}, function (err, newsStored) {
            if(err) {
                console.log('Hubo un error al buscar todas las Noticias[newsCrudController]')
                res.status(500).send({"error": err})

            }
            console.log('Sucesss')

            // Publicar en el cliente REDIS SOCKETIO
            //client.publish('images', newsStored.toString())
            //client.publish('images', (res.locals.toString()))
            console.log('Cliente news ctrlr-----------')
            console.log( Object.keys(res.locals) )
            //console.log('images', Object.keys(res) )
            //console.log('images', Object.keys(res.req.fields) )
            //console.log('images', Object.keys(res.req.res) )
            //console.log('images', Object.keys(res.locals[0]) )
            var claves = {dwl: "dwe", w: "efwef"};
            //console.log('images', newsStored)

            console.log('images', typeof res.locals )

            let pubJSON = { //parsear publicacion a JSON  para client socket PUBSUB
                'title': newsStored[0]['title'],
                'category': newsStored[0]['category'],
                'id' : newsStored[0]['_id']
            }

            //client.publish('images' , newsStored.toString())
            //client.publish('new notices' , newsStored.toString())
            //client.publish('new notices', JSON.stringify(pubJSON))
            client.publish('images', JSON.stringify(pubJSON))

            client.publish('images', JSON.stringify(newsStored))
            console.log('..../viewsUserPlus/news/newsAll',  typeof newsStored)

            res.render('./viewsUserPlus/news/newsAll', {news: newsStored})

            console.log('images', newsStored.toString())
            // return res.status(200).send({message: "pagina del admin    "});
        })

    },

    getNoticiaById: function(req, res) {
        News.findById(req.params.id, function (err, newStored) {

            if(err) {
                console.log('Hubo un error al buscar noticia por id [newsCrudController]')
                res.status(500).send({"error": err})
            }
            if(!newStored)
                return res.status(404).send({message: 'No existe la noticia  '});

            res.send(newStored)
        })

    },

    updateNoticiaById: function(req, res) {
        console.log(".................   updatessss");
        var newId = req.params.id;
        var update = req.fields;
        //lo que recibe la funcion callback la data ;)
        News.findByIdAndUpdate(newId, update, (err, newsUpdated) => {
          if (err) {
            return res.status(500).send({message: 'Error en DB ' + err});
          }

            return res.status(200).send({news: newsUpdated});

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
