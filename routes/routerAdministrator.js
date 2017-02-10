// Rutas en las que puede navegar el Administrador, acceso total
'use strict'

const express = require('express')
const router = express.Router()

const viewsController = require('../controllers/viewsController')
const newsCrudController = require('../controllers/newsCrudController')
const demandCrudController = require('../controllers/demandCrudController')
const offerCrudController = require('../controllers/offerCrudController')
const usersCrudController = require('../controllers/usersCrudController')

// Vistas ==============================================================
router.get('/', viewsController.getViewIndexAdministrator)

// Rutas Slider ========================================================
router.get('/slider/new', viewsController.getViewSlider)
router.get('/slider/:id/edit', viewsController.getViewSliderEdit)

// El administrador tambien puede eliminar ofertas, demandas, archivos etc pero solo de ser necesario
// Rutas Files ========================================================
router.get('/files/new', viewsController.getViewFileAdmin)
router.get('/files/:id/edit', viewsController.getViewFileEditAdmin)

// Rutas Ofertas ========================================================
router.get('/offers/new', viewsController.getViewOffer)
router.get('/offers/:id/edit', viewsController.getViewOfferEdit)

// Rutas Demandas ========================================================
router.get('/demands/new', viewsController.getViewDemand)
router.get('/demands/:id/edit', viewsController.getViewDemandEdit)

// Rutas Stats ========================================================
router.get('/stats/:id', viewsController.getViewStatsId)

// Rutas Comments ========================================================
router.get('/comments/:id', viewsController.getViewCommentId)

// Exportacion de las rutas
module.exports = router;
