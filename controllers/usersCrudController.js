'use strict'

const User = require('../models/modelUsers')

module.exports = {

// CRUD Users =======================================================
    setNewUser: function(req, res) {
        let user = new User({
            username   : req.fields.username,
            email      : req.fields.email,
            photo      : req.fields.photo,
            password   : req.fields.password,
            provider   : 'Local',

        })
        if (req.body.options === "true") user.administrator = true
        user.save().then((us) => {
            console.log('[Successful]: Usuario guardado')
            res.send('[Successful]: Usuario guardado')
        }, (error) => {
            console.log(`[Error Save]: Usuario no almacenado ${error}`)
            res.render('signup')
        })
    },


    getAllUsers: function(req, res) {
        User.find({}, function (err, userStored) {
            if(err) {
                console.log(`[usersCrudController]: Hubo un error recuperar los usuarios guardados ${err}`)
                res.send('[usersCrudController]: Hubo un error recuperar los usuarios guardados')
            }
            res.render('./viewsUserPlus/users/userAll', {users: userStored})
        })
    },


    getUser: function(req, res) {
        User.findById(req.params.id, function (err, user) {
            if(err) {
                console.log('Hubo un error al buscar usuario por id [usersCrudController]')
                res.send(err)
            }
            res.send(user)
        })
    },


    updateUser: function(req, res) {
        User.findById(req.params.id, function (err, user) {
            if(err) {
                console.log('Hubo un error al buscar usuario por id [usersCrudController]')
                res.send(err)
            }
            user.username  = req.fields.username
            user.email     = req.fields.email
            user.photo     = req.fields.photo
            user.password  = req.fields.password
            user.save(function (err) {
                if (err) res.send(err)
                res.send(user)
            })
        })
    },


    removeUser: function(req, res) {
        User.findOneAndRemove({_id: req.params.id}, function (err) {
            if (err) {
                console.log('Error al borrar usuario')
                res.redirect('/')
            }
            res.redirect('Usuario Eliminado con exito')
        })
    },


// Sesiones ========================================================
    getNewSession: function(req, res){
        console.log(' Ususario ', req.user)
        //console.log(' Ususario ', req.locals.user)
        res.render('user', {user: req.user})
    },
    getDestroySession: function(req, res) {
        req.logout()
        res.redirect('/')
    }
}
