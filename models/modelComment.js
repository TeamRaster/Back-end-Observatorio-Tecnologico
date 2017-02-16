'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CommentSchema = new Schema({
    creationComment: {
        type      : Date,
        require   : Date.now
    },
    comments: {
        type      : String,
        maxlength : [150, "[Comment]: Maximo 150 caracteres por cada comentario"],
    },
    author: {
        type      : Schema.Types.ObjectId,
        ref       : "User"
    },
    toNew: {
        type      : Schema.Types.ObjectId,
        ref       : "News"
    }
})

module.exports = mongoose.model('Comment', CommentSchema)
