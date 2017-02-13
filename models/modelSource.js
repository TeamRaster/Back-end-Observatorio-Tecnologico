'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SourceSchema = new Schema({
    creationSource: {
        type    : Date,
        default : Date.now
    },
    title       : String,
    image       : String
})

module.exports = mongoose.model('Source', SourceSchema)
