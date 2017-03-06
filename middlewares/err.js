'use strict'

module.exports = (app) => {
    this.errorHandler = (err, req, res, next) => {  // Middleware que detecta todos los errores
        console.error(err)
        res.status(500).render('./viewsErrors/error', { err: err })
    }

    return this
}
