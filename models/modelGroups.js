'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = (app) => {
    const GroupsSchema = new Schema({
        title        : String,
        description   : String,
        creationDate  : {
            type      : Date,
            default   : Date.now
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        members: [{
            user: {type      : Schema.Types.ObjectId,
                   ref       : "User"},
            isAdmin   : {type: Boolean, default: false},
            date:  { type: Date, default: Date.now }
        }],
        type:  { type: String, enum: ["public", "private"] },

        requests: [{ // solicitudes al grupo
            sendBy:{
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            comment: {type: String, default: 'Me gustaría ser parte de su grupo'},
            date:  { type: Date, default: Date.now }
        }],
    })

    return mongoose.model('Group', GroupsSchema)
}
