// Rutas en las que puede navegar el Administrador, acceso total
'use strict'
const express = require('express')
const router = express.Router()

const usersControllers = require('../controllers/usersControllers')

router.get('/', (req, res) => {
  res.send('Pagina del administrador')
})

// Exportacion de las rutas
module.exports = router;
