// 'use strict'
//
// module.exports = (app) => {
//     const demands = app.controllers.controllerDemands  // Llamada del controlador demandas
//     const auth = require('../middlewares/auth')  // Llamada del middleware para la validacion de las rutas
//
//     app.get('/demands', demands.getDemands)  // Pagina incial donde se mostrara todas las demandas al publico
//     app.get('/demand/new', [auth.isLogged, demands.getViewDemandNew])  // Formulario para crear nuevas demandas
//     app.get('/demand/:id/edit', [auth.isLogged, demands.getViewDemandEdit])  // Formulario para editar demandas
//
//     app.route('/demand/:id')  // Ver, Actualizar y Borrar demanda por ID
//         .get([auth.isLogged, demands.getDemand])
//         .put([auth.isLogged, demands.updateDemand])
//         .delete([auth.isLogged, demands.deleteDemand])
//
//     app.route('/demands')  // Ver y Agregar una nueva demanda a la base de datos
//         .get([auth.isLogged, demands.getDemands])
//         .post([auth.isLogged, demands.setDemand])
//
//     return this
// }
