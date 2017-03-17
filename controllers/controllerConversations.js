// 'use strict'
//
// const models = require('../models')
// const redis = require('redis')
// const clientRoom = redis.createClient()
// clientRoom.subscribe('room')
//
// // Cliente con redis, que esten suscritos al canal
// // clientRoom.on("message", (channel, message) => {
// //     console.log('Llegooooooooooooo')
// //     console.log(message)
// //     // console.log(JSON.parse(message))
// //     // let _len = message.length
// //     // for (let i = 0; i <= _len; i++) {
// //     //     console.log(message[i])
// //     // }
// // })
//
// module.exports = {
//     setMessage: (req, res) => {
//         console.log(req.session.user)
//         res.send('setMessage')
//     },
//     getMessages: (req, res) => {
//
//     },
//     getCoversation: (req, res) => {
//
//     },
//     getViewGroup: (req, res) => {
//         return res.render('viewsUserPlus/rooms/new')
//     },
//     setGroup: (req, res) => {
//         res.locals.group = req.fields.group
//         // console.log(res.locals.group_id)
//         // res.send()
//         res.redirect('/app/room/' + req.fields.group + '/chat')
//     },
//     setMembers: (req, res) => {
//     //
//     },
//     getChat: (req, res) => {
//         return res.render('viewsUserPlus/rooms/index', {grupo: res.locals.group})
//     },
// }
