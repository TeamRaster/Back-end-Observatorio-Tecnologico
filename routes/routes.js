'use strict'

module.exports = (app) => {
    // app.get('*', (req, res, next) => { // Cualquier ruta por GET que no este declarada utilizaria esta ruta
    //     let err = new Error()
    //     err.status = 404
    //     next(err)
    // })

    // app.post('*', (req, res, next) => { // Cualquier ruta por POST que no este declarada utilizaria esta ruta
    //     let err = new Error()
    //     err.status = 404
    //     next(err)
    // })

    app.get('/', (req, res) => {  // Ruta para la pagina incial de la aplicacion
        if (req.user)
            console.log(`\n[Routes./]: Sesion actual del usuario (req.user) es :: ${JSON.stringify(req.user.id)} Nombre: ${JSON.stringify(req.user.username)} Email: ${req.user.local.email}`)
        else
            console.log(`\n[Routes./]: Sesion actual del usuario (req.user) es :: ${JSON.stringify(req.user)}`)
        res.render('index', {
            user    : req.user,
            err     : req.flash('err'),
            warning : req.flash('warning'),
            info    : req.flash('info'),
            success : req.flash('success')
        })
    })

    return this
}
