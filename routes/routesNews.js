// 'use strict'
//
// module.exports = (app) => {
//     const news = app.controllers.controllerNews  // Llamada del controlador para las Noticias
//     const auth = require('../middlewares/auth')  // Llamada del middleware para la validacion de las rutas
//
//     app.get('/news', [auth.isAdministrator])  // Pagina para mostrar todas las noticias
//     app.get('/news/new', [auth.isAdministrator])  // Formulario para crear una nueva noticia
//     app.get('/news/:id/edit', [auth.isAdministrator, news.getViewNewEdit])  // Formulario para editar una noticia
//
//     app.route('/new/:id') // Ver, Actualizar y Eliminar una noticia por id
//         .get([auth.isAdministrator, news.getNoticiaById])
//         .put([auth.isAdministrator, news.updateNoticiaById])
//         .delete([auth.isAdministrator, news.removeNoticiaById])
//
//     app.route('/news')
//         .get([auth.isAdministrator, news.getAllNoticias])  // Obetener todas las noticias existentes
//         .post([auth.isAdministrator, news.setNewNoticia])  // Agregar una nueva noticia
//
//     return this
// }
