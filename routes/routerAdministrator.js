// Rutas en las que puede navegar el Administrador, acceso total
'use strict'

const express = require('express')
const router = express.Router()

const viewsController = require('../controllers/viewsController')
const sourceCrudController = require('../controllers/sourceCrudController')
const usersCrudController = require('../controllers/usersCrudController')

// Vistas ==============================================================
router.get('/', viewsController.getViewIndexA)

// Rutas Usuarios Formularios solo para administradores
router.get('/users', usersCrudController.getUsers)
router.get('/users/new', viewsController.getViewUserNew)

// Fuentes de informacion ========================================================
router.get('/sources/:id/edit', viewsController.getViewSourceEdit)
router.get('/sources/new', viewsController.getViewSourceNew)
router.get('/sources/:type/all', sourceCrudController.getall)

router.route('/sources/:id')
    .get(sourceCrudController.getSource)
    .put(sourceCrudController.updateSource)
    .delete(sourceCrudController.deleteSource)

router.route('/sources')
    .post(sourceCrudController.setSource)
    .get(sourceCrudController.getSources)


// El administrador tambien puede eliminar ofertas, demandas, archivos etc pero solo de ser necesario
// Rutas Files ========================================================
// router.get('/files/new', viewsController.getViewFileAdmin)
// router.get('/files/:id/edit', viewsController.getViewFileEditAdmin)
//
// // Rutas Ofertas ========================================================
// router.get('/offers/new', viewsController.getViewOffer)
// router.get('/offers/:id/edit', viewsController.getViewOfferEdit)
//
// // Rutas Demandas ========================================================
// router.get('/demands/new', viewsController.getViewDemand)
// router.get('/demands/:id/edit', viewsController.getViewDemandEdit)
//
// // Rutas Stats ========================================================
// router.get('/stats/:id', viewsController.getViewStatsId)
//
// // Rutas Comments ========================================================
// router.get('/comments/:id', viewsController.getViewCommentId)




// Exportacion de las rutas
module.exports = router;
