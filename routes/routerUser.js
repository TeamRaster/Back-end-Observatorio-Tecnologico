'use strict'

const express = require('express')
const router = express.Router()

const usersControllers = require('../controllers/usersControllers')

// Pagina de inicio
router.get('/', usersControllers.getIndex)

// Exportacion de las rutas
module.exports = router
