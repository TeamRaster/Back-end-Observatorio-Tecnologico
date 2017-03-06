'use strict'

module.exports = (app) => {
    app.get('/', (req, res) => {  // Ruta para la pagina incial de la aplicacion
        console.log('Sesion actual del usuario => ' + req.session.user)
        if (req.session.passport != null && req.session.user === undefined) {  // Solo guarda una vez si no habia una sesion
            console.log('[routes/index]: Se ha creado un nueva sesion')
            req.session.user = req.session.passport.user  // Lo guardamos en la variable session
        }
        res.locals.user = req.session.user  // Es igual  a pasar por parametro {user: req.session.user}
        res.render('index', {
            err: req.flash('error'),
            info: req.flash('info'),
            success: req.flash('success')
        })
    })

    return this
}
