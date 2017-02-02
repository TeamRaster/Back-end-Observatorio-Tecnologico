// Rutas en las que puede navegar el usuario sin registro, acceso bajo
'use strict'
// todo importar controlador
const express = require('express')
const router = express.Router()
const session = require('express-session')

// todo Cambiar por controladores de Query
const User = require('../models/modelUsers')

// Rutas de acceso
router.get('/', (req, res) => {
  res.render('index')
})

router.get('/user', function(req, res) {
    res.render('user', {user: req.user})
})

// todo separar el contenido de las rutas al controlador apropiado
router.get('/sign_in', (req, res) => {
  let error_message = req.flash('error')[0]
  res.locals.error_message = error_message
  res.render('sign_in', {error: res.locals.error_message})
})

// router.get('/sign_up', (req, res) => {
//   res.render('sign_up')
// })

router.get('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
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

router.get('/admin/users', (req, res) => {
  User.find()
    .then(function (users) {
      res.locals.users = users
      return res.render('getUsers', {users: res.locals.users})
    })
})

// Exportacion de las rutas
module.exports = router
