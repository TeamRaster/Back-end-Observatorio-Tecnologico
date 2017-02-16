'use strict'

const Demand = require('../models/modelDemand')
const fs = require('fs')

module.exports = {
    setDemand: (req, res) => {
        let ext_ = req.files.image.name.split(".").pop()
        let newDemand = new Demand({
            business      : req.fields.business,
            ext           : ext_,
            description   : req.fields.description,
            category      : req.fields.category,
            // contact       : 'id_contact', // todo Cuando este en funcionamiento, usar id de cada equema para relacionarlo
            // creator       : 'id_creator'
        })

        newDemand.save( err => {
            if (err) {
                console.log('=========================================================')
                console.log(`[DemandCrud/setNew]: Error demanda no almacenada ${err}`)
                console.log('=========================================================')
                res.redirect('/app/demands')
            }
            fs.rename(req.files.image.path, "public/images/imagesDemands/" + newDemand._id + "." + ext_)
            console.log('[Successful]: Demanda guardada con exito')
            res.redirect('/app/demands')
        })
    },


    getDemands: (req, res) => {
        Demand.find({}, (err, demandStored) => {
            if(err) {
                console.log('=========================================================')
                console.log(`[DemandCrud/getAll]: Error al buscar todas las demandas ${err}`)
                console.log('=========================================================')
                res.redirect('/app/demands')
            }
            res.render('./viewsUserPlus/demands/index', {demands: demandStored})
        })
    },


    getDemand: (req, res) => {
        Demand.findById(req.params.id, (err, StoredDemand) => {
            if(err) {
                console.log('=========================================================')
                console.log(`[DemandCrud/getDemand]: Error al buscar la demanda ${err}`)
                console.log('=========================================================')
                res.redirect('/app/demands')
            }
            res.render('./viewsUserPlus/demands/view', {demand: StoredDemand})
        })
    },


    updateDemand: (req, res) => {
        Demand.findById(req.params.id, (err, StoredDemand) => {
            if(err) {
                console.log('=========================================================')
                console.log(`[DemandCrud/update]: Error al buscar la demanda ${err}`)
                console.log('=========================================================')
                res.redirect('/app/demands')
            }
            StoredDemand.business    = req.fields.business
            StoredDemand.description = req.fields.description
            StoredDemand.category    = req.fields.category

            if (req.files.image.name != "") {
                let ext_ = req.files.image.name.split(".").pop()
                fs.unlink("public/images/imagesDemands/" + StoredDemand.image)
                fs.rename(req.files.image.path, "public/images/imagesDemands/" + StoredDemand._id + "." + ext_)
            }

            StoredDemand.save( err => {
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


    deleteDemand: (req, res) => {
        Demand.findOneAndRemove({_id: req.params.id},  (err, StoredDemand) => {
            if (err) {
                console.log('=========================================================')
                console.log(`[DemandCrud/delete]: Error al eliminar los datos ${err}`)
                console.log('=========================================================')
                res.redirect('/app/demands')
            }
            fs.unlink("public/images/imagesDemands/" + StoredDemand.image)
            res.redirect('/app/demands')
        })
    },
}
