// Rutas en las que puede navegar el usuario registrado o con sesion iniciada, acceso medio
'use strict'

const express = require('express')
const router = express.Router()

const usersControllers = require('../controllers/routesController')

// Vistas ==============================================================
router.get('/', usersControllers.getViewIndexPlus)

router.get('/ofertas/new', usersControllers.getViewIndexPlus)
router.get('/ofertas/:id/edit', usersControllers.getViewIndexPlus)

router.get('/demandas/new', usersControllers.getViewIndexPlus)
router.get('/demandas/:id/edit', usersControllers.getViewIndexPlus)

router.get('/users/new', usersControllers.getViewIndexPlus)
router.get('/users/:id/edit', usersControllers.getViewIndexPlus)

// CRUD Ofertas ========================================================
router.route('/ofertas/:id') // Crud a ofertas de manera individual
    .get(() => {})
    .put(() => {})
    .delete(() => {})

router.route('/ofertas') // Crud a ofertas de manera grupal
    .get(() => {})
    .post(() => {})

// CRUD Demandas =======================================================
router.route('/demandas/:id') // Crud a demandas de manera individual
    .get(() => {})
    .put(() => {})
    .delete(() => {})

router.route('/demandas') // Crud a demandas de manera grupal
    .get(() => {})
    .post(() => {})

// CRUD Usuarios =======================================================
router.route('/users/:id') // Crud a users de manera individual
    .get(() => {})
    .put(() => {})
    .delete(() => {})

router.route('/users') // Crud a users de manera grupal
    .get(() => {message: user})
    .post(() => {})



// Exportacion de las rutas
module.exports = router;
