// 'use strict'
//
// module.exports = (app) => {
//     const sources = app.controllers.controllerSources  // Llama al controlador de fuentes de informacion
//     const auth = require('../middlewares/auth')  // Llamada del middleware para la validacion de las rutas
//
//     app.get('/sources/:type/all', sources.getall)  // Muestra todas las fuentes de informacion por tipo
//     app.get('/sources/new', sources.getViewSourceNew)  // Formulario para agregar una nueva fuente de informacion
//     app.get('/sources/:id/edit', sources.getViewSourceEdit)  // Formulario para editar las fuentes de informacion
//
//     app.route('/sources/:id')
//         .get(sources.getSource)  // Obtiene una fuente de informacion por id
//         .put(sources.updateSource)  // Actualiza una fuente de informacion
//         .delete(sources.deleteSource)  // Elimina una fuente de informacion
//
//     app.route('/sources')
//         .post(sources.setSource)  // Agrega una fuentes de informacion
//         .get(sources.getSources)  // Obtiene todas las fuentes de informacion
//
//     return this
// }
