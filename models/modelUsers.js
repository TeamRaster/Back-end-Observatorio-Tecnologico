// Modelo para la tabla de usuarios
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

// Esquema de la tabla usuarios
const UsersSchema = new Schema({
    local: {
        id          : {
            type    : String,
            unique  : true
        },
        email       : String,
        password    : String,
        username    : String,
        photo       : String,
        mode        : {
            type    : String,
            default : 'Usuario'
        },
        cratedAt    : {
            type    : Date,
            default : Date.now
        }
    },
    facebook: {
        idFb        : {
            type    : String,
            unique  : true
        },
        name        : String,
        provider    : String,
        photo       : String,
        token       : String
    },
    twitter: {
        idTw        : {
            type    : String,
            unique  : true
        },
        username    : String,
        provider    : String,
        photo       : String,
        token       : String
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

module.exports = mongoose.model('User', UsersSchema)
