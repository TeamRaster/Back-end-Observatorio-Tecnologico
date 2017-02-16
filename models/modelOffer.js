'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    creationOffer : {
        type      : Date,
        require   : Date.now
    },
    // contact: {
    //     type      : Schema.Types.ObjectId,
    //     ref       : "Contact"
    // },
    // creator: {
    //     type      : Schema.Types.ObjectId,
    //     ref       : "User"
    // }
})

OfferSchema.pre('save', function(next) {
    let offer = this
    offer.image = offer.id + '.' + offer.ext
    next()
})

module.exports = mongoose.model('Offer', OfferSchema)
