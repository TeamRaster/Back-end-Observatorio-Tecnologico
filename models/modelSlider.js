'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SliderSchema = new Schema({
    creacionSlider: {
        type      : Date,
        default   : Date.now
    },
    extension     : String,
    nombre        : String,
    creator: {
        type      : Schema.Types.ObjectId,
        ref       : "User"
    }
})

module.exports = mongoose.model('Slider', SliderSchema)
