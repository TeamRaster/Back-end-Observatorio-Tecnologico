'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const OfferSchema = new Schema({
    business      : {
        type      : String,
        maxlength : [100, "[modelOffer/business]: Maximo 100 caracteres"]
    },
    ext           : {
        type      : String,
        default   : 'jpg'
    },
    image         : {
        type      : String,
        default   : 'No disponible'
    },
    description   : {
        type      : String
    },
    category      : [String],
    creationOffer : String,
    postedBy: {
        type      : Schema.Types.ObjectId,
        ref       : "User"
    },
    comments: [{
        postedBy  : {
            type  : Schema.Types.ObjectId,
            ref   : 'User'
        },
        comment   : String,
        date      : String,
        answer: [{
            postedBy : {
                type : Schema.Types.ObjectId,
                ref  : 'User'
            },
            comment  : String,
            date     : String
        }],
    }],
    numComments : {
        type    : Number,
        default : 0
    },
    stats: {
        vote: {
            type : String,
            enum : ['like', 'dislike']
        },
        likes : {
            type    : Number,
            default : 0
        },
        dislikes : {
            type    : Number,
            default : 0
        },
    }
})

OfferSchema.pre('save', function(next) {
    let offer = this
    offer.image = offer.id + '.' + offer.ext
    next()
})

module.exports = mongoose.model('Offer', OfferSchema)
