'use strict'

const express = require('express')
const router = express.Router()

const routesController = require('../controllers/routesController')
const usuariosCrudController = require('../controllers/usuariosCrudController')

// Vistas =========================================================
router.get('/', routesController.getViewIndex)

// router.get('/ofertas', routesController.getIndex)
// router.get('/demandas', routesController.getIndex)
// router.get('/noticias', routesController.getIndex)

router.get('/accounts/signin', routesController.getViewSingin)
router.get('/accounts/signup', routesController.getViewSingup)

// Sesiones ========================================================
router.get('/accounts/login', routesController.getNewSession)
router.get('/accounts/logout', routesController.getDestroySession)

// CRUD Users =======================================================
router.post('/accounts/local/user', usuariosCrudController.setNewUser)


// Exportacion de las rutas
module.exports = router
