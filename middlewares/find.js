'use strict'

module.exports = (app) => {
    let User = app.models.modelUsers  // Manda a llamar el modelo de Usuarios
    let Publications = app.models.modelPublications  // Manda a llamar el modelo de Publicaciones
    let Groups = app.models.Groups  // Manda a llamar el modelo de Grupos
    let Folders = app.models.modelFolders  // Manda a llamar el modelo de Carpetas
    let Files = app.models.modelFiles  // Manda a llamar el modelo de Archivos
    let Conversations = app.models.modelConversations  // Manda a llamar el modelo de Conversaciones

    this.findUser = (req, res, next) => {
        User.findById(req.params.id, (err, storedUser) => {
            if(err) {
                console.log(`[Middleware.findUser]:: Ups! parece que hubo un error => ${err}`)
                req.flash('err', 'Error al encontrar al usuario')  // Guarda un mensaje de error
                res.redirect('/')  // Redirecciona y muestra el error
                return
            }
            // Esto es porque en ocaciones se realiza la peticion 2 veces y a la segunda el valor es nulo
            if (storedUser != null) {  // Si el valor obtenido no es nulo
                res.locals.user = storedUser  // Guarda el usuario en la variable local
                next()  // Ejecuta la proxima funcion
            } else {
                req.flash('err', 'No se han encontrado resultados')  // Guarda un mensaje de error
                res.redirect('/users')
            }
        })
    }

    this.example = (req, res, next) => {
        console.log('Middleware usado en getUser ')
        next()
    }

    this.findPublications = (req, res, next) => {}

    this.findGroups = (req, res, next) => {}

    this.findFolders = (req, res, next) => {}

    this.findFiles = (req, res, next) => {}

    this.findConversations = (req, res, next) => {}

    return this
}
