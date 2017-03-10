'use strict'

const fs = require('fs')
let multer = require('multer')
//
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/images/imagesUsers/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, 'imageUser-' + Date.now() + '.' + file.originalname.split('.').pop())
//     },
//     onError: function (error, next) {
//         console.log(error)
//         next(error)
//     }
// })
//
// var upload = multer({ storage: storage })
var upload = multer()

// function valid(req, res, next) {
//     if (req.body.email === 'baca') {
//         fs.unlink(req.file.path)
//         console.log('\nEste correo ya esta registrado, Sorry\n')
//         res.redirect('/')
//         return
//     } else {
//         console.log('\nWelcome\n')
//         next()
//     }
// }

module.exports = (app) => {
    app.get('/', (req, res) => {  // Ruta para la pagina incial de la aplicacion
        console.log(`\n[Routes./]: Sesion actual del usuario (req.user) es ${JSON.stringify(req.user)}`)
        res.render('index', {
            user: req.user,
            err: req.flash('err'),
            info: req.flash('info'),
            success: req.flash('success')
        })

        // if (req.session.passport != null && req.session.user === undefined) {  // Solo guarda una vez si no habia una sesion
        //     console.log(`\n[Routes./]: El valor de req.session.passport es ${JSON.stringify(req.session.passport)}\n`)
        //     req.session.user = req.session.passport.user  // Lo guardamos en la variable session
        //     console.log(`\n[Routes./]: Se ha creado una nueva sesion`)
        // }
        // res.locals.user = req.user
        // console.log(`\n[Routes./]: El valor de res.locals.user es ${res.locals.user}\n`)
        // res.render('./tests/multer')
    })

    // app.post('/upload', upload.single('multer'), valid, (req, res) => {
    app.post('/upload', upload.single('multer'), (req, res) => {
        // console.log(`\n[routes.uploadTest]: req.body => ${JSON.stringify(req.body)}`)
        // console.log(`\n[routes.uploadTest]: req.file => ${JSON.stringify(req.file)}`)
        // console.log(`\n[routes.uploadTest]: req.file => ${req.file.toString()}`)

        res.redirect('/')
    })

    return this
}
