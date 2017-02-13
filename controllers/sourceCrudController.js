'use strict'

const Source = require('../models/modelSource')
const fs = require('fs')

module.exports = {
    setSource: (req, res) => {
        let ext_ = req.files.image.name.split(".").pop()
        let source = new Source({
            title       : req.fields.title
        })

        source.save().then((storedSource) => {
            source.image = source._id + "." + ext_
            source.save( err => {
                if (err) {
                    console.log('=========================================================')
                    console.log(`[SourceCrud/set]: Error datos no almacenados ${err}`)
                    console.log('=========================================================')
                    res.redirect('/app/administrator/sources')
                }
            })

            fs.rename(req.files.image.path, "public/images/imagesSources/" + source._id + "." + ext_)
            console.log('[Successful]: Datos almacenados')
            res.redirect('/app/administrator/sources')

        }, err => {
            console.log('=========================================================')
            console.log(`[SourceCrud/set]: Error datos no almacenados ${err}`)
            console.log('=========================================================')
            res.redirect('/app/administrator/sources')
        })
    },


    getSources: (req, res) => {
        Source.find({}, (err, storedSources) => {
            if (err) {
                console.log('=========================================================')
                console.log(`[SourceCrud/getAll]: Error al buscar los datos ${err}`)
                console.log('=========================================================')
                res.redirect('/app/administrator/sources')
            }
            res.render('./viewsAdministrator/sources/index', {sources: storedSources})
        })
    },


    getSource: (req, res) => {
        Source.findById(req.params.id, (err, storedSource) => {
            if (err) {
                console.log('=========================================================')
                console.log(`[SourceCrud/get]: Error al recuperar el dato ${err}`)
                console.log('=========================================================')
                res.redirect('/app/administrator/sources')
            }
            res.render('./viewsAdministrator/sources/view', {source: storedSource})
        })
    },


    updateSource: (req, res) => {
        Source.findById(req.params.id, (err, storedSource) => {
            if (err) {
                console.log('=========================================================')
                console.log(`[SourceCrud/update]: Error al recuperar el dato ${err}`)
                console.log('=========================================================')
                res.redirect('/app/administrator/sources')
            }

            storedSource.title = req.fields.title
            // todo aun no esta lista
            // storedSource.image = req.fields.imageName
            storedSource.save( err => {
                if (err) {
                    console.log('=========================================================')
                    console.log(`[SourceCrud/update]: Error al actualizar los datos ${err}`)
                    console.log('=========================================================')
                    res.redirect('/app/administrator/sources')
                }
                res.redirect('/app/administrator/sources')
            })
        })
    },


    deleteSource: (req, res) => {
        Source.findOneAndRemove({_id: req.params.id}, err => {
            if (err) {
                console.log('=========================================================')
                console.log(`[SourceCrud/delete]: Error al eliminar los datos ${err}`)
                console.log('=========================================================')
                res.redirect('/app/administrator/sources')
            }
            res.redirect('/app/administrator/sources')
        })
    },
}
