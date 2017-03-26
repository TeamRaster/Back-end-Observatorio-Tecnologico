'use strict'

module.exports = (app) => {

    const controllerNews = app.controllers.controllerNews // Llamada del controlador para los Grupos
    const viewsController= app.controllers.viewsController  // Llamada del controlador para los Grupos FIXME
    const auth = require('../middlewares/auth')  // Llamada del middleware para la validacion de las rutas


    // Rutas NOTICIAS Formularios
    //app.get('/news',  controllerNews.getAllNews)  // Pagina para mostrar todas las noticias
    app.route('/news')
        .get(controllerNews.getAllNews)  // Obetener todas las noticias existentes
        .post(controllerNews.setNewNew)  // Agregar una nueva noticia*/

    app.get('/news/new', controllerNews.getViewNewNew)
    app.get('/news/:id/edit', controllerNews.getViewNewEdit)


    /*
    app.get('/news', [auth.isAdministrator])  // Pagina para mostrar todas las noticias
    // CRUD News
    app.get('/news/new', [auth.isAdministrator])  // Formulario para crear una nueva noticia
    app.get('/news/:id/edit', [auth.isAdministrator, controllerNews.getViewNewEdit])  // Formulario para editar una noticia
    */

    /*app.route('/new/:id') // Ver, Actualizar y Eliminar una noticia por id
        .get([auth.isAdministrator, controllerNews.getNewById])
        .put([auth.isAdministrator, controllerNews.updateNewById])
        .delete([auth.isAdministrator, controllerNews.removeNewById])

    app.route('/news')
        .get([auth.isAdministrator, controllerNews.getAllNews])  // Obetener todas las noticias existentes
        .post([auth.isAdministrator, controllerNews.setNewNew])  // Agregar una nueva noticia*/

    return this
}
