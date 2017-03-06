// 'use strict'
//
// const Offer = require('../models/modelOffer')
// const fs = require('fs')
// const moment = require('moment')
//
// module.exports = {
//     setOffer: (req, res) => {
//         let ext_ = req.files.image.name.split(".").pop()
//         let newOffer = new Offer({
//             business      : req.fields.business,
//             ext           : ext_,
//             description   : req.fields.description,
//             category      : req.fields.category,
//             postedBy      : req.session.user._id,
//             creationOffer : moment().format('MMMM Do YYYY, h:mm a')
//         })
//
//         newOffer.save(err => {
//             if (err) {
//                 console.log('=========================================================')
//                 console.log(`[OfferCrud/setNew]: Error oferta no almacenada ${err}`)
//                 console.log('=========================================================')
//                 return res.redirect('/app/offers')
//             }
//             fs.rename(req.files.image.path, "public/images/imagesOffers/" + newOffer._id + "." + ext_)
//             console.log('[Successful]: Oferta guardada con exito')
//             return res.redirect('/app/offers')
//         })
//     },
//
//
//     getOffers: (req, res) => {
//         Offer.find({}, (err, storedOffers) => {
//             if(err) {
//                 console.log('=========================================================')
//                 console.log(`[OfferCrud/getAll]: Error al buscar todas las demandas ${err}`)
//                 console.log('=========================================================')
//                 return res.redirect('/app/offers')
//             }
//             return res.render('./viewsUserPlus/offers/index', {offers: storedOffers})
//         })
//     },
//
//
//     getOffer: (req, res) => {
//         // Offer.findById(req.params.id, (err, storedOffer) => {
//         //     if(err) {
//         //         console.log('=========================================================')
//         //         console.log(`[OfferCrud/getOffer]: Error al buscar la oferta ${err}`)
//         //         console.log('=========================================================')
//         //         res.redirect('/app/offers')
//         //     }
//         //     res.render('./viewsUserPlus/offers/view', {offer: storedOffer})
//         // })
//         Offer.findById(req.params.id)
//         .populate('postedBy comments.postedBy')
//         .exec((err, storedOffer) => {
//             if(err) {
//                 console.log('=========================================================')
//                 console.log(`[OfferCrud/getOffer]: Error al buscar la oferta ${err}`)
//                 console.log('=========================================================')
//                 return res.redirect('/app/offers')
//             }
//             return res.render('./viewsUserPlus/offers/view', {offer: storedOffer})
//         })
//     },
//
//
//     updateOffer: (req, res) => {
//         Offer.findById(req.params.id, (err, storedOffer) => {
//             if(err) {
//                 console.log('=========================================================')
//                 console.log(`[OfferCrud/update]: Error al buscar la oferta ${err}`)
//                 console.log('=========================================================')
//                 return res.redirect('/app/offers')
//             }
//             storedOffer.business    = req.fields.business
//             storedOffer.description = req.fields.description
//             storedOffer.category    = req.fields.category
//
//             if (req.files.image.name != "") {
//                 let ext_ = req.files.image.name.split(".").pop()
//                 fs.unlink("public/images/imagesOffers/" + storedOffer.image)
//                 fs.rename(req.files.image.path, "public/images/imagesOffers/" + storedOffer.image)
//             }
//
//             storedOffer.save(err => {
//                 if (err) {
//                     console.log('=========================================================')
//                     console.log(`[OfferCrud/update]: Error al actualizar los datos ${err}`)
//                     console.log('=========================================================')
//                     return res.redirect('/app/offers')
//                 }
//                 return res.redirect('/app/offers')
//             })
//         })
//     },
//
//
//     deleteOffer: (req, res) => {
//         Offer.findOneAndRemove({_id: req.params.id}, (err, storedOffer) => {
//             if (err) {
//                 console.log('=========================================================')
//                 console.log(`[OfferCrud/update]: Error al eliminar los datos ${err}`)
//                 console.log('=========================================================')
//                 return res.redirect('/app/offers')
//             }
//             fs.unlink("public/images/imagesOffers/" + storedOffer.image)
//             return res.redirect('/app/offers')
//         })
//     },
//
//     getViewOfferNew: (req, res) => {
//         return res.render('viewsUserPlus/offers/new')
//     },
//     getViewOfferEdit: (req, res) => {
//         Offer.findById(req.params.id,  (err, storedOffer) => {
//             if(err) {
//                 console.log('=========================================================')
//                 console.log('[viewsController/getViewOfferEdit]: Error al hacer la busqueda')
//                 console.log('=========================================================')
//                 return res.redirect('/app/offers')
//             }
//
//             return res.render('viewsUserPlus/offers/update', {offer: storedOffer})
//         })
//     },
//
//     setComment: (req, res) => {
//         console.log('Entro el setComment')
//         Offer.findById(req.params.id,  (err, storedOffer) => {
//             if(err) {
//                 console.log('=========================================================')
//                 console.log('[OffersController/setComment]: Error al hacer la busqueda')
//                 console.log('=========================================================')
//                 return res.redirect('/app/offers')
//             }
//             console.log('req.body')
//             console.log(req.body)
//             storedOffer.comments.push({
//                 postedBy : req.session.user._id,
//                 comment  : req.body.comment,
//                 date     : req.body.date
//             })
//             storedOffer.stats.comments = storedOffer.stats.comments + 1
//             storedOffer.save(err => {
//                 if (err) {
//                     console.log('=========================================================')
//                     console.log(`[OfferCrud/update]: Error al actualizar los datos ${err}`)
//                     console.log('=========================================================')
//                     return res.redirect('/app/offers')
//                 }
//                 console.log('Comentario almaceando en el crud')
//                 return res.redirect('/app/offers/' + storedOffer._id)
//             })
//         })
//     },
//
//     setLike: (req, res) => {
//         Offer.findById(req.params.id,  (err, storedOffer) => {
//             if(err) {
//                 console.log('=========================================================')
//                 console.log('[OffersController/setComment]: Error al hacer la busqueda')
//                 console.log('=========================================================')
//                 return res.redirect('/app/offers')
//             }
//             if (storedOffer.stats.likes)
//             storedOffer.stats.likes = storedOffer.stats.likes + 1
//             console.log('Setlike')
//             console.log(req.body)
//             storedOffer.save(err => {
//                 if (err) {
//                     console.log('=========================================================')
//                     console.log(`[OfferCrud/update]: Error al actualizar los datos ${err}`)
//                     console.log('=========================================================')
//                     return res.redirect('/app/offers')
//                 }
//                 return res.redirect('/app/offers/' + storedOffer._id)
//             })
//         })
//     },
//
//     deleteLike: (req, res) => {
//         Offer.findById(req.params.id,  (err, storedOffer) => {
//             if(err) {
//                 console.log('=========================================================')
//                 console.log('[OffersController/setComment]: Error al hacer la busqueda')
//                 console.log('=========================================================')
//                 return res.redirect('/app/offers')
//             }
//             storedOffer.stats.likes = storedOffer.stats.likes - 1
//             console.log('deleteLike')
//             console.log(storedOffer.stats.likes)
//             console.log(req.params)
//             storedOffer.save(err => {
//                 if (err) {
//                     console.log('=========================================================')
//                     console.log(`[OfferCrud/update]: Error al actualizar los datos ${err}`)
//                     console.log('=========================================================')
//                     return res.redirect('/app/offers')
//                 }
//                 return res.redirect('/app/offers/' + storedOffer._id)
//             })
//         })
//     },
//
//     setdislike: (req, res) => {},
//
//     deleteDislike: (req, res) => {},
// }
