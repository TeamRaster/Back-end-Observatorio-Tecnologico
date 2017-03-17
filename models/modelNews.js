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
        postedBy:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        comment: String ,
        date:  { type: Date, default: Date.now }
    }],

    likes: {
        votes     : Number,
        favs      : Number
    }
})


module.exports = mongoose.model('News', NewsSchema)
