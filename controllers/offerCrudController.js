'use strict'

const Offer = require('../models/modelOffer')
const fs = require('fs')

module.exports = {

// CRUD Ofertas =======================================================
    setNewOffer: function (req, res) {
        let ext_ = req.files.image.name.split(".").pop()
        let newOffer = new Offer({
            business      : req.fields.business,
            ext           : ext_,
            description   : req.fields.description,
            category      : req.fields.category,
            // contact       : 'id_contact', // todo Cuando este en funcionamiento, usar id de cada equema para relacionarlo
            // creator       : 'id_creator'
        })

        newOffer.save().then((offer) => {
            newOffer.image = newOffer._id  // Coloca de nombre, el id del registro que se hizo
            newOffer.save(function (err) {  // Volvemos a guardar el nombre de la imagen
                if (err) res.send(err)
            })
            fs.rename(req.files.image.path, "public/images/imagesOffers/" + newOffer._id + "." + ext_)  // Sube el archivo a la carpeta indicada
            console.log('[Successful]: Oferta guardada con exito')
            res.send(offer)  // Por el momento solo muestra la oferta en json para ver que efectivamente se ha subido
        }, (error) => {
            console.log(`[Error Save]: Oferta no almacenada ${error}`)
            res.send(err)  // En caso de que ocurra un error lo manda a imprimir
        })
    },

    getAllOffers: function(req, res) {
        Offer.find({}, function (err, offerStored) {
            if(err) {
                console.log('Hubo un error al buscar todas las Ofertas[offerCrudController]')
                res.send(err)
            }
            res.send(offerStored)
        })
    },
    getOffer: function(req, res) {
        Offer.findById(req.params.id, function (err, offer) {
            if(err) {
                console.log('Hubo un error al buscar oferta por id [offerCrudController]')
                res.send(err)
            }
            // res.locals.offer = offer
            res.send(offer)
        })
    },
    updateOfferById: function(req, res) {
        Offer.findById(req.params.id, function (err, offer) {
            if(err) {
                console.log('Hubo un error al buscar oferta por id [offerCrudController]')
                res.send(err)
            }
            offer.business    = req.fields.business
            offer.description = req.fields.description
            offer.category    = req.fields.category
            offer.save(function (err) {
                if (err) res.send(err)
                res.send(offer)
            })
        })
    },

    deleteOfferById: function(req, res) {
        Offer.findOneAndRemove({_id: req.params.id}, function (err) {
            if (err) {
                console.log('Error al borrar la oferta')
                res.send(err)
            }
            res.send('Se borro exitosamente')
        })
    },


}
