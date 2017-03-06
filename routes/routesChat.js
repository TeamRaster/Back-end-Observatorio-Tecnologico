// 'use strict'
//
// module.exports = (app) => {
//     const conversation = app.controllers.controllerConversations  // Llamada del controlador para las conversaciones
//     const auth = require('../middlewares/auth')  // Llamada del middleware para la validacion de las rutas
//
//     app.get('/room', [auth.isLogged, (req, res) => {
//         return res.render('viewsUserPlus/rooms/index')
//     }])
//
//     // todo Verificar y refactorizar estas rutas con el codigo de Pio
//     app.get('/room/new', [auth.isLogged, conversation.getViewGroup])  // [Test]
//     app.post('/room/new', [auth.isLogged, conversation.setGroup])  // Crear un nuevo grupo [Test]
//     app.get('/room/:id', [auth.isLogged, conversation.setMembers])  // Unirse al grupo [Test]
//     app.get('/room/:id/chat', [auth.isLogged, conversation.getChat])  // [Test]
//
//     app.post('/room/:id/chat', [auth.isLogged, conversation.setMessage])  // [Test]
//
//     app.route('/message') // Crud a ofertas de manera grupal
//     // .get([authMiddleware.isLogged, controllers.conversationController.getOffers])
//         .post([auth.isLogged, conversation.setMessage])  // [Test] Guardar la conversacion en la base de datos
//
//     return this
// }
