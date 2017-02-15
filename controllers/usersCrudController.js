'use strict'

const User = require('../models/modelUsers')
const fs = require('fs')

module.exports = {
    setUser: (req, res) => {
        let ext_ = req.files.photo.name.split(".").pop()
        let user = new User({
            username      : req.fields.username,
            email         : req.fields.email,
            password      : req.fields.password,
            ext           : ext_,
            administrator : req.fields.options != "true" ? false : true
        })

        user.save( err => {
            if (err) {
                console.log('=========================================================')
                console.log(`[DemandCrud/set]: Error datos no almacenados ${err}`)
                console.log('=========================================================')
                res.redirect('/')
            }
            fs.rename(req.files.photo.path, "public/images/imagesUsers/" + user._id + "." + ext_)
            console.log('[Successful]: Usuario guardado')
            res.redirect('/app/administrator/users')
        })
    },


    getUsers: (req, res) => {
        User.find({}, (err, storedUsers) => {
            if(err) {
                console.log('=========================================================')
                console.log(`[usersCrud/getAll]: Error al recuperar todos los usuarios guardados ${err}`)
                console.log('=========================================================')
                res.redirect('/app/administrator/users')
            }
            res.render('./viewsAdministrator/users/index', {users: storedUsers})
        })
    },


    getUser: (req, res) => {
        User.findById(req.params.id, (err, storedUser) => {
            if(err) {
                console.log('=========================================================')
                console.log(`[usersCrud/getUser]: Error al recuperar el usuario almacenado ${err}`)
                console.log('=========================================================')
                res.redirect('/app/administrator/users')
            }
            res.render('./viewsUserPlus/users/view', {user: storedUser})
        })
    },


    updateUser: (req, res) => {
        User.findById(req.params.id, (err, storedUser) => {
            if(err) {
                console.log('=========================================================')
                console.log(`[usersCrud/updateUser]: Error al buscar usuario por id ${err}`)
                console.log('=========================================================')
                res.redirect('/app/administrator/users')
            }
            storedUser.username  = req.fields.username
            storedUser.email     = req.fields.email
            if(req.fields.password != "") {
                storedUser.password  = req.fields.password
            }
            else if (req.files.photo.name != "") {
                fs.unlink("public/images/imagesUsers/" + storedUser.photo)
                fs.rename(req.files.photo.path, "public/images/imagesUsers/" + storedUser.photo)
            }
            storedUser.save(err => {
                if (err) {
                    console.log('=========================================================')
                    console.log(`[usersCrud/updateUser]: Error al guardar el usuario ${err}`)
                    console.log('=========================================================')
                }
                res.redirect('/app/administrator/users')
            })
        })
    },


    deleteUser: (req, res) => {
        User.findOneAndRemove({_id: req.params.id}, (err, storedUser) => {
            if (err) {
                console.log('=========================================================')
                console.log(`[usersCrud/deleteUser]: Error al borrar los datos ${err}`)
                console.log('=========================================================')
                res.redirect('/app/administrator/users')
            }
            fs.unlink("public/images/imagesUsers/" + storedUser.photo)
            res.redirect('/app/administrator/users')
        })
    },


// Sesiones ========================================================
    getNewSession: (req, res) => {
        res.render('./viewsUserPlus/users/view', {user: req.user})
    },
    getDestroySession: (req, res) => {
        req.logout()
        res.redirect('/')
    }
}
