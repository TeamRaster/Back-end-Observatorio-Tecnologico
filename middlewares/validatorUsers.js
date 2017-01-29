// Validacion de que puede ver un usuario sin iniciar sesion
'use strict'

// Validacion para que los usuarios no puedan entrar a paginas sin autenticarse
// module.exports = (request, response, next) => {
//   if(!request.session) {
//     response.redirect('/')
//   } else {
//     next()
//   }
// }
