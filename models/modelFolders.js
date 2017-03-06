'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = (app) => {
    const FoldersSchema = new Schema({
        name: String,
        creationDate: {
            type: Date,
            require: Date.now
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        group: {
            type: Schema.Types.ObjectId,
            ref: "Group"
        }
    })

    return mongoose.model('Folder', FoldersSchema)
}
