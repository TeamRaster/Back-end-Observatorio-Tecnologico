// Configuraciones generales
'use strict'

// En produccion definir las variables de entorno process.env
module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB || 'mongodb://localhost:27017/Observatorio',
  SECRET_TOKEN: 'miclavedetokens'
};
