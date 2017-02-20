// Rutas en las que puede navegar el usuario registrado o con sesion iniciada, acceso medio
'use strict'

const express = require('express')
const router = express.Router()

const controllers = require('.././controllers')
const authMiddleware = require('../middlewares/authMiddleware')

// Esta es la nueva validacion para proteger rutas =====================================================================
router.all('/', authMiddleware.isLogged)

// Rutas para realizar pruebas =========================================================================================
router.get('/room', controllers.viewsController.getViewRoomIndex)  // Index
router.get('/room/new', controllers.conversationController.getViewGroup)  // Crear un nuevo grupo
router.post('/room/new', controllers.conversationController.setGroup)  // Crear un nuevo grupo
router.get('/room/:id', controllers.conversationController.setMembers)  // Unirse al grupo
router.get('/room/:id/chat', controllers.conversationController.getChat)  //


// Vistas ==============================================================================================================
router.get('/', controllers.viewsController.getViewIndexP)


// CRUD Ofertas ========================================================================================================
router.get('/offers/new', controllers.viewsController.getViewOfferNew)
router.get('/offers/:id/edit', controllers.viewsController.getViewOfferEdit)

router.route('/offers/:id') // Crud a ofertas de manera individual
    .get(controllers.offerCrudController.getOffer)
    .put(controllers.offerCrudController.updateOffer)
    .delete(controllers.offerCrudController.deleteOffer)

router.route('/offers') // Crud a ofertas de manera grupal
    .get(controllers.offerCrudController.getOffers)
    .post(controllers.offerCrudController.setOffer)


// CRUD Noticias =======================================================================================================
router.route('/noticias/:id') // Crud a noticias de manera individual
    .get(controllers.newsCrudController.getNoticiaById)
    .put(controllers.newsCrudController.updateNoticiaById)
    .delete(controllers.newsCrudController.removeNoticiaById)

router.route('/noti') // Crud a noticias de manera grupal
    .get(controllers.newsCrudController.getAllNoticias)
     .post(controllers.newsCrudController.setNewNoticia)


// CRUD Demandas =======================================================================================================
router.get('/demands/new', controllers.viewsController.getViewDemandNew)
router.get('/demands/:id/edit', controllers.viewsController.getViewDemandEdit)

router.route('/demands/:id') // Crud a demandas de manera individual
    .get(controllers.demandCrudController.getDemand)
    .put(controllers.demandCrudController.updateDemand)
    .delete(controllers.demandCrudController.deleteDemand)

router.route('/demands') // Crud a demandas de manera grupal
    .get(controllers.demandCrudController.getDemands)
    .post(controllers.demandCrudController.setDemand)


// CRUD Usuarios =======================================================================================================
router.get('/users/:id/edit', controllers.viewsController.getViewUserEdit)

router.route('/users/:id') // Crud a users de manera individual
    .get(controllers.usersCrudController.getUser)
    .put(controllers.usersCrudController.updateUser)
    .delete(controllers.usersCrudController.deleteUser)

router.route('/users') // Crud a users de manera grupal
    .get(controllers.usersCrudController.getUsers)
    .post(controllers.usersCrudController.setUser)


// Exportacion de las rutas ============================================================================================
module.exports = router;
