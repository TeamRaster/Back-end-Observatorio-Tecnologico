// Rutas en las que puede navegar el Administrador, acceso total
'use strict'

const express = require('express')
const router = express.Router()

const controllers = require('.././controllers')
const authMiddleware = require('../middlewares/authMiddleware')

// Esta es la nueva validacion para proteger rutas =====================================================================
// router.all('/:route', authMiddleware.isAdministrator)

// Vistas ==============================================================================================================
router.get('/', controllers.viewsController.getViewIndexA)

// Rutas Usuarios Formularios solo para administradores
router.get('/users', controllers.usersCrudController.getUsers)
router.get('/users/new', controllers.viewsController.getViewUserNew)

// Fuentes de informacion ==============================================================================================
router.get('/sources/:id/edit', controllers.viewsController.getViewSourceEdit)
router.get('/sources/new', controllers.viewsController.getViewSourceNew)
router.get('/sources/:type/all', controllers.sourceCrudController.getall)

router.route('/sources/:id')
    .get(controllers.sourceCrudController.getSource)
    .put(controllers.sourceCrudController.updateSource)
    .delete(controllers.sourceCrudController.deleteSource)

router.route('/sources')
    .post(controllers.sourceCrudController.setSource)
    .get(controllers.sourceCrudController.getSources)


// El administrador tambien puede eliminar ofertas, demandas, archivos etc pero solo de ser necesario
// Rutas Files =========================================================================================================
// router.get('/files/new', controllers.viewsController.getViewFileAdmin)
// router.get('/files/:id/edit', controllers.viewsController.getViewFileEditAdmin)
//
// // Rutas Ofertas ====================================================================================================
// router.get('/offers/new', controllers.viewsController.getViewOffer)
// router.get('/offers/:id/edit', controllers.viewsController.getViewOfferEdit)
//
// // Rutas Demandas ===================================================================================================
// router.get('/demands/new', controllers.viewsController.getViewDemand)
// router.get('/demands/:id/edit', controllers.viewsController.getViewDemandEdit)
//
// // Rutas Stats ======================================================================================================
// router.get('/stats/:id', controllers.viewsController.getViewStatsId)
//
// // Rutas Comments ===================================================================================================
// router.get('/comments/:id', controllers.viewsController.getViewCommentId)


// Exportacion de las rutas ============================================================================================
module.exports = router;
