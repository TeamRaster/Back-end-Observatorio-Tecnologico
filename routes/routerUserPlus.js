// Rutas en las que puede navegar el usuario registrado o con sesion iniciada, acceso medio
'use strict'

const express = require('express')
const router = express.Router()

const viewsController = require('../controllers/viewsController')
const newsCrudController = require('../controllers/newsCrudController')
const demandCrudController = require('../controllers/demandCrudController')
const offerCrudController = require('../controllers/offerCrudController')
const usersCrudController = require('../controllers/usersCrudController')

// Vistas ==============================================================
// router.get('/', usersControllers.getViewIndexPlus)

// Rutas Ofertas ========================================================
router.get('/ofertas/new', viewsController.getViewOffer)
router.get('/ofertas/:id/edit', viewsController.getViewOfferEdit)

// Rutas Demandas ========================================================
router.get('/demandas/new', viewsController.getViewDemand)
router.get('/demandas/:id/edit', viewsController.getViewDemandEdit)
//
// Rutas Usuarios ========================================================
// router.get('/users/new', usersControllers.getViewIndexPlus)
// router.get('/users/:id/edit', usersControllers.getViewIndexPlus)


// CRUD Ofertas ========================================================
router.route('/ofertas/:id') // Crud a ofertas de manera individual
    .get(offerCrudController.getOffer)
    .put(offerCrudController.updateOfferById)
    .delete(offerCrudController.deleteOfferById)

router.route('/ofertas') // Crud a ofertas de manera grupal
    .get(offerCrudController.getAllOffers)
    .post(offerCrudController.setNewOffer)


// CRUD Noticias =======================================================
router.route('/noticias/:id') // Crud a noticias de manera individual
    .get((req, res) => {})
    .put((req, res) => {})
    .delete((req, res) => {})

router.route('/noti') // Crud a noticias de manera grupal
    .get(function(req, res) {
         //return res.render('admin', {});
         return res.status(200).send({message: "pagina del admin    "});

    })
    .post(newsCrudController.setNewNoticia)

// CRUD Demandas =======================================================
router.route('/demandas/:id') // Crud a demandas de manera individual
    .get((req, res) => {})
    .put((req, res) => {})
    .delete((req, res) => {})

router.route('/demandas') // Crud a demandas de manera grupal
    .get((req, res) => {})
    .post((req, res) => {})


// CRUD Usuarios =======================================================
router.route('/users/:id') // Crud a users de manera individual
    .get((req, res) => {})
    .put((req, res) => {})
    .delete((req, res) => {})

router.route('/users') // Crud a users de manera grupal
    .get((req, res) => {})
    .post((req, res) => {})

module.exports = router;
