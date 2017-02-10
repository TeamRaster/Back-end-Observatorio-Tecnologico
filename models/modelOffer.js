'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OfferSchema = new Schema({
    business      : String,
    ext           : {
        type      : String,
        default   : 'jpg'
    },
    image         : {
        type      : String,
        default   : 'No disponible'
    },
    description   : String,
    category      : String,
    creationOffer : {
        type      : Date,
        require   : Date.now
    },
    // contact: {
    //     type      : Schema.Types.ObjectId,
    //     ref       : "Contact"
    // },
    // creator: {
    //     type      : Schema.Types.ObjectId,
    //     ref       : "User"
    // }
})

// OfferSchema.pre('save', function (next) {
//     let newOffer = this
//     // Detecta cuando se cambia la contraseña con el hash
//     if (!newOffer.isModified('image')) {
//         console.log('Image no tiene nombre')
//         return next()
//     } else {
//         console.log(`Se ha establecido un nombre a la imagen: ${newOffer._id}`)
//     }
//
//     // Hace uso de la funcion
//     this.renameImage(newOffer._id, function (err, name) {
//         if (err) return next(err)
//         newOffer.image = name
//         next()
//     })
// })
//
// OfferSchema.methods.renameImage = function (newName, cb) {
//     return cb(null, newName)
// }

module.exports = mongoose.model('Offer', OfferSchema)
