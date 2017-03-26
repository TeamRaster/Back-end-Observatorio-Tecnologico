'use strict'

const File = require('../models/modelFiles')
const Folder = require('../models/modelFolders')
const User = require('../models/modelUsers')
const fs = require('fs')

module.exports = {

    /******************Folders ******************////
    setFolder: (req, res) => {
        let user = req.user
        let userId = '';

        if (user != undefined){
            console.log(Object.keys(req.session) + "sess ")
            console.log(user['_id'])
            userId = user['_id']
        }
        else {
            res.redirect('/accounts/signin')
        }

        let ext_ = req.files.image.name.split(".").pop()
        let newFolder = new Folder({
            name      : req.body.name,
            creator : userId,
            //group   : groupId

        })

        newFolder.save(err => {
            if (err) {
                console.log(`Error folder no almacenado ${err}`)

                res.redirect('/app/files')
            }
            fs.rename(req.files.image.path, "public/images/imagesFolders/" + newFolder._id + "." + ext_)
            console.log('[Successful]: Folder guardada con exito')
            res.redirect('/app/files')
        })
    },


    /******************Files ******************////

    setFile: (req, res) => {
        let ext_ = req.files.image.name.split(".").pop()
        let newFile = new File({
            business      : req.body.business,
            ext           : ext_,
            description   : req.body.description,
            category      : req.body.category,
            // contact       : 'id_contact', // todo usar id de cada equema para relacionarlo
            // creator       : 'id_creator'
        })

        newFile.save(err => {
            if (err) {
                console.log(`Error file no almacenada ${err}`)

                res.redirect('/admin/files')
            }
            fs.rename(req.files.image.path, "public/files/" + newFile._id + "." + ext_)
            console.log('[Successful]: Archivo guardado con exito')
            res.redirect('/admin/files')
        })
    },


    getFiles: (req, res) => {
        Folder.find({}, (err, storedFolders) => {
            User.populate(storedFolders, {path: "creator"}, (err, storedFolders) => {
                if(err) {
                    console.log(`getGroup   Error al buscar  Ueser group ${err}`)
                }
                //res.status(200).send(storedGroup);
                console.log("/////// Group ----- " + storedFolders +" ------------");
                res.render('./viewsUserPlus/files/index', {folders: storedFolders})
            });

            if(err) {
                console.log(`Error al buscar todo file ${err}`)
                res.redirect('/app/files')
            }

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

    // TODO archivos por grupo / user
    getFilesByUser: (req, res) => {
        File.findById(req.params.id, (err, storedFile) => {
            if(err) {
                console.log(`Error al buscar file ${err}`)
                res.redirect('/app/files')
            }
            res.render('./viewsUserPlus/files/view', {file: storedFile})
        })
    },

    getFilesByGroup: (req, res) => {
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
            storedFile.business    = req.body.business
            storedFile.description = req.body.description
            storedFile.category    = req.body.category

            if (req.files.image.name != "") {
                let ext_ = req.files.image.name.split(".").pop()
                fs.unlink("public/files/" + storedFile.image)
                fs.rename(req.files.image.path, "public/files/" + storedFile.image)
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
            fs.unlink("public/files/" + storedFile.image)
            res.redirect('/app/files')
        })
    },

}
