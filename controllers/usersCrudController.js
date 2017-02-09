'use strict'

const modelUsers = require('../models/modelUsers')

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

    },
    getUser: function(req, res) {

    },
    updateUser: function(req, res) {

    },
    removeUser: function(req, res) {

    },


// Sesiones ========================================================
    getNewSession: function(req, res) {
        res.render('user', {user: req.user})
    },
    getDestroySession: function(req, res) {
        req.logout()
        res.redirect('/')
    }
}
