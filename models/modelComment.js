'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CommentSchema = new Schema({
    creacionComment: {
        type      : Date,
        require   : Date.now
    },
    comments: {
        type      : String
    },
    creator: {
        type      : Schema.Types.ObjectId,
        ref       : "User"
    }
})

module.exports = mongoose.model('Comment', CommentSchema)
