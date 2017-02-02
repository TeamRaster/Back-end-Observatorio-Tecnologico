// Validacion de quien es o no administrador
'use strict'

// Validacion para que solo administradores entren
function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.local.mode === 'Adminsitrador') return next()
    res.redirect('/')
}

module.exports = {
    isAdmin
}
