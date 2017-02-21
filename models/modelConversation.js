'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ConversationSchema = new Schema({
    conversation : [{
        author   : {
            type : Schema.Types.ObjectId,
            ref  : "User"
        },
        message  : String,
        date     : Date
    }]
})

module.exports = mongoose.model('Conversation', ConversationSchema)
