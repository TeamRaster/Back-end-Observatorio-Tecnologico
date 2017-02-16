'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FilesSchema = new Schema({
    name        : String,
    creationDate  : {
        type      : Date,
        require   : Date.now
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

module.exports = mongoose.model('Folder', FolsersSchema)
