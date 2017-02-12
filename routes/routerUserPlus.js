// Rutas en las que puede navegar el usuario registrado o con sesion iniciada, acceso medio
'use strict'

const express = require('express')
const router = express.Router()

const viewsController = require('../controllers/viewsController')
const newsCrudController = require('../controllers/newsCrudController')
const demandCrudController = require('../controllers/demandCrudController')
const offerCrudController = require('../controllers/offerCrudController')
const usersCrudController = require('../controllers/usersCrudController')

// Vistas =======================================================
router.get('/', viewsController.getViewIndexPlus)

// Rutas Ofertas Formularios
router.get('/offers/new', viewsController.getViewOffer)
router.get('/offers/:id/edit', viewsController.getViewOfferEdit)

// Rutas Demandas Formularios
router.get('/demands/new', viewsController.getViewDemand)
router.get('/demands/:id/edit', viewsController.getViewDemandEdit)

// Rutas Directory Formularios
router.get('/directories/new', viewsController.getViewDemand)
router.get('/directories/:id/edit', viewsController.getViewDemandEdit)

// Rutas Usuarios Formularios
router.get('/users/new', viewsController.getViewSingup)
router.get('/users/:id/edit', viewsController.getViewIndexPlus)


// CRUD Ofertas =======================================================
router.route('/offers/:id') // Crud a ofertas de manera individual
    .get(offerCrudController.getOffer)
    .put(offerCrudController.updateOfferById)
    .delete(offerCrudController.deleteOfferById)

router.route('/offers') // Crud a ofertas de manera grupal
    .get(offerCrudController.getAllOffers)
    .post(offerCrudController.setNewOffer)


// CRUD Noticias =======================================================
router.route('/noticias/:id') // Crud a noticias de manera individual
    .get(newsCrudController.getNoticiaById)
    .put(newsCrudController.updateNoticiaById)
    .delete(newsCrudController.removeNoticiaById)

router.route('/noti') // Crud a noticias de manera grupal
    .get(newsCrudController.viewSetNewNoticia)
     .post(newsCrudController.setNewNoticia)


// CRUD Demandas =======================================================
router.route('/demands/:id') // Crud a demandas de manera individual
    .get(demandCrudController.getDemand)
    .put(demandCrudController.updateDemandById)
    .delete(demandCrudController.deleteDemandById)

router.route('/demands') // Crud a demandas de manera grupal
    .get(demandCrudController.getAllDemands)
    .post(demandCrudController.setNewDemanda)


// CRUD Usuarios =======================================================
router.route('/users/:id') // Crud a users de manera individual
    .get(usersCrudController.getUser)
    // .put(usersCrudController.updateUser)
    .delete(usersCrudController.removeUser)

router.route('/users') // Crud a users de manera grupal
    .get(usersCrudController.getAllUsers)
    .post(usersCrudController.setNewUser)


// Exportacion de las rutas =======================================================
module.exports = router;
