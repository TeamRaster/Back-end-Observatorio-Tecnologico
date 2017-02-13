'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SliderSchema = new Schema({
    creationSlider: {
        type    : Date,
        default : Date.now
    },
    name        : String,
    category    : String
})

module.exports = mongoose.model('Slider', SliderSchema)
