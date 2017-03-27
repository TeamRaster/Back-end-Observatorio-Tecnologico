'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = (app) => {
    const FoldersSchema = new Schema({
        name: String,
        creationDate:{
            type: Date,
            default: Date.now
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        group: {
            type: Schema.Types.ObjectId,
            ref: "Group"
        },
        photo: {
            type          : String,
            default       : ''
        },
        path              : String,
    })

    return mongoose.model('Folder', FoldersSchema)
}
