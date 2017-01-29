// Rutas en las que puede navegar el usuario sin registro, acceso bajo
'use strict'

const express = require('express')
const router = express.Router()

// Rutas de acceso
router.get('/', (req, res) => {
  res.render('index')
})

router.get('/sign_in', (req, res) => {
  res.render('sign_in')
})

router.get('/sign_up', (req, res) => {
  res.render('sign_up')
})



// Exportacion de las rutas
module.exports = router;
