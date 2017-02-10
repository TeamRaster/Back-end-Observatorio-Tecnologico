'use strict'

const express = require('express')
const router = express.Router()

const viewsController = require('../controllers/viewsController')
const demandCrudController = require('../controllers/demandCrudController')
const offerCrudController = require('../controllers/offerCrudController')
const usersCrudController = require('../controllers/usersCrudController')

// Vistas =========================================================
router.get('/', (req, res) => {
    res.render('index')
})

router.get('/users', usersCrudController.getAllUsers)
router.get('/ofertas', offerCrudController.getAllOffers)
router.get('/demandas', demandCrudController.getAllDemandas)
// router.get('/noticias', )

router.get('/accounts/signin', viewsController.getViewSingin)
router.get('/accounts/signup', viewsController.getViewSingup)

// Sesiones ========================================================
router.get('/accounts/login', usersCrudController.getNewSession)
router.get('/accounts/logout', usersCrudController.getDestroySession)

// CRUD Users =======================================================
router.post('/accounts/local/user', usersCrudController.setNewUser)

// Exportacion de las rutas
module.exports = router
