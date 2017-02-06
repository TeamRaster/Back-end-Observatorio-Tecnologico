'use strict'

const express = require('express')
const router = express.Router()

const usersControllers = require('../controllers/usersControllers')

router.get('/', usersControllers.getIndexAdministrator)

// Exportacion de las rutas
module.exports = router
