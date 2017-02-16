'use strict'

// Validacion para que los usuarios no puedan entrar a paginas sin autenticarse
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next()
    console.log('Ruta protegida y no estas autenticado')
    console.log('=========================================================')
    res.redirect('/')
}

function isAdministrator(req, res, next) {
    if (req.isAuthenticated() && req.user.mode === 'Administrador') return next()
    console.log('Ruta protegida y no estas eres administrador')
    console.log('=========================================================')
    res.redirect('/')
}

module.exports = {
    isLoggedIn,
    isAdministrator
}
