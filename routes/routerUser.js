'use strict'

const express = require('express')
const router = express.Router()

const viewsController = require('../controllers/viewsController')
const demandCrudController = require('../controllers/demandCrudController')
const offerCrudController = require('../controllers/offerCrudController')
const usersCrudController = require('../controllers/usersCrudController')

// Vistas =========================================================
router.get('/', (req, res) => {
    // console.log(req.user)
    // console.log('================================================')
    if (req.user) req.session.user = req.user
    return res.render('index')
})

// Resumen de lo que se muestra al usuario normal
router.get('/offers', offerCrudController.getOffers)
router.get('/demands', demandCrudController.getDemands)

// Formularios Registrar e Iniciar sesion
router.get('/accounts/signin', (req, res) => {
    let error_message = req.flash('error')[0]
    res.locals.error_message = error_message
    return res.render('signin', {error: error_message})
})
router.get('/accounts/signup', (req, res) => {
    return res.render('signup')
})

// Sesiones ========================================================
router.get('/accounts/login', usersCrudController.getNewSession)
router.get('/accounts/logout', usersCrudController.getDestroySession)

// CRUD Users =======================================================
router.post('/accounts/local/user', usersCrudController.setUser)

// Exportacion de las rutas
module.exports = router
