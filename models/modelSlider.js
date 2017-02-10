'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SliderSchema = new Schema({
    creationSlider: {
        type    : Date,
        default : Date.now
    },
    ext         : String,
    name        : String,
    author: {
        type    : Schema.Types.ObjectId,
        ref     : "User"
    }
})

module.exports = mongoose.model('Slider', SliderSchema)
