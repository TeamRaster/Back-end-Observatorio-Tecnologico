// 'use strict'
//
// const Source = require('../models/modelSource')
// const fs = require('fs')
// const redirect = '/administrator/sources'
//
// module.exports = {
//     setSource: (req, res) => {
//         let ext_ = req.files.image.name.split(".").pop()
//         let source = new Source({
//             title  : req.fields.title,
//             type   : req.fields.types
//             // author       : req.fields.title,
//         })
//
//         source.save(err => {
//             source.image = source._id + "." + ext_
//             source.save( err => {
//                 if (err) {
//                     console.log('=========================================================')
//                     console.log(`[SourceCrud/set]: Error datos no almacenados ${err}`)
//                     console.log('=========================================================')
//                     res.redirect(redirect)
//                 }
//             })
//
//             fs.rename(req.files.image.path, "public/images/imagesSources/" + source._id + "." + ext_)
//             console.log('[Successful]: Datos almacenados')
//             res.redirect(redirect)
//         })
//     },
//
//
//     getSources: (req, res) => {
//         Source.find({}, (err, storedSources) => {
//             if (err) {
//                 console.log('=========================================================')
//                 console.log(`[SourceCrud/getAll]: Error al buscar los datos ${err}`)
//                 console.log('=========================================================')
//                 res.redirect('/administrator/sources')
//             }
//             res.render('./viewsAdministrator/sources/index', {sources: storedSources})
//         })
//     },
//
//     getall: (req, res) => {
//         Source.find({type: req.params.type}, (err, storedSources) => {
//             if (err) {
//                 console.log('=========================================================')
//                 console.log(`[SourceCrud/getAll]: Error al buscar los datos ${err}`)
//                 console.log('=========================================================')
//                 res.redirect(redirect)
//             }
//             res.render('./viewsAdministrator/sources/index', {sources: storedSources})
//         })
//     },
//
//     getSource: (req, res) => {
//         Source.findById(req.params.id, (err, storedSource) => {
//             if (err) {
//                 console.log('=========================================================')
//                 console.log(`[SourceCrud/get]: Error al recuperar el dato ${err}`)
//                 console.log('=========================================================')
//                 res.redirect(redirect)
//             }
//             res.render('./viewsAdministrator/sources/view', {source: storedSource})
//         })
//     },
//
//
//     updateSource: (req, res) => {
//         Source.findById(req.params.id, (err, storedSource) => {
//             if (err) {
//                 console.log('=========================================================')
//                 console.log(`[SourceCrud/update]: Error al recuperar el dato ${err}`)
//                 console.log('=========================================================')
//                 res.redirect(redirect)
//             }
//
//             storedSource.title = req.fields.title
//             storedSource.type = req.fields.types
//
//             if (req.files.image.name != "") {
//                 let ext_ = req.files.image.name.split(".").pop()
//                 fs.unlink("public/images/imagesSources/" + storedSource.image)
//                 fs.rename(req.files.image.path, "public/images/imagesSources/" + storedSource._id + "." + ext_)
//             }
//
//             storedSource.save( err => {
//                 if (err) {
//                     console.log('=========================================================')
//                     console.log(`[SourceCrud/update]: Error al actualizar los datos ${err}`)
//                     console.log('=========================================================')
//                     res.redirect(redirect)
//                 }
//                 res.redirect(redirect)
//             })
//         })
//     },
//
//
//     deleteSource: (req, res) => {
//         Source.findOneAndRemove({_id: req.params.id}, (err, storedSource) => {
//             if (err) {
//                 console.log('=========================================================')
//                 console.log(`[SourceCrud/delete]: Error al eliminar los datos ${err}`)
//                 console.log('=========================================================')
//                 res.redirect(redirect)
//             }
//             fs.unlink("public/images/imagesSources/" + storedSource.image)
//             res.redirect(redirect)
//         })
//     },
//
//     getViewSourceNew: (req, res) => {
//         return res.render('viewsAdministrator/sources/new')
//     },
//
//     getViewSourceEdit: (req, res) => {
//         Source.findById(req.params.id, (err, storedSource) => {
//             if (err) {
//                 console.log('=========================================================')
//                 console.log('[viewsController/getVieSourceEdit]: Error al hacer la busqueda')
//                 console.log('=========================================================')
//                 res.redirect(redirect)
//             }
//             return res.render('viewsAdministrator/sources/update', {source: storedSource})
//         })
//     },
// }
