'use strict'

const fs = require('fs')
const moment = require('moment')

module.exports = (app) => {
    const File = app.models.modelFiles
    const Folder = app.models.modelFolders
    const User = app.models.modelUsers

    /******************Folders ******************////
    this.setFolder = (req, res) => {
        let user = req.user
        let userId = '';

        console.log("FFFFFFFFFFFFffffileee ", Object.keys(req.body),"fin filee");

        if (user != undefined){
            console.log(Object.keys(req.session) + "   sess ")
            console.log(user['_id'])
            userId = user['_id']
        }
        else {
            // res.redirect('/accounts/signin')
        }
        //let ext_ = req.files.image.name.split(".").pop()
        let newFolder = new Folder({
            name      : req.body.name,
            creator : userId,
            /*photo          : req.file.filename,
            path           : req.file.destination,*/
            //group   : groupId

        })

        newFolder.save(err => {
            if (err) {
                console.log(`Error folder no almacenado ${err}`)

                res.redirect('/files')
            }
            //fs.rename(req.files.image.path, "public/images/imagesFolders/" + newFolder._id + "." + ext_)
            console.log('[Successful]: Folder guardada con exito')
            res.redirect('/files')
        })
    }


    /******************Files ******************////

    this.setFile = (req, res) => {

        console.log("FFFFFFFFFFFFffffileee ", Object.keys(req.params),"fin filee22  1 ");
        console.log("FFFFFFFFFFFFffffilee22  1 e ", Object.keys(req.body),"fin filee22  1 ");

        //let ext_ = req.files.image.name.split(".").pop()
        let newFile = new File({
            business      : req.body.business,
            //ext           : ext_,
            description   : req.body.description,
            category      : req.body.category,
            photo          : req.file.filename,
            path           : req.file.destination,
            // contact       : 'id_contact', // todo usar id de cada equema para relacionarlo
            // creator       : 'id_creator'
        })

        newFile.save(err => {
            if (err) {
                console.log(`Error file no almacenada ${err}`)

                res.redirect('/files')
            }
            //fs.rename(req.files.image.path, "public/files/" + newFile._id + "." + ext_)
            console.log('[Successful]: Archivo guardado con exito')
            res.redirect('/files')
        })
    }


    this.getFiles = (req, res) => {

        Folder.find({}, (err, storedFolders) => {
            User.populate(storedFolders, {path: "creator"}, (err, storedFolders) => {
                if(err) {
                    console.log(`getGroup   Error al buscar  Ueser group ${err}`)
                }
                ///console.log("/////// Group ----- " + storedFolders +" ------------");

                res.render('./viewsUserPlus/files/index', {folders: storedFolders})

            });

            if(err) {
                console.log(`Error al buscar todo file ${err}`)
                res.redirect('/files')
            }

        })
    }


    this.getFile = (req, res) => {
        File.findById(req.params.id, (err, storedFile) => {
            if(err) {
                console.log(`Error al buscar file ${err}`)
                res.redirect('/files')
            }
            res.render('./viewsUserPlus/files/view', {file: storedFile})
        })
    }

    // TODO archivos por grupo / user
    this.getFilesByUser = (req, res) => {
        File.findById(req.params.id, (err, storedFile) => {
            if(err) {
                console.log(`Error al buscar file ${err}`)
                res.redirect('/files')
            }
            res.render('./viewsUserPlus/files/view', {file: storedFile})
        })
    }

    this.getFilesByGroup = (req, res) => {
        File.findById(req.params.id, (err, storedFile) => {
            if(err) {
                console.log(`Error al buscar file ${err}`)
                res.redirect('/files')
            }
            res.render('./viewsUserPlus/files/view', {file: storedFile})
        })
    }


    this.updateFile = (req, res) => {
        File.findById(req.params.id, (err, storedFile) => {
            if(err) {
                console.log(`pdate]: Error al buscar la oferta ${err}`)
                res.redirect('/files')
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
                    res.redirect('/files')
                }
                res.redirect('/files')
            })
        })
    }


    this.deleteFile = (req, res) => {
        File.findOneAndRemove({_id: req.params.id}, (err, storedFile) => {
            if (err) {
                console.log(`Error al eliminar los datos ${err}`)
                res.redirect('/files')
            }
            //fs.unlink("public/files/" + storedFile.image)
            res.redirect('/files')
        })
    }

    this.deleteFolder = (req, res) => {
        Folder.findOneAndRemove({_id: req.params.id}, (err, storedFolder) => {
            if (err) {
                console.log(`Error al eliminar los datos ${err}`)
                res.redirect('/files')
            }

            res.redirect('/files')
        })
    }

    return this
}
