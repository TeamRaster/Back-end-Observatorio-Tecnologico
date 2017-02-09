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
        else user.administrator = false

        user.save().then((us) => {
            console.log('[Successful]: Usuario guardado')
            res.redirect('/')
        }, (error) => {
            console.log(`[Error Save]: Usuario no almacenado ${error}`)
            res.render('signup')
        })
    },

    getAllUsers: function(req, res) {
        User.find({}, function (err, userStored) {
            if(err) {
                console.log('Hubo un error al buscar todos los usuarios[usersCrudController]')
                res.redirect('/')
                return
            }
            res.render('TestAllUsers', {users: userStored})
        })
    },

    getUser: function(req, res) {
        User.findById(req.params.id, function (err, user) {
            if(err) {
                console.log('Hubo un error al buscar usuario por id [usersCrudController]')
                res.redirect('/')
                return
            }
            res.send(user)
        })
    },
    updateUser: function(req, res) {

    },
    removeUser: function(req, res) {
        User.findOneAndRemove({_id: req.params.id}, function (err) {
            if (err) {
                console.log('Error al borrar usuario')
                res.redirect('/')
            }
            res.redirect('/')
        })
    },


// Sesiones ========================================================
    getNewSession: function(req, res) {
        console.log('getNewSession')
        res.render('user', {user: req.user})
    },
    getDestroySession: function(req, res) {
        req.logout()
        res.redirect('/')
    }
}
