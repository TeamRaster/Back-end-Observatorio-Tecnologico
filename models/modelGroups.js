'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = (app) => {
    const GroupsSchema = new Schema({
        name: String,
        description: String,
        creationDate: {
            type: Date,
            require: Date.now
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        /**/

    })

    return mongoose.model('Group', GroupsSchema)
}
