'use strict'
const express = require('express')
const router = express.Router()

module.exports = (app) => {
    const controllerFiles = app.controllers.controllerFiles  // Llamada del controlador para los Grupos
    const viewsController= app.controllers.viewsController  // Llamada del controlador para los Grupos
    const auth = require('../middlewares/auth')  // Llamada del middleware para la validacion de las rutas


    /************** VISTAS *****************///

    router.route('/files') // Crud a archivos de manera grupal
        .get(controllerFiles.getFiles)
        .post(controllerFiles.setFolder)


    // Rutas FILES Formularios
    app.get('/files/new', viewsController.getViewFileNew)
    app.get('/files/:id/edit', viewsController.getViewFileEdit)

    /*****************************************/


    // CRUD FILES  =======================================================
    router.route('/files/:id') // Crud a archivos de manera individual
        .get(controllerFiles.getFile)
        .put(controllerFiles.updateFile)
        .delete(controllerFiles.deleteFile)



    return this
}
