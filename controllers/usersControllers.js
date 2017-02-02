'use strict'

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

module.exports = {
    getIndex,
    getSingin,
    getSingup,
    getLogin,
    getLogout
}
