'use strict'

const express = require('express')
const router = express.Router()

const User = require('../models/modelUsers')
const usersControllers = require('../controllers/usersControllers')

// Formularios
router.get('/accounts/signin', (req, res) => {
    usersControllers.getSingin(req, res)
})

router.get('/accounts/signup', (req, res) => {
    usersControllers.getSingup(req, res)
})

// / Inicio y cierre de sesion
router.get('/accounts/login', (req, res) => {
    usersControllers.getLogin(req, res)
})
router.get('/accounts/logout', (req, res) => {
    usersControllers.getLogout(req, res)
})

// Rutas habilitadas solo en desarrollo
router.get('/accounts/users', (req, res) => {
    User.find()
    .then(function (users) {
        res.locals.users = users
        return res.render('getUsers', {users: res.locals.users})
    })
})

module.exports = router
