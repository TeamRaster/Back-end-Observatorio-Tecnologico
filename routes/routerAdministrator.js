// Rutas en las que puede navegar el Administrador, acceso total
'use strict'

const express = require('express')
const router = express.Router()

const viewsController = require('../controllers/viewsController')
const sliderCrudController = require('../controllers/sliderCrudController')

// Vistas ==============================================================
router.get('/', viewsController.getViewIndexAdministrator)


// Eventos(Slide) ========================================================
router.get('/events/:id/edit', viewsController.getViewSliderEdit)
router.get('/events/new', viewsController.getViewSliderNew)

router.route('/events/:id')
    .get(sliderCrudController.getImage)
    .put(sliderCrudController.updateImage)
    .delete(sliderCrudController.deleteImage)

router.route('/events')
    .get(sliderCrudController.getImages)
    .post(sliderCrudController.setImage)


// Fuentes de informacion ========================================================
router.get('/sources', viewsController.getViewCommentId)


// Observatorio ========================================================
router.get('/observatories', viewsController.getViewCommentId)


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
