'use strict'

module.exports = (app) => {
    this.isLogged = (req, res, next) => {
        if (!req.session.user) {
            res.redirect('/accounts/signin')
        } else {
            next()
        }
    }

    this.isAdministrator = (req, res, next) => {
        if (req.isAuthenticated() && req.session.user.administrator) next()
        console.log('Ruta protegida y no estas eres administrador')
        console.log('=========================================================')
        res.redirect('/')
    }

    return this
}

