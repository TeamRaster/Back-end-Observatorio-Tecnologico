// Archivo principal del sitio web
'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const logger = require('morgan');
const cookieParser = require('cookie-parser')
const path = require('path')
const mongoose = require('mongoose')

const routerUser = require('./routes/routerUser')
const routerUserPlus = require('./routes/routerUserPlus')
const routerAdministrator = require('./routes/routerAdministrator')
const validatorUsers = require('./middlewares/validatorUsers')
const validatorAdministrators = require('./middlewares/validatorAdministrators')

let config = require('./config/config.js') // variables de config (dbs, puertos, keytokens)

// Recibe la url como si fuera un objeto JSON
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

// Elementos estaticos
app.use(express.static(path.join(__dirname, 'public')))

// app.use('/', validatorUsers);

// Rutas de la aplicacion
app.use('/', routerUser);
app.use('/app', routerUserPlus);
app.use('/app/administrator', routerAdministrator);


// Motor de vistas
app.set('view engine', 'pug')

// Conexion a la base de datos
mongoose.connect(config.db, (err, res) => {
  if (err) return console.log(`Error conexion base de datos [./index.js]: ${err}`)
  console.log('Conexion establecida con la base de datos [./index.js]')
})







// Puerto en el que se ejecuta el server
app.listen(config.port, () => {
    //
})
