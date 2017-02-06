// Rutas en las que puede navegar el usuario registrado o con sesion iniciada, acceso medio
'use strict'
const express = require('express')
const router = express.Router()

const usersControllers = require('../controllers/usersControllers')

router.get('/', usersControllers.getIndexPlus)




// Exportacion de las rutas
module.exports = router;
