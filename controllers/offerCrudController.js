'use strict'

const Offer = require('../models/modelOffer')
const fs = require('fs')

module.exports = {
    setOffer: (req, res) => {
        let ext_ = req.files.image.name.split(".").pop()
        let newOffer = new Offer({
            business      : req.fields.business,
            ext           : ext_,
            description   : req.fields.description,
            category      : req.fields.category,
            // contact       : 'id_contact', // todo usar id de cada equema para relacionarlo
            // creator       : 'id_creator'
        })

        newOffer.save(err => {
            if (err) {
                console.log('=========================================================')
                console.log(`[OfferCrud/setNew]: Error oferta no almacenada ${err}`)
                console.log('=========================================================')
                res.redirect('/app/offers')
            }
            fs.rename(req.files.image.path, "public/images/imagesOffers/" + newOffer._id + "." + ext_)
            console.log('[Successful]: Oferta guardada con exito')
            res.redirect('/app/offers')
        })
    },


    getOffers: (req, res) => {
        Offer.find({}, (err, storedOffers) => {
            if(err) {
                console.log('=========================================================')
                console.log(`[OfferCrud/getAll]: Error al buscar todas las demandas ${err}`)
                console.log('=========================================================')
                res.redirect('/app/offers')
            }
            res.render('./viewsUserPlus/offers/index', {offers: storedOffers})
        })
    },


    getOffer: (req, res) => {
        Offer.findById(req.params.id, (err, storedOffer) => {
            if(err) {
                console.log('=========================================================')
                console.log(`[OfferCrud/getOffer]: Error al buscar la oferta ${err}`)
                console.log('=========================================================')
                res.redirect('/app/offers')
            }
            res.render('./viewsUserPlus/offers/view', {offer: storedOffer})
        })
    },


    updateOffer: (req, res) => {
        Offer.findById(req.params.id, (err, storedOffer) => {
            if(err) {
                console.log('=========================================================')
                console.log(`[OfferCrud/update]: Error al buscar la oferta ${err}`)
                console.log('=========================================================')
                res.redirect('/app/offers')
            }
            storedOffer.business    = req.fields.business
            storedOffer.description = req.fields.description
            storedOffer.category    = req.fields.category

            if (req.files.image.name != "") {
                let ext_ = req.files.image.name.split(".").pop()
                fs.unlink("public/images/imagesOffers/" + storedOffer.image)
                fs.rename(req.files.image.path, "public/images/imagesOffers/" + storedOffer.image)
            }

            storedOffer.save(err => {
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


    deleteOffer: (req, res) => {
        Offer.findOneAndRemove({_id: req.params.id}, (err, storedOffer) => {
            if (err) {
                console.log('=========================================================')
                console.log(`[OfferCrud/update]: Error al eliminar los datos ${err}`)
                console.log('=========================================================')
                res.redirect('/app/offers')
            }
            fs.unlink("public/images/imagesOffers/" + storedOffer.image)
            res.redirect('/app/offers')
        })
    },
}
