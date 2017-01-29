// Archivo principal del sitio web
'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const logger = require('morgan');
const cookieParser = require('cookie-parser')
const path = require('path')
const mongoose = require('mongoose')

const port = process.env.PORT || 3000

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
mongoose.connect('mongodb://localhost:27017/Observatorio', (err, res) => {
  if (err) return console.log(`Error conexion base de datos [./index.js|30]: ${err}`)
  console.log('Conexion establecida')
})


// Puerto en el que se ejecuta el server
app.listen(port, () => {
    //
})
