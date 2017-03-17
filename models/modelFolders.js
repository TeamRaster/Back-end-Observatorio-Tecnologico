'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FoldersSchema = new Schema({
    name        : String,
    creationDate  : {
        type      : Date,
        default   : Date.now
    },
    creator: {
        type      : Schema.Types.ObjectId,
        ref       : "User"
    },
    group: {
        type      : Schema.Types.ObjectId,
        ref       : "Group"
    }
})

module.exports = mongoose.model('Folder', FoldersSchema)
