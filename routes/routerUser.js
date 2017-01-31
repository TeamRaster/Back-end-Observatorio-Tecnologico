// Rutas en las que puede navegar el usuario sin registro, acceso bajo
'use strict'
// todo importar controlador
const express = require('express')
const router = express.Router()

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



// Exportacion de las rutas
module.exports = router;
