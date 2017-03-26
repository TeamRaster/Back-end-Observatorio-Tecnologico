'use strict'

const redis = require('redis')
const client = redis.createClient()
const moment = require('moment')
const fs = require('fs')


module.exports = (app) => {

    //const News = require('../models/modelNews')///app.models.modelNews
    const News = app.models.modelNews
    console.log(News);

    // Vistas-------------------

    /*this.viewSetNewNew = (req, res) => {
            res.render('./viewsUserPlus/news/news');
        }*/

    // Formulario para nuevas Noticias, y para editar
    this.getViewNewNew = (req, res) => {
        res.render('viewsUserPlus/news/news')
    }

    this.getViewNewEdit = (req, res) => {
        News.findById(req.params.id,  (err, StoredNew) => {
            console.log('.----------------------id  ' +req.params.id);
            if(err) {

                console.log('=========================================================')
                console.log('[viewsController/getViewNewEdit]: Error al hacer la busqueda')
                console.log('=========================================================')
                res.redirect('/news')
            }

            res.render('viewsUserPlus/news/update', {noti: StoredNew})
        })
    }



    // CRUD New =======================================================
    this.setNewNew =  (req, res) => {

            console.log(req.body)

            let notice = new News({
                title: req.body.title,
                image: req.body.image,
                extension: req.body.extension,
                text: req.body.text,
                category: req.body.category,
            })

            notice.save().then((noti) => {
                console.log('[Successful]: New guardada')
                return res.status(200).send({"notice": noti})

            }, (error) => {
                console.log(`[Error Save]: New no almacenada ${error}`)
                return res.status(500).send({"notice": error})
            })
    }

    this.getAllNews = (req, res) => {
        console.log('getAllNews  ---------------------')

        News.find({}, function (err, newsStored) {
            if(err) {
                console.log('Hubo un error al buscar todas las News[newsCrudController]')
                res.status(500).send({"error": err})

            }
            console.log('Sucesss')

            // Publicar en el cliente REDIS SOCKETIO
            //client.publish('images', newsStored.toString())
            //client.publish('images', (res.locals.toString()))
            console.log('Cliente news ctrlr-----------')
            console.log( Object.keys(res.locals) )

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

    }

    this.getNewById = (req, res) => {
        News.findById(req.params.id, function (err, newStored) {

            if(err) {
                console.log('Hubo un error al buscar noticia por id [newsCrudController]')
                res.status(500).send({"error": err})
            }
            if(!newStored)
                return res.status(404).send({message: 'No existe la noticia  '});

            res.send(newStored)
        })

    }

    this.updateNewById = (req, res) => {
        console.log(".................   updatessss");
        var newId = req.params.id;
        var update = req.body;
        //lo que recibe la funcion callback la data ;)
        News.findByIdAndUpdate(newId, update, (err, newsUpdated) => {
          if (err) {
            return res.status(500).send({message: 'Error en DB ' + err});
          }

            return res.status(200).send({news: newsUpdated});

        })

    }

    this.removeNewById = (req, res) => {
        News.findOneAndRemove({_id: req.params.id}, function (err) {
            if (err) {
                console.log('Error al borrar la oferta')
                res.status(500).send({message: 'Error en DB ' + err});
            }
            res.send('Se borro exitosamente')
        })
    }


    return this
}
