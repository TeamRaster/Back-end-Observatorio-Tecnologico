'use strict'

const User = require('../models/modelUsers')
const bcrypt = require('bcrypt-nodejs')

// CRUD Usuarios

function getUserOne() {

}

function getUsersAll() {

}

function getUserById() {
    User.find
}

function updateUserById() {
    // res.locals.imagen.title = req.fields.title
    // res.locals.imagen.title = req.fields.title
    // res.locals.imagen.title = req.fields.title
    // res.locals.imagen.title = req.fields.title
    // res.locals.imagen.title = req.fields.title
    // res.locals.imagen.title = req.fields.title
    // res.locals.imagen.save(function (err) {
    //     if (!err) {
    //         res.render('app/imagenes/show')
    //     } else {
    //         res.render('app/imagenes' + req.params.id + '/edit')
    //     }
    // })
}

function deleteUserById(req, res) {
    // User.findOneAndRemove({
    //     _id : req.params.id
    // }, (err) => {
    //     if (!err) {
    //         // res.redirect('/app/imagenes')
    //     } else {
    //         console.log('Error al eliminar la imagen' + err)
    //         // res.redirect('app/imagenes/' + req.params.id)
    //     }
    // })
}

function setUser(req, res) {
    let user = new User({
        username   : req.body.username,
        email      : req.body.email,
        photo      : req.body.photo,
        password   : req.body.password,
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
}

function removeUserById() {

}

module.exports = {
    setUser,
    getUserById,
    updateUserById,
    deleteUserById,
    getUserOne,
    getUsersAll,
    removeUserById
}
