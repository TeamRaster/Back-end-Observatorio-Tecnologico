'use strict'

const modelUsers = require('../models/modelUsers')
const consultasController = require('../controllers/consultasController')

module.exports = {

// CRUD Users =======================================================
    setNewUser: function(req, res) {
        consultasController.setUser(req, res)
    },
    getAllUsers: function(req, res) {

    },
    getUser: function(req, res) {

    },
    updateUser: function(req, res) {

    },
    removeUser: function(req, res) {

    }
}
