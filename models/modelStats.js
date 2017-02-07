'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StatsSchema = new Schema({
    likes       : Number,
    creator: {
        type    : Schema.Types.ObjectId,
        ref     : "User"
    }
})

module.exports = mongoose.model('Stat', StatsSchema)
