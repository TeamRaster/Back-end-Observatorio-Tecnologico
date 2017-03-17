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


// Rutas NOTICIAS Formularios
router.get('/news/new', controllers.viewsController.getViewDemandNew)
router.get('/noticias/:id/edit', controllers.viewsController.getViewNewEdit)

// Rutas GRUPOS Formularios
router.get('/groups/new', controllers.viewsController.getViewGroupNew)
router.get('/groups/:id/edit', controllers.viewsController.getViewGroupEdit)

// Rutas FILES Formularios
router.get('/files/new', controllers.viewsController.getViewFileNew)
router.get('/files/:id/edit', controllers.viewsController.getViewFileEdit)

// Sala de chats
router.get('/room', controllers.viewsController.getViewRoom)

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



// CRUD Grupos =======================================================
router.route('/groups/:id') // Crud a grupos de manera individual
    .get(controllers.groupsCrudController.getGroup)
    .put(controllers.groupsCrudController.updateGroup)
    .delete(controllers.groupsCrudController.deleteGroup)

router.route('/groups') // Crud a grupos de manera global :v
    .get(controllers.groupsCrudController.getGroups)
    .post(controllers.groupsCrudController.setGroup)

    // miembros y solicitudes de Grupos
router.route('/groups/member/:groupId/:userId') // Crud a MIEMBROS de grupos  * SOLO ADMINS
    //.get(controllers.groupsCrudController.getGroup)
    .put(controllers.groupsCrudController.addMemberToGroup)
    .delete(controllers.groupsCrudController.isAdmin, controllers.groupsCrudController.deleteMemberFromGroup)

router.route('/groups/admin/:groupId/:userId') // Crud a *SOLO ADMINS de grupos
    //.get(controllers.groupsCrudController.getGroup)
    .put(controllers.groupsCrudController.addAdminToGroup)
    .delete(controllers.groupsCrudController.deleteAdminFromGroup)

router.route('/groups/user/myGroups') // obtener  grupos del ususario // ISSUE FIXME /groups/myGroups/ ->estaba tomando myGroups como :id XD
    .get(controllers.groupsCrudController.getMyGroups)

router.route('/groups/memberRequest/:groupId')
    .post(controllers.groupsCrudController.sendRequest)


// CRUD NOTIFICACIONES POR GRUPO  =======================================================
router.route('/groups/notif') // Crud a grupos de manera individual
    .post(controllers.groupsCrudController.notiToGroup)
    /*.get(controllers.groupsCrudController.getGroup)
    .put(controllers.groupsCrudController.updateGroup)
    .delete(controllers.groupsCrudController.deleteGroup)*/


// CRUD FILES  =======================================================
router.route('/files/:id') // Crud a archivos de manera individual
    .get(controllers.filesCrudController.getFile)
    .put(controllers.filesCrudController.updateFile)
    .delete(controllers.filesCrudController.deleteFile)

router.route('/files') // Crud a archivos de manera grupal
    .get(controllers.filesCrudController.getFiles)
    .post(controllers.filesCrudController.setFolder)



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
//module.exports = router;
