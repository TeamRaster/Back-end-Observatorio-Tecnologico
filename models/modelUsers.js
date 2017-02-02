// Modelo para la tabla de usuarios
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

// Esquema de la tabla usuarios
const UsersSchema = new Schema({
    local: {
        email       : String,
        password    : String
    },
    facebook: {
        name        : String,
        provider    : String,
        id          : {
            type    : String,
            unique  : true
        },
        photo       : String,
        cratedAt    : {
            type    : Date,
            default : Date.now
        },
        token       : String,
        email       : String,
    },
    twitter: {
        id          : String,
        token       : String,
        email       : String,
        username    : String
    }
})

// Validacion de contraseñas para inicio de sesion
UsersSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password)
}

// Creacion de un hash para el password
UsersSchema.methods.hashPassword = function(password) {
    bcrypt.hash(password, null, null, function(err, hash) {
        if (err) return next(err)
        this.local.password = hash
    })
}

// Exportacion del modelo
module.exports = mongoose.model('User', UsersSchema)
