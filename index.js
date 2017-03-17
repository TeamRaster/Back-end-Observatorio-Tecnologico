'use strict'

const config          = require('./config/config.js')  // variables de configuracion (dbs, puertos, keytokens),
    , realtimeSocket  = require('./realtimeSocket')
let maxAge_ = 60000 * 60 * 24 // 60Seg(1Minuto) * 60Min(1Hora) * 24H(1Dia)

const express         = require('express')
    , app             = express()  // Servidor de Express
    , session         = require('express-session')  // Sesiones de Express
    , methodOverride  = require('method-override')  // Ayuda a que un formulario pueda enviar por metodo put, delete
    , bodyParser      = require('body-parser')  // Devuelve un json para hacer uso de los parametros del documento
    , cookieParser    = require('cookie-parser')
    , path            = require('path')  // Junta todos los argumentos y normaliza la ruta resultante.
    , mongoose        = require('mongoose')  // Manejador de la base de datos para MongoDB
    , flash           = require('connect-flash')  // Muestra mensajes de error que se pueden llegar a generar
    , RedisStore      = require('connect-redis')(session)  // Permiten manejar una cantidad mayor de sessiones al mismo tiempo.
    , server          = require('http').createServer(app)
    , io              = require('socket.io')(server)
    , logger          = require('morgan')
    , consign         = require('consign')
    , passport        = require('passport')

const realtimeGroups = require('./realtimeGroups')
const routerUser = require('./routes/routesUsers')
const routerUserPlus = require('./routes/routerUserPlus')
const validateUsers = require('./middlewares/authMiddleware')

// app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))  // Archivos estaticos, ideal para los estilos, js, etc
app.set('view engine', 'pug')  // Motor de vistas

mongoose.connect(config.db, (err, res) => {  // Conexion a la base de datos
    if (err) return console.log(`[./index.js]: No se detecta una conexion con la base de datos ::: ${err}`)
})

if (app.get('env') === 'development') { //  TODO quitar en producción (Hace bonito el codigo fiente :v)
    app.locals.pretty = true
}

const sessionMiddleware = session({  // Configuracion de las sesiones
    store: new RedisStore({ }), // poner puerto y contraseña para produccion
    cookie: { maxAge: maxAge_ },
    secret: config.SECRET_TOKEN,
    resave: false,
    saveUninitialized: true
})
app.set('view engine', 'pug')  // Motor de vistas

realtimeGroups(server, sessionMiddleware)

// app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))  // Archivos estaticos, ideal para los estilos, js, etc
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(methodOverride("_method"))  // Ayuda a que un formulario pueda enviar por metodo put, delete
realtimeSocket(io, sessionMiddleware)

app.use(sessionMiddleware)
app.use(flash())  // Muestra mensajes de error que se pueden llegar a generar

consign({ verbose: false })
    .include('models')
    .then('middlewares')
    .then('controllers')
    .then('routes')
    .into(app)

require('./controllers/controllerPassport')(app)  // Configuracion Passport y pasamos como parametro el servidor

app.use(app.middlewares.err.errorHandler)  // Middleware para captar errores
server.listen(config.port)
