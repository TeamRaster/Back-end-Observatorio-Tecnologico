// Modelo para la tabla de usuarios
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

// Esquema de la tabla usuarios
const UsersSchema = new Schema({
    providerId    : {
        type      : String,
        default   : 'No disponible'
    },
    username      : {
        type      : String,
        maxlength : [50, "[Nombre]: Maximo 50 caracteres"],
    },
    email         : {
        type      : String,
        default   : 'Aun falta por confirmar',
        lowercase : true,
        trim      : true,
        unique    : true
    },
    password      : {
        type      : String,
        minlength : [8, "[Password]: Minimo 8 caracteres"],
        trim      : true
    },
    photo         : {
        type      : String,
        default   : 'No disponible'
    },
    provider      : String,
    administrator : {
        type      : Boolean,
        default   : false
    },
    fechaCreacion : {
        type      : Date,
        default   : Date.now
    }
})

UsersSchema.pre('save', function (next) {
    let user = this
    // Detecta cuando se cambia la contraseña con el hash
    if (!user.isModified('password')) {
        console.log('La contraseña aun no esta encriptada')
        return next()
    } else {
        console.log('La contraseña esta encriptada')
    }

    // Hace uso de la funcion
    this.hashPassword(user.password, function (err, hash) {
        if (err) return next(err)
        user.password = hash
        next()
    })
})

UsersSchema.methods.hashPassword = function (candidatePassword, cb) {
    bcrypt.genSalt(11, function (err, salt) {
        if (err) return cb(err)
        bcrypt.hash(candidatePassword, salt, null, function (err, hash) {
            if (err) return cb(err)
            return cb(null, hash)
        })
    })
}

UsersSchema.methods.comparePassword = function (candidatePassword, hashedPassword, cb) {
    bcrypt.compare(candidatePassword, hashedPassword, function (err, isMatch) {
        if (err) return cb(err)
        return cb(null, isMatch)
    })
}

module.exports = mongoose.model('User', UsersSchema)
