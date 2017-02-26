'use strict'


module.exports = {
    isLogged: (req, res, next) => {
        if (req.session.user) {
            // res.locals.user = req.session.user
            next()
        }
        else res.redirect('/accounts/signin')
    },

    isAdministrator: (req, res, next) => {
        if (req.isAuthenticated() && req.user.mode === 'Administrador') next()
        console.log('Ruta protegida y no estas eres administrador')
        console.log('=========================================================')
        res.redirect('/')
    },
}

