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

        newOffer.save().then((StoredOffer) => {
            newOffer.image = newOffer._id  // Coloca de nombre, el id del registro que se hizo
            newOffer.save(function (err) {  // Volvemos a guardar el nombre de la imagen
                if (err) {
                    console.log('=========================================================')
                    console.log(`[OfferCrud/setNew]: Error oferta no almacenada ${err}`)
                    console.log('=========================================================')
                    res.redirect('/app/offers')
                }
            })
            fs.rename(req.files.image.path, "public/images/imagesOffers/" + newOffer._id + "." + ext_)  // Sube el archivo a la carpeta indicada
            console.log('[Successful]: Oferta guardada con exito')
            res.redirect('/app/offers')  // Por el momento solo muestra la oferta en json para ver que efectivamente se ha subido
        }, (error) => {
            console.log('=========================================================')
            console.log(`[OfferCrud/setNew]: Error oferta no almacenada ${error}`)
            console.log('=========================================================')
            res.redirect('/app/offers')  // En caso de que ocurra un error lo manda a imprimir
        })
    },


    getAllOffers: function(req, res) {
        Offer.find({}, function (err, storedOffers) {
            if(err) {
                console.log('=========================================================')
                console.log(`[OfferCrud/getAll]: Error al buscar todas las demandas ${err}`)
                console.log('=========================================================')
                res.redirect('/app/offers')
            }
            res.render('./viewsUserPlus/offers/offersAll', {offers: storedOffers})
        })
    },


    getOffer: function(req, res) {
        Offer.findById(req.params.id, function (err, StoredOffer) {
            if(err) {
                console.log('=========================================================')
                console.log(`[OfferCrud/getOffer]: Error al buscar la oferta ${err}`)
                console.log('=========================================================')
                res.redirect('/app/offers')
            }
            res.render('./viewsUserPlus/offers/offer', {offer: StoredOffer})
        })
    },


    updateOfferById: function(req, res) {
        Offer.findById(req.params.id, function (err, offer) {
            if(err) {
                console.log('=========================================================')
                console.log(`[OfferCrud/update]: Error al buscar la oferta ${err}`)
                console.log('=========================================================')
                res.redirect('/app/offers')
            }
            offer.business    = req.fields.business
            offer.description = req.fields.description
            offer.category    = req.fields.category
            offer.save(function (err) {
                if (err) {
                    console.log('=========================================================')
                    console.log(`[OfferCrud/update]: Error al actualizar los datos ${err}`)
                    console.log('=========================================================')
                    res.redirect('/app/offers')
                }
                res.redirect('/app/offers')
            })
        })
    },


    deleteOfferById: function(req, res) {
        Offer.findOneAndRemove({_id: req.params.id}, function (err) {
            if (err) {
                console.log('=========================================================')
                console.log(`[OfferCrud/update]: Error al eliminar los datos ${err}`)
                console.log('=========================================================')
                res.redirect('/app/offers')
            }
            res.redirect('/app/offers')
        })
    },
}
