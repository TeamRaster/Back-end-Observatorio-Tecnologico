'use strict'
// Moodulos
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const logger = require('morgan');
const cookieParser = require('cookie-parser')
const path = require('path')

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




// Puerto en el que se ejecuta el server
app.listen(port, () => {
    //
})
