// Archivo principal del sitio web
'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const logger = require('morgan');
const cookieParser = require('cookie-parser')
const path = require('path')
const mongoose = require('mongoose')

let config = require('./config/config.js') // variables de config (dbs, puertos, keytokens)

// Recibe la url como si fuera un objeto JSON
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

// Elementos estaticos
app.use(express.static(path.join(__dirname, 'public')))

// Motor de vistas
app.set('view engine', 'pug')

// Rutas
app.get('/', (req, res) => {
    res.render('index')
})

// Conexion a la base de datos
mongoose.connect(config.db, (err, res) => {
  if (err) return console.log(`Error conexion base de datos [./index.js]: ${err}`)
  console.log('Conexion establecida con la base de datos [./index.js]')
})







// Puerto en el que se ejecuta el server
app.listen(config.port, () => {
    //
})
