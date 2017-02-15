'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SourceSchema = new Schema({
    creationSource: {
        type    : Date,
        default : Date.now
    },
    title       : String,
    image       : String,
    author: {
        type    : Schema.Types.ObjectId,
        ref     : "User"
    },
    type        : String
})

module.exports = mongoose.model('Source', SourceSchema)
