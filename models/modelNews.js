'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const NewsSchema = new Schema({
    titulo: {
        type      : String,
        require   : true
    },
    imagen: {
        type      : String
    },
    extension     : String,
    texto: {
        type      : String
    },
    categoria: {
        type      : [String]
    },
    creator: {
        type      : Schema.Types.ObjectId,
        ref       : "User"
    },
    comentarios: {
        type      : Schema.Types.ObjectId,
        ref       : "Comment"
    },
    likes: {
        type      : Schema.Types.ObjectId,
        ref       : "Stats"
    }
})


module.exports = mongoose.model('News', NewsSchema)

