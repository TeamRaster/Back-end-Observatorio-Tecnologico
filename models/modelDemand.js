'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DemandSchema = new Schema({
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

module.exports = mongoose.model('Demand', DemandSchema)
