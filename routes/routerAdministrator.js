// Rutas en las que puede navegar el Administrador, acceso total
'use strict'
const express = require('express')
const router = express.Router()

// Rutas de acceso usuarios con sesion iniciada
router.get('/', (req, res) => {
  res.send('Pagina del administrador')
})




// Exportacion de las rutas
module.exports = router;
