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
<<<<<<< HEAD
        type      : Schema.Types.ObjectId,
        ref       : "Comment"
    }],
    likes: [{
        type      : Schema.Types.ObjectId,
        ref       : "Stats"
    }]
=======
        postedBy  : {
            type  : Schema.Types.ObjectId,
            ref   : 'User'
        },
        comment   : String,
        date      : Date
    }],
    likes: {
        votes     : Number,
        favs      : Number
    }
>>>>>>> abf96eeed7fc8d943dce9bfacf3ae13c8752225d
})


module.exports = mongoose.model('News', NewsSchema)
