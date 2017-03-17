'use strict' /// Solicitudes al grupo

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RequestsSchema = new Schema({
    description   : String,
    creationDate  : {
        type      : Date,
        require   : Date.now
    },
    user: [{
        type      : Schema.Types.ObjectId,
        ref       : "User"
    }],
    group: {
        type      : Schema.Types.ObjectId,
        ref       : "Group"
    },
    status: {
        type: String, enum: ['accepted', 'rejected']
    }

})

module.exports = mongoose.model('Request', RequestsSchema)
