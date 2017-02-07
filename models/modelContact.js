'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContactSchema = new Schema({
    telefono     : String,
    direccion    : String,
    correo       : String,
    linkFacebook : String,
    linkTwitter  : String,
    linkLinkedin : String,
    creator: {
        type      : Schema.Types.ObjectId,
        ref       : "User"
    }
})

module.exports = mongoose.model('Contact', ContactSchema)

