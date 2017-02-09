'use strict'

const express = require('express')
const app = express()  // Servidor de Express
const session = require('express-session')  // Sesiones de Express
const formidable = require('express-formidable')   // Middleware que ayuda a subir archivos al servidor
const methodOverride = require('method-override')  // Ayuda a que un formulario pueda enviar por metodo put, delete
const bodyParser = require('body-parser')  // Devuelve un json para hacer uso de los parametros del documento
const cookieParser = require('cookie-parser')
const path = require('path')  // Junta todos los argumentos y normaliza la ruta resultante.
const mongoose = require('mongoose')  // Manejador de la base de datos para MongoDB
const flash = require('connect-flash')  // Muestra mensajes de error que se pueden llegar a generar
const RedisStore = require('connect-redis')(session)  // Permiten manejar una cantidad mayor de sessiones al mismo tiempo.

const routerUser = require('./routes/routerUser')
const routerUserPlus = require('./routes/routerUserPlus')
const routerAdministrator = require('./routes/routerAdministrator')
const validateUsers = require('./middlewares/validateUsers')
const config = require('./config/config.js')  // variables de configuracion (dbs, puertos, keytokens)
// const noticiasCrudController = require('./controllers/newsCrudController')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))  // Archivos estaticos, ideal para los estilos, js, etc
app.set('view engine', 'pug')  // Motor de vistas

app.use(methodOverride("_method"))  // Ayuda a que un formulario pueda enviar por metodo put, delete

app.use(session({  // Configuracion de las sesiones
    cookie: { maxAge: 60000 },
    secret: config.SECRET_TOKEN,
    resave: false,
    saveUninitialized: false
}))

app.use(flash())  // Muestra mensajes de error que se pueden llegar a generar

require('./config/passport')(app)  // Configuracion Passport y pasamos como parametro el servidor

app.use(formidable({ keepExtensions: false }))  // Middleware que ayuda a subir archivos al servidor

app.use('/', routerUser)  // Rutas que accesibles para todos
app.use('/app', validateUsers.isLoggedIn, routerUserPlus)  // Rutas que accesibles para usuarios registrados y con sesion iniciada
app.use('/app/administrator', validateUsers.isAdministrator, routerAdministrator)  // Rutas que accesibles para Administradores

app.use('/admin', routerUserPlus)
//app.use('/noticias', noticiasCrudController.setNewNoticia, routerUserPlus)

mongoose.Promise = global.Promise;  // Arregla warning promesas xD

mongoose.connect(config.db, (err, res) => {  // Conexion a la base de datos
  if (err) return console.log(`Error conexion base de datos [./index.js]: ${err}`)
})

app.listen(config.port, () => {
//
})
