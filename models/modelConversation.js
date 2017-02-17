'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ConversationSchema = new Schema({
    creationMessage: {
        type      : [Date],
        default   : Date.now
    },
    message: {
        type      : [String],
        maxlength : [150, "[Message]: Maximo 150 caracteres"],
    },
    author: {
        type      : [String]
    }
})

module.exports = mongoose.model('Conversation', ConversationSchema)
