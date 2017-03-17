'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FilesSchema = new Schema({
    name          : String,
    ext           : String,
    creationDate  : {
        type      : Date,
        default   : Date.now
    },
    author: {
        type      : Schema.Types.ObjectId,
        ref       : "User"
    },
    folder: {
        type      : Schema.Types.ObjectId,
        ref       : "Folder"
    },

})

module.exports = mongoose.model('File', FilesSchema)
