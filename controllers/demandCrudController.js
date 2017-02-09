'use strict'

const Demand = require('../models/modelDemand')
const fs = require('fs')

module.exports = {

// CRUD Demanda =======================================================

    setNewDemanda: function (req, res) {
        let ext_ = req.files.image.name.split(".").pop()
        let newDemand = new Demand({
            business      : req.fields.business,
            image         : req.fields.image,
            ext           : ext_,
            description   : req.fields.description,
            category      : req.fields.category,
            contact       : 'id_contact', // todo Cuando este en funcionamiento, usar id de cada equema para relacionarlo
            creator       : 'id_creator'
        })

        newDemand.save().then((us) => {
            console.log('[Successful]: Demanda guardada')
            fs.rename(req.files.image.path, "public/images/imagesDemand" + newDemand._id + "." + ext_)  // Sube el archivo, le coloca un nombre
            res.redirect('/app/demandas/' + newDemand._id)  // Muestra la oferta individual
        }, (error) => {
            console.log(`[Error Save]: Demanda no almacenado ${error}`)
            res.send(err)
        })
    },
    getAllDemandas: function(req, res) {
        Demand.find({}), function (err, demandStored) {
            if(err) {
                console.log('Hubo un error al buscar todas las Demandas[demandCrudController]')
                res.send(err)
            }
            res.send(demandStored)
        }
    },
    getDemanda: function(req, res) {
        Demand.findById(req.params.id, function (err, demand) {
            if(err) {
                console.log('Hubo un error al buscar la demanda por id [demandCrudController]')
                res.send(err)
            }
            res.send(demand)
        })
    },
    updateDemandaById: function(req, res) {

    },
    removeDemandaById: function(req, res) {
        Demand.findOneAndRemove({_id: req.params.id}, function (err) {
            if (err) {
                console.log('Error al borrar la demanda')
                res.send(err)
            }
            res.send('Se borro exitosamente')
        })
    }

}
