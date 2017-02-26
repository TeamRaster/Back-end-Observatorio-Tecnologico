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
        date      : String
    }],
    stats: {
        votes: Number,
        favs:  Number
    }
})

OfferSchema.pre('save', function(next) {
    let offer = this
    offer.image = offer.id + '.' + offer.ext
    next()
})

module.exports = mongoose.model('Offer', OfferSchema)
