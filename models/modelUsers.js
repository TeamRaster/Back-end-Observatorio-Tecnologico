// Modelo para la tabla de usuarios
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Esquema de la tabla usuarios
const UsersSchema = new Schema({
  name: String,
  password: String,
  email: String,
  age: Number,
  sex: {
    type: String,
    enum: ['Masculino', 'Femenino']
  }
})

// Exportacion del modelo
module.exports = mongoose.model('User', UsersSchema)
