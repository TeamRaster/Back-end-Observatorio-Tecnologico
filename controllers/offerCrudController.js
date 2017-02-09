'use strict'

const Offer = require('../models/modelOffer')
const fs = require('fs')

module.exports = {

// CRUD Ofertas =======================================================
    setNewOferta: function (req, res) {
        let ext_ = req.files.image.name.split(".").pop()
        let newOffer = new Offer({
            business      : req.fields.business,
            image         : req.fields.image,
            ext           : ext_,
            description   : req.fields.description,
            category      : req.fields.category,
            contact       : 'id_contact', // todo Cuando este en funcionamiento, usar id de cada equema para relacionarlo
            creator       : 'id_creator'
        })

        newOffer.save().then((us) => {
            console.log('[Successful]: Oferta guardada')
            fs.rename(req.files.image.path, "public/images/imagesOffer" + newOffer._id + "." + ext_)  // Sube el archivo, le coloca un nombre
            res.redirect('/app/ofertas/' + newOffer._id)  // Muestra la oferta individual
        }, (error) => {
            console.log(`[Error Save]: Oferta no almacenado ${error}`)
            res.send(err)
        })
    },

    getAllOfertas: function(req, res) {
        Offer.find({}), function (err, offerStored) {
            if(err) {
                console.log('Hubo un error al buscar todas las Ofertas[offerCrudController]')
                res.send(err)
            }
            res.send(offerStored)
        }
    },
    getOferta: function(req, res) {
        Offer.findById(req.params.id, function (err, offer) {
            if(err) {
                console.log('Hubo un error al buscar oferta por id [offerCrudController]')
                res.send(err)
            }
            res.send(offer)
        })
    },
    updateOfertaById: function(req, res) {

    },

    deleteOfertaById: function(req, res) {
        Offer.findOneAndRemove({_id: req.params.id}, function (err) {
            if (err) {
                console.log('Error al borrar la oferta')
                res.send(err)
            }
            res.send('Se borro exitosamente')
        })
    },


}
