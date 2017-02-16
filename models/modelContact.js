'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContactSchema = new Schema({
    phone        : {
        type     : Number,
        maxlength : [10, "[Phone]: Maximo 10 caracteres"],
    },
    address      : {
        type     : String,
        lowercase : true,
        trim      : true
    },
    emailContact : {
        type     : String,
        lowercase : true,
        trim      : true
    },
    linkFacebook : String,
    linkTwitter  : String,
    linkLinkedin : String,
    author: {
        type     : Schema.Types.ObjectId,
        ref      : "User"
    }
})

module.exports = mongoose.model('Contact', ContactSchema)

