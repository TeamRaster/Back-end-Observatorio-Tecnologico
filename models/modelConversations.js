'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = function () {
    const ConversationSchema = new Schema({
        conversation : [{
            author: {
                type : Schema.Types.ObjectId,
                ref  : "User"
            },
            message  : String,
            date     : {String}
        }]
    })

    return mongoose.model('Conversation', ConversationSchema)
}
