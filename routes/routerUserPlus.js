// Rutas en las que puede navegar el usuario registrado o con sesion iniciada, acceso medio
'use strict'

const express = require('express')
const router = express.Router()

const noticiasCrudController = require('../controllers/newsCrudController')
const viewsController = require('../controllers/viewsController')
const newsCrudController = require('../controllers/newsCrudController')
const demandCrudController = require('../controllers/demandCrudController')
const offerCrudController = require('../controllers/offerCrudController')
const usersCrudController = require('../controllers/usersCrudController')

// Vistas ==============================================================
router.get('/', usersCrudController.getViewIndexPlus)
router.get('/ofertas/new', usersCrudController.getViewIndexPlus)
router.get('/ofertas/:id/edit', usersCrudController.getViewIndexPlus)

router.get('/demandas/new', usersCrudController.getViewIndexPlus)
router.get('/demandas/:id/edit', usersCrudController.getViewIndexPlus)

router.get('/users/new', usersCrudController.getViewIndexPlus)
router.get('/users/:id/edit', usersCrudController.getViewIndexPlus)



router.get('/users/all', function(req, res) {
     //return res.render('admin', {});
     return res.status(200).send({message: "pagina del admin    "});

})


// CRUD Ofertas ========================================================
router.route('/ofertas/:id') // Crud a ofertas de manera individual
    .get((req, res) => {
        off
    })
    .put((req, res) => {})
    .delete((req, res) => {})

router.route('/ofertas') // Crud a ofertas de manera grupal
    .get((req, res) => {})
    .post((req, res) => {})


// CRUD Noticias =======================================================
router.route('/noticias/:id') // Crud a noticias de manera individual
    .get(() => {})
    .put(() => {})
    .delete(() => {})

router.route('/noti') // Crud a noticias de manera grupal
    .get(function(req, res) {
         //return res.render('admin', {});
         return res.status(200).send({message: "pagina del admin    "});

    })
    .post(noticiasCrudController.setNewNoticia)

// CRUD Demandas =======================================================
router.route('/demandas/:id') // Crud a demandas de manera individual
    .get(() => {})
    .put(() => {})
    .delete(() => {})

router.route('/demandas') // Crud a demandas de manera grupal
    .get(() => {})
    .post(() => {})

// CRUD Usuarios =======================================================
router.route('/users/:id') // Crud a users de manera individual
    .get(() => {})
    .put(() => {})
    .delete(() => {})

router.route('/users') // Crud a users de manera grupal
    .get(() => {})
    .post(() => {})

//router.route('/users/all', consulta.getUsersAll)

// Exportacion de las rutas

module.exports = router;
