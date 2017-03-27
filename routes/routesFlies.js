'use strict'
const express = require('express')

const redis = require('redis')
let client = redis.createClient()

module.exports = (app) => {
    const controllerFiles = app.controllers.controllerFiles  // Llamada del controlador para los Grupos
    const viewsController= app.controllers.viewsController  // Llamada del controlador para los Grupos
    const auth = require('../middlewares/auth')  // Llamada del middleware para la validacion de las rutas


    app.get('/files/redis/get', (req, res) => {

        client.smembers('tags', function(err, reply) {
            console.log(reply);
            res.status(200).send({message: 'done set', reply})
        });

    })  // TESTS REDIS


    /************** VISTAS *****************///

    app.route('/files') // Crud a archivos de manera grupal
        .get(controllerFiles.getFiles)
        .post(controllerFiles.setFolder) // setFile


    // Rutas FILES Formularios
    app.get('/files/new', viewsController.getViewFileNew)
    app.get('/files/:id/edit', viewsController.getViewFileEdit)

    /*****************************************/

    // CRUD FILES  =======================================================
    app.route('/files/:id') // Crud a archivos de manera individual
        .get(controllerFiles.getFile)
        .put(controllerFiles.updateFile)
        .delete(controllerFiles.deleteFolder)

    return this
}
