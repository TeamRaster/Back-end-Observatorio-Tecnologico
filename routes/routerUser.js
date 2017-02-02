'use strict'

const express = require('express')
const router = express.Router()

// todo Cambiar por controladores de Query
const User = require('../models/modelUsers')
const usersControllers = require('../controllers/usersControllers')

router.get('/', (req, res) => {
    usersControllers.getIndex(req, res)
})
router.get('/sign_in', (req, res) => {
    usersControllers.getSingIn(req, res)
})
router.get('/sign_up', (req, res) => {
    usersControllers.getSingUp(req, res)
})

// Inicio y cierre de sesion
router.get('/login', (req, res) => {
    usersControllers.getLogIn(req, res)
})
router.get('/logout', (req, res) => {
    usersControllers.getLogOut(req, res)
})


// Rutas habilitadas solo en desarrollo
router.get('/users', (req, res) => {
    User.find()
    .then(function (users) {
        res.locals.users = users
        return res.render('getUsers', {users: res.locals.users})
    })
})
// // Registro de usuarios localmente
// router.post('/newUser', (req, res) => {
//   let user = new User({
//     'local.email': req.body.username,
//     'local.password': req.body.password
//   })
//   // todo mostrar el error
//   user.save().then((us) => {
//     console.log('[Successful]: Usuario guardado')
//     res.redirect('/')
//   }, (error) => {
//     console.log('[Error Save]: Usuario no almacenado')
//     res.redirect('/sign_up')
//   })
// })
//
// router.post('/newSession', (req, res) => {
//   User.findOne({
//       'local.email'    : req.body.username,
//       'local.password' : req.body.password
//     },
//     function (err, user) {
//       // TODO Refactorizar esta parte! Agregar validaciones
//       if (err) {
//         console.log(String(err))
//         return
//       }
//       req.session.user_id = user._id
//       res.redirect('/')
//     })
// })


// Exportacion de las rutas
module.exports = router
