'use strict'

// Validacion para que los usuarios no puedan entrar a paginas sin autenticarse
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.redirect('/')
}

function isAdministrator(req, res, next) {
    if (req.isAuthenticated() && req.user.mode === 'Administrador') return next()
    res.redirect('/')
}

module.exports = {
    isLoggedIn,
    isAdministrator
}
