'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DemandaSchema = new Schema({
    empresa       : String,
    imagen        : String,
    extension     : String,
    descripcion   : String,
    categoria     : String,
    creacionOferta: {
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

module.exports = mongoose.model('Demanda', DemandaSchema)

