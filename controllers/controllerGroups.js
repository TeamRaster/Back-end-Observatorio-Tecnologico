// 'use strict'
//
// const Group = require('../models/modelGroups')
// const fs = require('fs')
//
// module.exports = {
//     setGroup: (req, res) => {
//         let ext_ = req.files.image.name.split(".").pop()
//         let newGroup = new Group({
//
//             name      : req.fields.name,
//             description   : req.fields.description,
//             ///creator      : 'id_creator',
//
//             // contact       : 'id_contact', // todo usar id de cada equema para relacionarlo
//             // creator       : 'id_creator'
//         })
//
//         newGroup.save(err => {
//             if (err) {
//                 console.log(`  Error group no almacenada ${err}`)
//                 res.redirect('/app/groups')
//             }
//             fs.rename(req.files.image.path, "public/images/imagesGroup/" + newGroup._id + "." + ext_)
//             console.log('[Successfuld  Oferta guardada con exito')
//             res.redirect('/app/groups')
//         })
//     },
//
//
//     getGroups: (req, res) => {
//         Group.find({}, (err, storedGroups) => {
//             if(err) {
//                 console.log(`  Error al buscar todo grupo ${err}`)
//                 res.redirect('/app/groups')
//             }
//             res.render('./viewsUserPlus/groups/index', {groups: storedGroups})
//         })
//     },
//
//
//     getGroup: (req, res) => {
//         Group.findById(req.params.id, (err, storedGroup) => {
//             if(err) {
//                 console.log(`getGroup   Error al buscar  group ${err}`)
//                 res.redirect('/app/groups')
//             }
//             res.render('./viewsUserPlus/groups/view', {group: storedGroup})
//         })
//     },
//
//
//     updateGroup: (req, res) => {
//         Group.findById(req.params.id, (err, storedGroup) => {
//             if(err) {
//                 console.log(`  Error al buscar el grupo ${err}`)
//                 res.redirect('/app/groups')
//             }
//             storedGroup.business    = req.fields.business
//             storedGroup.description = req.fields.description
//             storedGroup.category    = req.fields.category
//
//             if (req.files.image.name != "") {
//                 let ext_ = req.files.image.name.split(".").pop()
//                 fs.unlink("public/images/imagesGroup/" + storedGroup.image)
//                 fs.rename(req.files.image.path, "public/images/imagesGroup/" + storedGroup.image)
//             }
//
//             storedGroup.save(err => {
//                 if (err) {
//                     console.log(`  Error al actualizar los datos ${err}`)
//                     res.redirect('/app/groups')
//                 }
//                 res.redirect('/app/groups')
//             })
//         })
//     },
//
//
//     deleteGroup: (req, res) => {
//         Group.findOneAndRemove({_id: req.params.id}, (err, storedGroup) => {
//             if (err) {
//                 console.log(`  Error al eliminar los datos ${err}`)
//                 res.redirect('/app/groups')
//             }
//             fs.unlink("public/images/imagesGroup/" + storedGroup.image)
//             res.redirect('/app/groups')
//         })
//     },
// }
