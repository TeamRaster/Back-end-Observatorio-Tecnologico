// Rutas en las que puede navegar el usuario sin registro, acceso bajo
'use strict'
// todo importar controlador
const express = require('express')
const router = express.Router()
const User = require('../models/modelUsers')

// Rutas de acceso
router.get('/', (req, res) => {
  res.render('index')
})

// todo separar el contenido de las rutas al controlador apropiado
router.get('/sign_in', (req, res) => {
  let error_message = req.flash('error')[0]
  res.locals.error_message = error_message
  res.render('sign_in', {error: res.locals.error_message})
})

router.get('/sign_up', (req, res) => {
  res.render('sign_up')
})

router.get('/logout', (req, res) => {
  res.send('Saliendo de la sesion')
})

router.get('/admin/users', (req, res) => {
  User.find()
    .then(function (users) {
      res.locals.users = users
      return res.render('getUsers', {users: res.locals.users});
    })
})

// Exportacion de las rutas
module.exports = router;
