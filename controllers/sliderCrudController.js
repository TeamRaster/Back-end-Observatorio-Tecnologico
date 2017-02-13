'use strict'

const Image = require('../models/modelSlider')
const fs = require('fs')

module.exports = {
    setImage: (req, res) => {
        let ext_ = req.files.image.name.split(".").pop()
        let image = new Image({
            name       : req.fields.name,
            category   : req.fields.category
        })

        image.save().then((imageStored) => {
            image.name = image._id + "." + ext_
            image.save( err => {  // Volvemos a guardar el nombre de la imagen
                if (err) {
                    console.log('=========================================================')
                    console.log(`[SliderCrud/set]: Error imagen no almacenada ${err}`)
                    console.log('=========================================================')
                    res.redirect('/app/administrator/events')
                }
            })

            fs.rename(req.files.image.path, "public/images/imagesEvents/" + image._id + "." + ext_)
            console.log('[Successful]: Imagen guardada con exito')
            res.redirect('/app/administrator/events')

        }, (err) => {
            console.log('=========================================================')
            console.log(`[SliderCrud/set]: Error oferta no almacenada ${err}`)
            console.log('=========================================================')
            res.redirect('/app/administrator/events')
        })
    },


    getImages: (req, res) => {
        Image.find({}, (err, storedEvents) => {
            if (err) {
                console.log('=========================================================')
                console.log(`[SliderCrud/getAll]: Error al buscar todos los eventos ${err}`)
                console.log('=========================================================')
                res.redirect('/app/administrator/events')
            }
            res.render('./viewsAdministrator/events/index', {events: storedEvents})
        })
    },


    getImage: (req, res) => {
        Image.findById(req.params.id, (err, storedEvent) => {
            if (err) {
                console.log('=========================================================')
                console.log(`[SliderCrud/get]: Error al buscar el evento ${err}`)
                console.log('=========================================================')
                res.redirect('/app/administrator/events')
            }
            res.render('./viewsAdministrator/events/view', {event: storedEvent})
        })
    },


    updateImage: (req, res) => {
        Image.findById(req.params.id, (err, storedEvent) => {
            if (err) {
                console.log('=========================================================')
                console.log(`[SliderCrud/update]: Error al buscar la imagen ${err}`)
                console.log('=========================================================')
                res.redirect('/app/administrator/events')
            }

            storedEvent.name     = req.fields.imageName
            storedEvent.category = req.fields.category
            storedEvent.save( err => {
                if (err) {
                    console.log('=========================================================')
                    console.log(`[SliderCrud/update]: Error al actualizar los datos ${err}`)
                    console.log('=========================================================')
                    res.redirect('/app/administrator/events')
                }
                res.redirect('/app/administrator/events')
            })
        })
    },


    deleteImage: (req, res) => {
        Image.findOneAndRemove({_id: req.params.id}, err => {
            if (err) {
                console.log('=========================================================')
                console.log(`[SliderCrud/delete]: Error al eliminar los datos ${err}`)
                console.log('=========================================================')
                res.redirect('/app/administrator/events')
            }
            res.redirect('/app/administrator/events')
        })
    },
}
