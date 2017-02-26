'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsSchema = new Schema({
    title: {
        type      : String,
        require   : true
    },
    image: {
        type      : String
    },
    extension     : String,
    text: {
        type      : String
    },
    category: {
        type      : [String]
    },
    creator: {
        type      : Schema.Types.ObjectId,
        ref       : "User"
    },
    comments: [{
        type      : Schema.Types.ObjectId,
        ref       : "Comment"
    }],
    likes: [{
        type      : Schema.Types.ObjectId,
        ref       : "Stats"
    }]
})


module.exports = mongoose.model('News', NewsSchema)
