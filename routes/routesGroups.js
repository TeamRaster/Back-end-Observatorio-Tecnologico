'use strict'

module.exports = (app) => {
    const controllerGroups = app.controllers.controllerGroups  // Llamada del controlador para los Grupos
    const viewsController= app.controllers.viewsController  // Llamada del controlador para los Grupos
    const auth = require('../middlewares/auth')  // Llamada del middleware para la validacion de las rutas


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
