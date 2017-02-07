'use strict'

const User = require('../models/modelUsers')
const querysUsers = require('../controllers/querysUsersController')


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

function returnLogout(req, res) {
    req.logout()
    res.redirect('/')
}

function setUser(req, res) {
    querysUsers.setUser(req, res)
}

// Usuarios plus
function getIndexAdministrator(req, res) {
    return res.send('Pagina del administrador')
}

// Administradores
function getIndexPlus(req, res) {
    return res.send('Pagina del usuario con inicio de sesion')
}
module.exports = {
    getIndex,
    getSingin,
    getSingup,
    getLogin,
    returnLogout,
    setUser,
    getIndexPlus,
    getIndexAdministrator
}
