'use strict'

module.exports = (app) => {
    const groupsCtrl = app.controllers.controllerGroups  // Llamada del controlador para los Grupos
    const viewsCtrl= app.controllers.viewsController  // Llamada del controlador para los Grupos
    const auth = require('../middlewares/auth')  // Llamada del middleware para la validacion de las rutas


    /************** VISTAS *****************///

    app.get('/group/new', viewsCtrl.getViewGroupNew)  // Formulario para crear un nuevo grupo
    app.get('/group/:id/edit', viewsCtrl.getViewNewEdit)  // Formulario para editar un nuevo grupo

    /*****************************************/

    app.route('/groups', []) // Crud a grupos de manera global :v // Ver y Agregar un nuevo grupo a la base de datos  // Pagina para visualizar todos los grupos
    .get(groupsCtrl.getGroups)
    .post(groupsCtrl.setGroup)


    // CRUD Grupos =======================================================
    app.route('/groups/:id') // Crud a grupos de manera individual
        .get(groupsCtrl.getGroup)
        .put(groupsCtrl.updateGroup)
        .delete(groupsCtrl.deleteGroup)


        // miembros y solicitudes de Grupos
    app.route('/groups/member/:groupId/:userId') // Crud a MIEMBROS de grupos  * SOLO ADMINS
        //.get(groupsCtrl.getGroup)
        .put(groupsCtrl.addMemberToGroup)
        .delete(groupsCtrl.isAdmin, groupsCtrl.deleteMemberFromGroup)

    app.route('/groups/admin/:groupId/:userId') // Crud a *SOLO ADMINS de grupos
        //.get(groupsCtrl.getGroup)
        .put(groupsCtrl.addAdminToGroup)
        .delete(groupsCtrl.deleteAdminFromGroup)

    app.route('/groups/user/myGroups') // obtener  grupos del ususario // ISSUE FIXME /groups/myGroups/ ->estaba tomando myGroups como :id XD
        .get(groupsCtrl.getMyGroups)

    app.route('/groups/memberRequest/:groupId')
        .post(groupsCtrl.sendRequest)


    // CRUD NOTIFICACIONES POR GRUPO  =======================================================
    app.route('/groups/notif') // Crud a grupos de manera individual
        .post(groupsCtrl.notiToGroup)
        /*.get(groupsCtrl.getGroup)
        .put(groupsCtrl.updateGroup)
        .delete(groupsCtrl.deleteGroup)*/

    return this
}
