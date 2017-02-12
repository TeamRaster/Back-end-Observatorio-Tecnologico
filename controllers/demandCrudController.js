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

        newDemand.save().then((Storeddemand) => {
            newDemand.image = newDemand._id  // Coloca de nombre, el id del registro que se hizo
            newDemand.save(function (err) {  // Volvemos a guardar el nombre de la imagen
                if (err) {
                    console.log('=========================================================')
                    console.log(`[DemandCrud/setNew]: Error demanda no almacenada ${err}`)
                    console.log('=========================================================')
                    res.redirect('/app/demands')
                }
            })
            fs.rename(req.files.image.path, "public/images/imagesDemands/" + newDemand._id + "." + ext_)  // Sube el archivo a la carpeta indicada
            console.log('[Successful]: Demanda guardada con exito')
            res.redirect('/app/demands')
        }, (error) => {
            console.log('=========================================================')
            console.log(`[DemandCrud/setNew]: Error demanda no almacenada ${error}`)
            console.log('=========================================================')
            res.redirect('/app/demands')  // En caso de que ocurra un error lo manda a imprimir
        })
    },


    getAllDemands: function(req, res) {
        Demand.find({}, function (err, demandStored) {
            if(err) {
                console.log('=========================================================')
                console.log(`[DemandCrud/getAll]: Error al buscar todas las demandas ${err}`)
                console.log('=========================================================')
                res.redirect('/app/demands')
            }
            res.render('./viewsUserPlus/demands/demandsAll', {demands: demandStored})
        })
    },


    getDemand: function(req, res) {
        Demand.findById(req.params.id, function (err, StoredDemand) {
            if(err) {
                console.log('=========================================================')
                console.log(`[DemandCrud/getDemand]: Error al buscar la demanda ${err}`)
                console.log('=========================================================')
                res.redirect('/app/demands')
            }
            res.render('./viewsUserPlus/demands/demand', {demand: StoredDemand})
        })
    },


    updateDemandById: function(req, res) {
        Demand.findById(req.params.id, function (err, StoredDemand) {
            if(err) {
                console.log('=========================================================')
                console.log(`[DemandCrud/update]: Error al buscar la demanda ${err}`)
                console.log('=========================================================')
                res.redirect('/app/demands')
            }
            StoredDemand.business    = req.fields.business
            StoredDemand.description = req.fields.description
            StoredDemand.category    = req.fields.category
            StoredDemand.save(function (err) {
                if (err) {
                    console.log('=========================================================')
                    console.log(`[DemandCrud/update]: Error al actualizar los datos ${err}`)
                    console.log('=========================================================')
                    res.redirect('/app/demands')
                }
                res.redirect('/app/demands')
            })
        })
    },


    deleteDemandById: function(req, res) {
        Demand.findOneAndRemove({_id: req.params.id}, function (err) {
            if (err) {
                console.log('=========================================================')
                console.log(`[DemandCrud/delete]: Error al eliminar los datos ${err}`)
                console.log('=========================================================')
                res.redirect('/app/demands')
            }
            res.redirect('/app/demands')
        })
    },
}
