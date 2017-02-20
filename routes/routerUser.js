'use strict'

const express = require('express')
const router = express.Router()

const viewsController = require('../controllers/viewsController')
const demandCrudController = require('../controllers/demandCrudController')
const offerCrudController = require('../controllers/offerCrudController')
const usersCrudController = require('../controllers/usersCrudController')

// Vistas =========================================================
router.get('/', (req, res) => {
    if (req.user) req.session.user = req.user
    res.render('index')
})

// Resumen de lo que se muestra al usuario normal

router.get('/offers', offerCrudController.getOffers)
router.get('/demands', demandCrudController.getDemands)

router.get('/accounts/signin', viewsController.getViewSingin)
router.get('/accounts/signup', viewsController.getViewSingup)

// Sesiones ========================================================
router.get('/accounts/login', usersCrudController.getNewSession)
router.get('/accounts/logout', usersCrudController.getDestroySession)

// CRUD Users =======================================================
router.post('/accounts/local/user', usersCrudController.setUser)

// Exportacion de las rutas
module.exports = router
