'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = (app) => {
    const SliderSchema = new Schema({
        title    : String,
        uploadBy: {
            type : Schema.Types.ObjectId,
            ref  : "User"
        },
        image    : String,
        creationDate: {
            type : String,
        },
    })

    return mongoose.model('Slider', SliderSchema)
}
