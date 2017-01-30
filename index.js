// Archivo principal del sitio web
'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const logger = require('morgan');
const cookieParser = require('cookie-parser')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')

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

// Mensajes de errores, sessiones
app.use(flash())

app.use(session({
  secret: config.SECRET_TOKEN,
  resave: false,
  saveUninitialized: true
}))

// Motor de vistas
app.set('view engine', 'pug')

// Rutas de la aplicacion
app.use('/', routerUser);
app.use('/app', routerUserPlus);
app.use('/app/administrator', routerAdministrator);

// Conexion a la base de datos
mongoose.connect(config.db, (err, res) => {
  if (err) return console.log(`Error conexion base de datos [./index.js]: ${err}`)
  // console.log('Conexion establecida con la base de datos [./index.js]')
})

// Configuracion Passport
require('./config/passport')(app)


// Puerto en el que se ejecuta el server
app.listen(config.port, () => {
    //
})

