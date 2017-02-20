'use strict'

const models = require('../models')

module.exports = {
    setMessage: (req, res) => {

    },
    getMessages: (req, res) => {

    },
    getCoversation: (req, res) => {

    },
    getViewGroup: (req, res) => {
        return res.render('viewsUserPlus/rooms/new')
    },
    setGroup: (req, res) => {
        console.log(req.fields.group)
        res.locals.group_id = req.fields.group
        console.log(res.locals.group_id)
        // res.send()
        res.redirect('/app/room/' + req.fields.group + '/chat')
    },
    setMembers: (req, res) => {
    //
    },
    getChat: (req, res) => {
        return res.render('viewsUserPlus/rooms/index', {user: req.session.user})
    },
}
