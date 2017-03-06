// 'use strict'
//
// module.exports = (app) => {
//     const offer = app.controllers.controllerOffers  // Llamada del controlador ofertas
//     const auth = require('../middlewares/auth')  // Llamada del middleware para la validacion de las rutas
//
//     app.get('/offers', offer.getOffers)  // Pagina incial donde se mostrara todas las ofrtas al publico
//     app.get('/offer/new', [auth.isLogged, offer.getViewOfferNew])  // Formulario para las nuevas ofertas
//     app.get('/offer/:id/edit', [auth.isLogged, offer.getViewOfferEdit])  // Formulario para editar las ofertas
//
// // Almacenar comentarios y likes =======================================================================================
//     app.route('/offer/:id/comments')
//         .post([auth.isLogged, offer.setComment])  // Establece un comentario nuevo
//         .get([auth.isLogged, offer.getComments])  // Obtiene los comentarios de cada oferta
//         .put([auth.isLogged, offer.updateComment])  // Actualiza un comentario
//         .delete([auth.isLogged, offer.deleteComment])  // Elimina un comentario
//
//     app.route('/offer/:id/stats')
//         .post([auth.isLogged, offer.setScore])  // Establece un like o dislike dependiendo de lo que se envia
//         .get([auth.isLogged, offer.getScores])  // Obtiene la puntuacion total de la oferta
//         .put([auth.isLogged, offer.updateScore])  // Actualiza el score que se le halla dado
//         .delete([auth.isLogged, offer.deleteScore])  // Elimina el like o dislike que se le dio a la oferta
//
//     // app.post('/offers/:id/comments', [auth.isLogged, offer.setComment])
//     // app.post('/offers/:id/like', [auth.isLogged, offer.setLike])
//     // app.delete('/offers/:id/like', [auth.isLogged, offer.deleteLike])
//
// // CRUD Offers =========================================================================================================
//     app.route('/offer/:id') // Crud a ofertas de manera individual
//         .get([auth.isLogged, offer.getOffer])  // Obtiene una oferta por id
//         .put([auth.isLogged, offer.updateOffer])  // Actualiza una oferta por id
//         .delete([auth.isLogged, offer.deleteOffer])  // Elimina una oferta por id
//
//     app.route('/offers') // Crud a ofertas de manera grupal
//         .get([auth.isLogged, offer.getOffers])  // Obtiene todas las ofertas
//         .post([auth.isLogged, offer.setOffer])  // Agrega una oferta
//
//     return this
// }
