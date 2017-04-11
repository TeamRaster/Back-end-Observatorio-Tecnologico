'use strict'

const redis = require('redis')
let client = redis.createClient()

module.exports = (app) => {
    const controllerGroups = app.controllers.controllerGroups  // Llamada del controlador para los Grupos
    const viewsController= app.controllers.viewsController  // Llamada del controlador para los Grupos
    const auth = require('../middlewares/auth')  // Llamada del middleware para la validacion de las rutas

    client.on('connect', function() {
        console.log('connected REDIS ');
    });

    app.get('/groups/redis', (req, res) => {  // TESTS REDIS
        res.render('./viewsUserPlus/tests/redis')

    })


    app.get('/groups/redis/set', (req, res) => {

    // //client.del('tags', function(err, reply) { delete
        client.sadd(['tags', 'angularjs', 'backbonejs', 'emberjs'], function(err, reply) {
              console.log(reply);
            res.status(200).send({message: 'done set', reply})
        })

    })


    app.get('/groups/redis/get', (req, res) => {

        client.smembers('tags', function(err, reply) {
            console.log(reply);
            res.status(200).send({message: 'done set', reply})
        });

    })  // TESTS REDIS


    /************** VISTAS *****************///
    app.get('/groups/new', viewsController.getViewGroupNew)  // Formulario para crear un nuevo grupo
    app.get('/groups/:id/edit', viewsController.getViewGroupEdit)  // Formulario para editar un nuevo grupo

    /*****************************************/

    app.route('/groups') // Crud a grupos de manera global :v // Ver y Agregar un nuevo grupo a la base de datos  // Pagina para visualizar todos los grupos
        .get(controllerGroups.getGroups)
        .post(controllerGroups.setGroup)

    // CRUD Grupos =======================================================
    app.route('/groups/:id') // Crud a grupos de manera individual
        .get(controllerGroups.getGroup)
        .put(controllerGroups.updateGroup)
        .delete(controllerGroups.deleteGroup)

    // miembros y subscripciones a Grupos
    app.route('/groups/subscribe/:groupId')
        .post(controllerGroups.subsTo)

        // miembros y solicitudes de Grupos
    app.route('/groups/member/:groupId/:userId') // Crud a MIEMBROS de grupos  * SOLO ADMINS
        .put(controllerGroups.addMemberToGroup)
        .delete(controllerGroups.isAdmin, controllerGroups.deleteMemberFromGroup)

    app.route('/groups/admin/:groupId/:userId') // Crud a *SOLO ADMINS de grupos
        .put(controllerGroups.addAdminToGroup)
        .delete(controllerGroups.deleteAdminFromGroup)

    app.route('/groups/user/myGroups') // obtener  grupos del ususario // ISSUE FIXME /groups/myGroups/ ->estaba tomando myGroups como :id XD
        .get(controllerGroups.getMyGroups)

    app.route('/groups/memberRequest/:groupId')
        .post(controllerGroups.sendRequest)


    // CRUD NOTIFICACIONES POR GRUPO  =======================================================
    app.route('/groups/notif/:groupId') // Crud a grupos de manera individual
        .post(controllerGroups.notiToGroup)
        /*.get(controllerGroups.getGroup)
        .put(controllerGroups.updateGroup)
        .delete(controllerGroups.deleteGroup)*/

    return this
}
