'use strict'

const User = require('../models/modelUsers')
const fs = require('fs')

module.exports = {

// CRUD Users =======================================================
    setNewUser: function(req, res) {
        let ext_ = req.files.photo.name.split(".").pop()
        let user = new User({
            username      : req.fields.username,
            email         : req.fields.email,
            photo         : req.fields.photo,
            password      : req.fields.password,
            ext           : ext_
        })

        user.save().then((storedUser) => {
            user.administrator = req.fields.options != "true" ? false : true
            user.photo = user._id  // Coloca de nombre, el id del registro que se hizo
            user.providerId = user._id  // Como proveedor es local el id es el de registro
            user.save(function (err) {  // Volvemos a guardar el nombre de la imagen
                if (err) {
                    console.log('=========================================================')
                    console.log(`[DemandCrud/setNew]: Error demanda no almacenada ${err}`)
                    console.log('=========================================================')
                    res.redirect('/app/demands')
                }
            })
            fs.rename(req.files.photo.path, "public/images/imagesUsers/" + user._id + "." + ext_)

            console.log('[Successful]: Usuario guardado')
            res.redirect('/app/users')
        }, (error) => {
            console.log('=========================================================')
            console.log(`[usersCrud/setNew]: Usuario no almacenado ${error}`)
            console.log('=========================================================')
            res.render('signup')
        })
    },


    getAllUsers: function(req, res) {
        User.find({}, function (err, storedUsers) {
            if(err) {
                console.log('=========================================================')
                console.log(`[usersCrud/getAll]: Error al recuperar todos los usuarios guardados ${err}`)
                console.log('=========================================================')
                res.redirect('/app/users')
            }
            res.render('./viewsUserPlus/users/usersAll', {users: storedUsers})
        })
    },


    getUser: function(req, res) {
        User.findById(req.params.id, function (err, storedUser) {
            if(err) {
                console.log('=========================================================')
                console.log(`[usersCrud/getUser]: Error al recuperar el usuario almacenado ${err}`)
                console.log('=========================================================')
                res.redirect('/app/users')
            }
            res.render('./viewsUserPlus/users/user', {user: storedUser})
        })
    },


    updateUser: function(req, res) {
        User.findById(req.params.id, function (err, user) {
            if(err) {
                console.log('=========================================================')
                console.log(`[usersCrud/updateUser]: Error al buscar usuario por id ${err}`)
                console.log('=========================================================')
                res.redirect('/app/users')
            }
            user.username  = req.fields.username
            user.email     = req.fields.email
            user.photo     = req.fields.photo
            if(req.fields.password =! "") {
                console.log('Entroooo :c')
                user.password  = req.fields.password
            }
            user.save(function (err) {
                if (err) {
                    console.log('=========================================================')
                    console.log(`[usersCrud/updateUser]: Error al guardar el usuario ${err}`)
                    console.log('=========================================================')
                }
                res.redirect('/app/users')
            })
        })
    },


    deleteUser: function(req, res) {
        User.findOneAndRemove({_id: req.params.id}, function (err) {
            if (err) {
                console.log('=========================================================')
                console.log(`[usersCrud/deleteUser]: Error al borrar los datos ${err}`)
                console.log('=========================================================')
                res.redirect('/app/users')
            }
            res.redirect('/app/users')
        })
    },


// Sesiones ========================================================
    getNewSession: function(req, res){
        res.render('./viewsUserPlus/users/user', {user: req.user})
    },
    getDestroySession: function(req, res) {
        req.logout()
        res.redirect('/')
    }
}
