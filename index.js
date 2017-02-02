'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const RedisStore = require('connect-redis')(session)
// const logger = require('morgan');

const routerUser = require('./routes/routerUser')
const routerUserPlus = require('./routes/routerUserPlus')
const routerAdministrator = require('./routes/routerAdministrator')
const validatorUsers = require('./middlewares/validatorUsers')
const validatorAdministrators = require('./middlewares/validatorAdministrators')
const config = require('./config/config.js') // variables de config (dbs, puertos, keytokens)
const User = require('./models/modelUsers')

// Recibe la url como si fuera un objeto JSON
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

// Motor de vistas
app.set('view engine', 'pug')

// Elementos estaticos
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  store: new RedisStore({}),
  secret: config.SECRET_TOKEN,
  resave: false,
  saveUninitialized: true
}))
// Mensajes de errores, sessiones
app.use(flash())

// Configuracion Passport
require('./config/passport')(app)

// Rutas de la aplicacion
app.use('/', routerUser)
// todo agregar middleware para validar a usuarios con sesion iniciada
app.use('/app', routerUserPlus)
// todo agregar middleware para validar a Administradores
app.use('/app/administrator', routerAdministrator)

// Conexion a la base de datos
mongoose.connect(config.db, (err, res) => {
  if (err) return console.log(`Error conexion base de datos [./index.js]: ${err}`)
  // console.log('Conexion establecida con la base de datos [./index.js]')
})


// Puerto en el que se ejecuta el server
app.listen(config.port, () => {
    //
})

