'use strict'

const config              = require('./config/config.js'),  // variables de configuracion (dbs, puertos, keytokens),
      routerUser          = require('./routes/routerUser'),
      routerUserPlus      = require('./routes/routerUserPlus'),
      routerAdministrator = require('./routes/routerAdministrator'),
      authMiddleware      = require('./middlewares/authMiddleware'),
      realtimeSocket      = require('./realtimeSocket')
let maxAge_ = 60000 * 60 * 24 // 60Seg(1Minuto) * 60Min(1Hora) * 24H(1Dia)

const express        = require('express'),
      app            = express(),  // Servidor de Express
      session        = require('express-session'),  // Sesiones de Express
      formidable     = require('express-formidable'),   // Middleware que ayuda a subir archivos al servidor
      methodOverride = require('method-override'),  // Ayuda a que un formulario pueda enviar por metodo put, delete
      bodyParser     = require('body-parser'),  // Devuelve un json para hacer uso de los parametros del documento
      cookieParser   = require('cookie-parser'),
      path           = require('path'),  // Junta todos los argumentos y normaliza la ruta resultante.
      mongoose       = require('mongoose'),  // Manejador de la base de datos para MongoDB
      flash          = require('connect-flash'),  // Muestra mensajes de error que se pueden llegar a generar
      RedisStore     = require('connect-redis')(session),  // Permiten manejar una cantidad mayor de sessiones al mismo tiempo.
      server         = require('http').createServer(app),
      io             = require('socket.io')(server),
      logger         = require('morgan')

// app.use(logger('dev'))
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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))  // Archivos estaticos, ideal para los estilos, js, etc
app.use(methodOverride("_method"))  // Ayuda a que un formulario pueda enviar por metodo put, delete
app.set('view engine', 'pug')  // Motor de vistas

realtimeSocket(io, sessionMiddleware)
app.use(sessionMiddleware)

app.use(flash())  // Muestra mensajes de error que se pueden llegar a generar
require('./config/passport')(app)  // Configuracion Passport y pasamos como parametro el servidor
app.use(formidable({ keepExtensions: false }))  // Middleware que ayuda a subir archivos al servidor

app.use('/admin', routerUserPlus)// temporal
app.use('/', routerUser)  // Rutas que accesibles para todos
app.use('/app', routerUserPlus)  // Rutas que accesibles para usuarios registrados y con sesion iniciada
app.use('/administrator', routerAdministrator)  // Rutas que accesibles para Administradores
// app.get("/", function(req, res){
//     req.session // Session object in a normal request
// })

mongoose.connect(config.db, (err, res) => {  // Conexion a la base de datos
  if (err) return console.log(`Error conexion base de datos [./index.js]: ${err}`)
})

server.listen(config.port)
