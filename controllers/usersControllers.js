'use strict'

const User = require('../models/modelUsers')

function getIndex(req, res) {
    return res.render('index')
}

function getSingin(req, res) {
    let error_message = req.flash('error')[0]
    res.locals.error_message = error_message
    res.render('signin', {error: res.locals.error_message})
}

function getSingup(req, res) {
    res.render('signup')
}

function getLogin(req, res) {
    res.render('user', {user: req.user})
}

function getLogout(req, res) {
    req.logout()
    res.redirect('/')
}

function setUser(req, res) {
    let user = new User({
        username   : req.body.username,
        email      : req.body.email,
        password   : req.body.password,
        photo      : req.body.photo,
        provider   : 'Local',
        password_confirmation : req.body.password_confirmation
    })
    user.save().then((us) => {
        console.log('[Successful]: Usuario guardado')
        res.redirect('/')
    }, (error) => {
        console.log(`[Error Save]: Usuario no almacenado ${error}`)
        res.render('signup')
    })
}

module.exports = {
    getIndex,
    getSingin,
    getSingup,
    getLogin,
    getLogout,
    setUser
}
