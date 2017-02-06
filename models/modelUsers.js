// Modelo para la tabla de usuarios
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

// Esquema de la tabla usuarios
const UsersSchema = new Schema({
    providerId    : {
        type      : String
    },
    username      : {
        type      : String,
        maxlength : [50, "[Nombre]: Maximo 50 caracteres"],
    },
    email         : String,
    password      : {
        type      : String,
        minlength : [8, "[Password]: Minimo 8 caracteres"],
        validate : {
            validator: function (p) {
                return this.password_confirmation == p
            },
            message: "[Error]: Las contraseñas no coinciden"
        }
    },
    photo         : String,
    provider      : String,
    mode          : {
        type      : String,
        default   : 'Usuario'
    },
    creacionFecha : {
        type      : Date,
        default   : Date.now
    }
})

UsersSchema.virtual("password_confirmation").get(function() {
    return this.password_con
}).set(function(password) {
    this.password_con = password
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
