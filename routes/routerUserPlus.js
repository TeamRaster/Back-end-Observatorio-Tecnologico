// Rutas en las que puede navegar el usuario registrado o con sesion iniciada, acceso medio
'use strict'
const express = require('express')
const router = express.Router()

// Rutas de acceso usuarios con sesion iniciada
router.get('/', (req, res) => {
  res.send('Pagina de usuario con sesion iniciada')
})




// Exportacion de las rutas
module.exports = router;
