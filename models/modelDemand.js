'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DemandSchema = new Schema({
    business      : {
        type      : String,
        maxlength : [50, "[Business]: Maximo 50 caracteres"]
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
    creationDemand: {
        type      : Date,
        require   : Date.now
    },
    // contact: {
    //     type      : Schema.Types.ObjectId,
    //     ref       : "Contact"
    // },
    // author: {
    //     type      : Schema.Types.ObjectId,
    //     ref       : "User"
    // }
})

module.exports = mongoose.model('Demand', DemandSchema)
