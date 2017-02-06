'use strict'

const express = require('express')
const router = express.Router()

const User = require('../models/modelUsers')
const usersControllers = require('../controllers/usersControllers')

// Formularios
router.get('/accounts/signin', usersControllers.getSingin)
router.get('/accounts/signup', usersControllers.getSingup)
// Iniciar sesion y salir
router.get('/accounts/login', usersControllers.getLogin)
router.get('/accounts/logout', usersControllers.returnLogout)

router.post('/accounts/local/user', usersControllers.setUser)




// Rutas habilitadas solo en desarrollo
router.get('/accounts/users', (req, res) => {
    User.find()
    .then(function (users) {
        res.locals.users = users
        return res.render('getUsers', {users: res.locals.users})
    })
})

module.exports = router
