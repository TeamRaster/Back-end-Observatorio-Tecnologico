'use strict'

module.exports = (app) => {
    this.isLogged = (req, res, next) => {
        if (!req.user) {
            res.redirect('/accounts/signin')
        } else {
            res.locals.user = req.user
            next()
        }
    }

    this.isAdministrator = (req, res, next) => {
        if (req.isAuthenticated() && req.user.administrator) next()
        console.log('\n########### Ruta protegida y no estas eres administrador ###########')
        res.redirect('/')
    }

    return this
}

