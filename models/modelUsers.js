// Modelo para la tabla de usuarios
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

module.exports = (app) => {
    const StatsSchema = new Schema({
        dataUser: [{
            publications  : String,
            type: {
                type      : String,
                enum      : ['like', 'dislike', 'null']
            },
        }],
    })


    const UsersSchema = new Schema({
        username          : {
            type          : String,
            minlength     : [1, "[Username]: Minimo 1 caracteres"],
            maxlength     : [50, "[Username]: Maximo 50 caracteres"],
            trim          : true
        },
        photo: {
            type          : String,
            default       : 'Imagen no disponible'
        },
        path              : String,
        provider: {
            type          : String,
            default       : 'Local'
        },
        administrator     : Boolean,
        creationDate: {
            hour: {
                type      : String,
                default   : '00:00'
            },
            date: {
                type      : String,
                default   : '00/00/0000'
            },
        },
        updateDate: {
            hour: {
                type      : String,
                default   : '00:00'
            },
            date: {
                type      : String,
                default   : '00/00/0000'
            },
        },

        history           : [StatsSchema],

        contactInformation: {
            phone: {
                type      : String,
                trim      : true,
            },
            address: {
                type      : String,
                lowercase : true,
                trim      : true
            },
            facebook: {
                type      : String,
                trim      : true,
                lowercase : true,
            },
            twitter: {
                type      : String,
                trim      : true,
                lowercase : true,
            },
            linkedin: {
                type      : String,
                trim      : true,
                lowercase : true,
            },
        },

        local: {
            email: {
                type      : String,
                lowercase : true,
                trim      : true,
                unique    : true
            },
            password: {
                type      : String,
                minlength : [8, "[Password]: Minimo 8 caracteres"],
                trim      : true
            },
        },
        facebook: {
            id            : String,
            token         : String,
            email         : String,
            name          : String
        },
        twitter: {
            id            : String,
            token         : String,
            displayName   : String,
            username      : String
        },
        linkedin: {
            id            : String,
            token         : String,
            displayName   : String,
            username      : String
        },
    })

    UsersSchema.pre('save', function (next) {
        let user = this
        console.log(`\n[modelUser.pre(save)]: Correo guardado => ${user.local.email}`)
        console.log(`[modelUser.pre(save)]: Contraseña guardada => ${user.local.password}`)
        next()
    })

    UsersSchema.methods.hashPassword = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(11), null)
    }

    UsersSchema.methods.comparePassword = function (password, storedPassword) {
        return bcrypt.compareSync(password, storedPassword)
    }

    return mongoose.model('User', UsersSchema)
}
