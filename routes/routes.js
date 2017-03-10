'use strict'

module.exports = (app) => {
    app.get('/', (req, res) => {  // Ruta para la pagina incial de la aplicacion
        console.log(`\n[Routes./]: Sesion actual del usuario (req.user) es :: ${JSON.stringify(req.user)}`)
        res.render('index', {
            user: req.user,
            err: req.flash('err'),
            info: req.flash('info'),
            success: req.flash('success')
        })
    })

    return this
}
