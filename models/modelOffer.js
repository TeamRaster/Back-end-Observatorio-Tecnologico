'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OfferSchema = new Schema({
    business      : String,
    image         : String,
    ext           : String,
    description   : String,
    category      : String,
    creationOffer : {
        type      : Date,
        require   : Date.now
    },
    contact: {
        type      : Schema.Types.ObjectId,
        ref       : "Contact"
    },
    creator: {
        type      : Schema.Types.ObjectId,
        ref       : "User"
    }
})

OfferSchema.pre('save', function (next) {
    let newOffer = this
    if (!newOffer.isModified('image')) {
        console.log('La imagen no tiene nombre[modelOffer]')
        return next()
    } else {
        console.log('El nombre de la imagen ha sido modificada[modelOffer]')
    }

    newOffer.image = newOffer._id
})

module.exports = mongoose.model('Offer', OfferSchema)
