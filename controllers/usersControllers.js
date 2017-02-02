'use strict'

function getIndex(req, res) {
    return res.render('index')
}

function getSingIn(req, res) {
    let error_message = req.flash('error')[0]
    res.locals.error_message = error_message
    res.render('sign_in', {error: res.locals.error_message})
}

function getSingUp(req, res) {
    res.render('sign_up')
}

function getLogIn(req, res) {
    res.render('user', {user: req.user})
}

function getLogOut(req, res) {
    req.logout()
    res.redirect('/')
}

module.exports = {
    getIndex,
    getSingIn,
    getSingUp,
    getLogIn,
    getLogOut
}
