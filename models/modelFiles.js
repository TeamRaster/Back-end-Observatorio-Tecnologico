'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema


module.exports = (app) => {
    const FilesSchema = new Schema({
        ext: String,
        name: String,
        creationDate: {
            type: Date,
            default: Date.now
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        folder: {
            type: Schema.Types.ObjectId,
            ref: "Folder"
        },

    })

    return mongoose.model('File', FilesSchema)
}
