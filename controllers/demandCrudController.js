'use strict'

const Demand = require('../models/modelDemand')
const fs = require('fs')

module.exports = {

// CRUD Demanda =======================================================

    setNewDemanda: function (req, res) {
        let ext_ = req.files.image.name.split(".").pop()
        let newDemand = new Demand({
            business      : req.fields.business,
            ext           : ext_,
            description   : req.fields.description,
            category      : req.fields.category,
            // contact       : 'id_contact', // todo Cuando este en funcionamiento, usar id de cada equema para relacionarlo
            // creator       : 'id_creator'
        })

        newDemand.save().then((offer) => {
            newDemand.image = newDemand._id  // Coloca de nombre, el id del registro que se hizo
            newDemand.save(function (err) {  // Volvemos a guardar el nombre de la imagen
                if (err) res.send(err)
            })
            fs.rename(req.files.image.path, "public/images/imagesDemands/" + newDemand._id + "." + ext_)  // Sube el archivo a la carpeta indicada
            console.log('[Successful]: Oferta guardada con exito')
            res.send(offer)  // Por el momento solo muestra la oferta en json para ver que efectivamente se ha subido
        }, (error) => {
            console.log(`[Error Save]: Oferta no almacenada ${error}`)
            res.send(err)  // En caso de que ocurra un error lo manda a imprimir
        })
    },


    getAllDemandas: function(req, res) {
        Demand.find({}, function (err, demandStored) {
            if(err) {
                console.log('Hubo un error al buscar todas las Demandas[demandCrudController]')
                res.send(err)
            }
            res.render('./viewsUserPlus/demands/demandsAll', {demands: demandStored})
        })
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
        Demand.findById(req.params.id, function (err, demand) {
            if(err) {
                console.log('Hubo un error al buscar oferta por id [demandCrudController]')
                res.send(err)
            }
            demand.business    = req.fields.business
            demand.description = req.fields.description
            demand.category    = req.fields.category
            demand.save(function (err) {
                if (err) res.send(err)
                res.send(demand)
            })
        })
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
