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
const consultasController = require('./controllers/consultasController')
const noticiasCrudController = require('./controllers/noticiasCrudController')

const validatorUsers = require('./middlewares/validatorUsers')
const config = require('./config/config.js') // variables de config (dbs, puertos, keytokens)

// Recibe la url como si fuera un objeto JSON
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

// Motor de vistas
app.set('view engine', 'pug')

// Elementos estaticos
app.use(express.static(path.join(__dirname, 'public')))

// Mensajes de errores, sessiones
app.use(flash())

app.use(session({
  store: new RedisStore({}),
  secret: config.SECRET_TOKEN,
  resave: false,
  saveUninitialized: true
}))

// Configuracion Passport
require('./config/passport')(app)


app.use('/', routerUser)
app.use('/admin', routerUserPlus)
app.use('/app', validatorUsers.isLoggedIn, routerUserPlus) // TODO checar
app.use('/noticias', noticiasCrudController.setNewNoticia, routerUserPlus)

app.use('/app/administrator', validatorUsers.isAdministrator, routerAdministrator)
//app.use('/users/todos', consultasController.getViewIndexTodoUsers, routerUserPlus)

// Conexion a la base de datos
mongoose.connect(config.db, (err, res) => {
  if (err) return console.log(`Error conexion base de datos [./index.js]: ${err}`)
})




// Puerto en el que se ejecuta el server
app.listen(config.port, () => {
//
})
