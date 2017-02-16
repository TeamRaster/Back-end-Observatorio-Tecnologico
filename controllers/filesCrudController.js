'use strict'

const Files = require('../models/modelFiles')
const fs = require('fs')

module.exports = {
    setFile: (req, res) => {
        let ext_ = req.files.image.name.split(".").pop()
        let newFile = new File({
            business      : req.fields.business,
            ext           : ext_,
            description   : req.fields.description,
            category      : req.fields.category,
            // contact       : 'id_contact', // todo usar id de cada equema para relacionarlo
            // creator       : 'id_creator'
        })

        newFile.save(err => {
            if (err) {
                console.log(`Error file no almacenada ${err}`)

                res.redirect('/app/files')
            }
            fs.rename(req.files.image.path, "public/images/imagesFiles/" + newFile._id + "." + ext_)
            console.log('[Successful]: Oferta guardada con exito')
            res.redirect('/app/files')
        })
    },


    getFiles: (req, res) => {
        File.find({}, (err, storedFiles) => {
            if(err) {
                console.log(`Error al buscar todo file ${err}`)
                res.redirect('/app/files')
            }
            res.render('./viewsUserPlus/files/index', {offers: storedFiles})
        })
    },


    getFile: (req, res) => {
        File.findById(req.params.id, (err, storedFile) => {
            if(err) {
                console.log(`Error al buscar file ${err}`)
                res.redirect('/app/files')
            }
            res.render('./viewsUserPlus/files/view', {file: storedFile})
        })
    },


    updateFile: (req, res) => {
        File.findById(req.params.id, (err, storedFile) => {
            if(err) {
                console.log(`pdate]: Error al buscar la oferta ${err}`)
                res.redirect('/app/files')
            }
            storedFile.business    = req.fields.business
            storedFile.description = req.fields.description
            storedFile.category    = req.fields.category

            if (req.files.image.name != "") {
                let ext_ = req.files.image.name.split(".").pop()
                fs.unlink("public/images/imagesFiles/" + storedFile.image)
                fs.rename(req.files.image.path, "public/images/imagesFiles/" + storedFile.image)
            }

            storedFile.save(err => {
                if (err) {
                    console.log(`Error al actualizar los datos  file ${err}`)
                    res.redirect('/app/files')
                }
                res.redirect('/app/files')
            })
        })
    },


    deleteFile: (req, res) => {
        File.findOneAndRemove({_id: req.params.id}, (err, storedFile) => {
            if (err) {
                console.log(`Error al eliminar los datos ${err}`)
                res.redirect('/app/files')
            }
            fs.unlink("public/images/imagesFiles/" + storedFile.image)
            res.redirect('/app/files')
        })
    },
}
