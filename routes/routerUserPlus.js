// Rutas en las que puede navegar el usuario registrado o con sesion iniciada, acceso medio
'use strict'

const express = require('express')
const router = express.Router()
module.exports = (app) => {

const viewsController = app.controllers.viewsController
const newsCrudController = app.controllers.newsCrudController
const groupsCrudController = app.controllers.groupsCrudController
const demandCrudController = app.controllers.demandCrudController
const offerCrudController = app.controllers.offerCrudController
const usersCrudController = app.controllers.usersCrudController
const conversationController = app.controllers.conversationController
const filesCrudController = app.controllers.filesCrudController

const authMiddleware = require('../middlewares/authMiddleware')

// Esta es la nueva validacion para proteger rutas =====================================================================
router.all('/', authMiddleware.isLogged)

// Rutas para realizar pruebas =========================================================================================
router.get('/room', viewsController.getViewRoomIndex)  // Index
//router.get('/room/new', conversationController.getViewGroup)  // Crear un nuevo grupo
//router.post('/room/new', conversationController.setGroup)  // Crear un nuevo grupo
//router.get('/room/:id', conversationController.setMembers)  // Unirse al grupo
//router.get('/room/:id/chat', conversationController.getChat)  //


// Rutas NOTICIAS Formularios
router.get('/news/new', viewsController.getViewDemandNew)
router.get('/noticias/:id/edit', viewsController.getViewNewEdit)

// Rutas GRUPOS Formularios
router.get('/groups/new', viewsController.getViewGroupNew)
router.get('/groups/:id/edit', viewsController.getViewGroupEdit)

// Rutas FILES Formularios
router.get('/files/new', viewsController.getViewFileNew)
router.get('/files/:id/edit', viewsController.getViewFileEdit)

// Sala de chats
router.get('/room', viewsController.getViewRoom)

// Vistas ==============================================================================================================
router.get('/', viewsController.getViewIndexP)


// CRUD Ofertas ========================================================================================================
router.get('/offers/new', viewsController.getViewOfferNew)
router.get('/offers/:id/edit', viewsController.getViewOfferEdit)

router.route('/offers/:id') // Crud a ofertas de manera individual
    //.get(offerCrudController.getOffer)
    //.put(offerCrudController.updateOffer)
    //.delete(offerCrudController.deleteOffer)

router.route('/offers') // Crud a ofertas de manera grupal
    //.get(offerCrudController.getOffers)
    //.post(offerCrudController.setOffer)


// CRUD Noticias =======================================================================================================
router.route('/noticias/:id') // Crud a noticias de manera individual
    // .get(newsCrudController.getNoticiaById)
    // .put(newsCrudController.updateNoticiaById)
    // .delete(newsCrudController.removeNoticiaById)

router.route('/noti') // Crud a noticias de manera grupal
    // .get(newsCrudController.getAllNoticias)
    // .post(newsCrudController.setNewNoticia)


// CRUD Demandas =======================================================================================================
router.get('/demands/new', viewsController.getViewDemandNew)
router.get('/demands/:id/edit', viewsController.getViewDemandEdit)

router.route('/demands/:id') // Crud a demandas de manera individual
    // .get(demandCrudController.getDemand)
    // .put(demandCrudController.updateDemand)
    // .delete(demandCrudController.deleteDemand)

router.route('/demands') // Crud a demandas de manera grupal
    // .get(demandCrudController.getDemands)
    // .post(demandCrudController.setDemand)




// CRUD FILES  =======================================================
router.route('/files/:id') // Crud a archivos de manera individual
    .get(filesCrudController.getFile)
    .put(filesCrudController.updateFile)
    .delete(filesCrudController.deleteFile)

router.route('/files') // Crud a archivos de manera grupal
    .get(filesCrudController.getFiles)
    .post(filesCrudController.setFolder)



// CRUD Usuarios =======================================================================================================
router.get('/users/:id/edit', viewsController.getViewUserEdit)

router.route('/users/:id') // Crud a users de manera individual
    // .get(usersCrudController.getUser)
    // .put(usersCrudController.updateUser)
    // .delete(usersCrudController.deleteUser)

router.route('/users') // Crud a users de manera grupal
    // .get(usersCrudController.getUsers)
    // .post(usersCrudController.setUser)


// Exportacion de las rutas ============================================================================================
//module.exports = router;
}
