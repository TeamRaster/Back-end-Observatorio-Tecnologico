// 'use strict'
//
// module.exports = (app) => {
//     const groups = app.controllers.controllerGroups  // Llamada del controlador para los Grupos
//     const auth = require('../middlewares/auth')  // Llamada del middleware para la validacion de las rutas
//
//     // app.get('/groups', [])  // Pagina para visualizar todos los grupos
//     app.get('/group/new', groups.getViewGroupNew)  // Formulario para crear un nuevo grupo
//     app.get('/group/:id/edit', groups.getViewNewEdit)  // Formulario para editar un nuevo grupo
//
//     app.route('/groups')  // Ver y Agregar un nuevo grupo a la base de datos
//         .get(groups.getGroups)
//         .post(groups.setGroup)
//
//     return this
// }
