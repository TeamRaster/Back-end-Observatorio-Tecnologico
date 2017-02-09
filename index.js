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
const formidable = require('express-formidable')
// const logger = require('morgan');


const routerUser = require('./routes/routerUser')
const routerUserPlus = require('./routes/routerUserPlus')
const routerAdministrator = require('./routes/routerAdministrator')
const validateUsers = require('./middlewares/validateUsers')
const config = require('./config/config.js') // variables de config (dbs, puertos, keytokens)

// Recibe la url como si fuera un objeto JSON
// app.use(formidable({ keepExtensions: false }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())


app.use(session({
  cookie: {maxAge: 60000},
  secret: config.SECRET_TOKEN,
  resave: false,
  saveUninitialized: false
}))
// Mensajes de errores, sessiones
app.use(flash())


// Configuracion Passport
require('./config/passport')(app)

// Motor de vistas
app.set('view engine', 'pug')

// Elementos estaticos
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routerUser)
app.use('/app', validateUsers.isLoggedIn, routerUserPlus)
app.use('/app/administrator', validateUsers.isAdministrator, routerAdministrator)

// Conexion a la base de datos
mongoose.connect(config.db, (err, res) => {
  if (err) return console.log(`Error conexion base de datos [./index.js]: ${err}`)
})

// Puerto en el que se ejecuta el server
app.listen(config.port, () => {
//
})

