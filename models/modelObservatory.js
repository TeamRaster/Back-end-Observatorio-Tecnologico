'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ObservatorySchema = new Schema({
    creationObservatory: {
        type    : Date,
        default : Date.now
    },
    title       : String,
    image       : String
})

module.exports = mongoose.model('Observatory', ObservatorySchema)
