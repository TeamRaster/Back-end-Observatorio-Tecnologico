// Rutas en las que puede navegar el usuario registrado o con sesion iniciada, acceso medio
'use strict'

const express = require('express')
const router = express.Router()

const controllers = require('.././controllers')
const authMiddleware = require('../middlewares/authMiddleware')

// Esta es la nueva validacion para proteger rutas =====================================================================
// router.all('/?', authMiddleware.isLogged)

// Rutas para realizar pruebas =========================================================================================
router.get('/room', [authMiddleware.isLogged, controllers.viewsController.getViewRoomIndex])  // Index
router.get('/room/new', [authMiddleware.isLogged, controllers.conversationController.getViewGroup])  // Crear un nuevo grupo
router.post('/room/new', [authMiddleware.isLogged, controllers.conversationController.setGroup])  // Crear un nuevo grupo
router.get('/room/:id', [authMiddleware.isLogged, controllers.conversationController.setMembers])  // Unirse al grupo
router.get('/room/:id/chat', [authMiddleware.isLogged, controllers.conversationController.getChat])

router.post('/room/:id/chat', [authMiddleware.isLogged, controllers.conversationController.setMessage])  //

// Rutas NOTICIAS Formularios
router.get('/news/new', controllers.viewsController.getViewDemandNew)
router.get('/noticias/:id/edit', controllers.viewsController.getViewNewEdit)

// Rutas GRUPOS Formularios
router.get('/groups/new', controllers.viewsController.getViewGroupNew)
router.get('/groups/:id/edit', controllers.viewsController.getViewNewEdit)

// Sala de chats
router.get('/room', controllers.viewsController.getViewRoom)

// Vistas ==============================================================================================================
router.get('/', [authMiddleware.isLogged, controllers.viewsController.getViewIndexP])


// Rutas Especiales para el chat  ======================================================================================
// router.get('/message/new', [authMiddleware.isLogged, controllers.viewsController.getViewOfferNew])
// router.get('/message/:id/edit', [authMiddleware.isLogged, controllers.viewsController.getViewOfferEdit])

// router.route('/message/:id') // Crud a ofertas de manera individual
//     .get([authMiddleware.isLogged, controllers.conversationController.getOffer])
//     .put([authMiddleware.isLogged, controllers.conversationController.updateOffer])
//     .delete([authMiddleware.isLogged, controllers.conversationController.deleteOffer])

router.route('/message') // Crud a ofertas de manera grupal
    // .get([authMiddleware.isLogged, controllers.conversationController.getOffers])
    .post([authMiddleware.isLogged, controllers.conversationController.setMessage])

// CRUD Ofertas ========================================================================================================
router.get('/offers/new', [authMiddleware.isLogged, controllers.viewsController.getViewOfferNew])
router.get('/offers/:id/edit', [authMiddleware.isLogged, controllers.viewsController.getViewOfferEdit])

router.route('/offers/:id') // Crud a ofertas de manera individual
    .get([authMiddleware.isLogged, controllers.offerCrudController.getOffer])
    .put([authMiddleware.isLogged, controllers.offerCrudController.updateOffer])
    .delete([authMiddleware.isLogged, controllers.offerCrudController.deleteOffer])

router.route('/offers') // Crud a ofertas de manera grupal
    .get([authMiddleware.isLogged, controllers.offerCrudController.getOffers])
    .post([authMiddleware.isLogged, controllers.offerCrudController.setOffer])


// CRUD Noticias =======================================================================================================
router.route('/noticias/:id') // Crud a noticias de manera individual
    .get([authMiddleware.isLogged, controllers.newsCrudController.getNoticiaById])
    .put([authMiddleware.isLogged, controllers.newsCrudController.updateNoticiaById])
    .delete([authMiddleware.isLogged, controllers.newsCrudController.removeNoticiaById])

router.route('/noti') // Crud a noticias de manera grupal
    .get([authMiddleware.isLogged, controllers.newsCrudController.getAllNoticias])
     .post([authMiddleware.isLogged, controllers.newsCrudController.setNewNoticia])


// CRUD Demandas =======================================================================================================
router.get('/demands/new', [authMiddleware.isLogged, controllers.viewsController.getViewDemandNew])
router.get('/demands/:id/edit', [authMiddleware.isLogged, controllers.viewsController.getViewDemandEdit])

router.route('/demands/:id') // Crud a demandas de manera individual
    .get([authMiddleware.isLogged, controllers.demandCrudController.getDemand])
    .put([authMiddleware.isLogged, controllers.demandCrudController.updateDemand])
    .delete([authMiddleware.isLogged, controllers.demandCrudController.deleteDemand])

router.route('/demands') // Crud a demandas de manera grupal
    .get([authMiddleware.isLogged, controllers.demandCrudController.getDemands])
    .post([authMiddleware.isLogged, controllers.demandCrudController.setDemand])


// CRUD Grupos =======================================================
/*router.route('/groups/:id') // Crud a demandas de manera individual
    .get(demandCrudController.getDemand)
    .put(demandCrudController.updateDemand)
    .delete(demandCrudController.deleteDemand)
*/
router.route('/groups') // Crud a demandas de manera grupal
    .get(controllers.groupsCrudController.getGroups)
    .post(controllers.groupsCrudController.setGroup)

// CRUD Usuarios =======================================================================================================
router.get('/users/:id/edit', [authMiddleware.isLogged, controllers.viewsController.getViewUserEdit])

router.route('/users/:id') // Crud a users de manera individual
    .get([authMiddleware.isLogged, controllers.usersCrudController.getUser])
    .put([authMiddleware.isLogged, controllers.usersCrudController.updateUser])
    .delete([authMiddleware.isLogged, controllers.usersCrudController.deleteUser])

router.route('/users') // Crud a users de manera grupal
    .get([authMiddleware.isLogged, controllers.usersCrudController.getUsers])
    .post([authMiddleware.isLogged, controllers.usersCrudController.setUser])


// Exportacion de las rutas ============================================================================================
module.exports = router;
