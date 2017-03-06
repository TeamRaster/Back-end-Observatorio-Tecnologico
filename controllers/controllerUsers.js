'use strict'

const fs = require('fs')  // Modulo para el manejo de archivos, crear, mover, eliminar, renombrar etc
const moment = require('moment')  // Modulo para el manejo de el tiempo por formato configurable format('MMMM Do YYYY')

module.exports = (app) => {
    const User = app.models.modelUsers  // Manda a llamar el modelo de Usuarios
    let redirect = '/users'  // Variable para redireccionar a la ruta

// Registro del usuario ================================================================================================
    this.setUser = (req, res) => {  // Funcion para agregar un usuario
        let ext_ = req.files.photo.name.split(".").pop()  // Extension del archivo
        let user = new User({
            username      : req.fields.username,
            email         : req.fields.email,
            password      : req.fields.password,
            administrator : req.fields.options === "true" ? true : false,
            ext           : ext_,
        })

        user.creationDate.hour = moment().format('LT')  // Ingresa el formato de la hora
        user.creationDate.date = moment().format('L')  // Ingresa el formato de la fecha

        user.save( err => {  // Guardar el nuevo usuario creado
            if (err) {
                console.log(`[ControllerUser.setUser]: Ups! parece que hubo un error => ${err}`)
                req.flash('err', '[Servidor]: Ups! parece que hubo un error')  // Mensaje de error
                return res.redirect('/accounts/signup')
            }
            fs.rename(req.files.photo.path, "public/images/imagesUsers/" + user._id + "." + ext_)  // Mueve y renombra el archivo
            console.log('[Servidor]: Usuario guardado con exito')
            req.flash('info', '[Servidor]: Los datos se han guardado con exito')
            return res.redirect(redirect)  // todo Modificar en produccion
        })
    }


    this.getUsers = (req, res) => {  // Funcion para obtener los usuarios
        res.locals.user = req.session.user
        User.find({}, (err, storedUsers) => {  // Deveulve todos los datos de la tabla usuarios
            if(err) {
                req.flash('err', '[Servidor]: Ups! parece que hubo un error en la base datos, codigo: GUS.CU')  // Guarda un error
                res.redirect(redirect)  // Redirecciona y muestra el error
                return
            }
            // Renderiza los posibles mensajes que le puede llegar a la vista
            res.render('./viewsAdministrator/users/index', {
                users  : storedUsers,
                err    : req.flash('err'),
                info   : req.flash('info'),
                success: req.flash('success')
            })
        })
    }


    this.getUser = (req, res) => {  // Funcion para obtener un usuario
        // La busqueda del usuario es por un middleware en la ruta
        res.render('./viewsUserPlus/users/view')
    }


    this.updateUser = (req, res) => {  // Funcion para actualizar un usuario
        res.locals.user.username  = req.fields.username
        res.locals.user.email     = req.fields.email
        if(req.fields.password != "") {
            res.locals.user.password  = req.fields.password  // Actualizacion solo si escribio una nueva contraseña
        } else if (req.files.photo.name != "") {  // Actualizacion de foto de perfil solo si coloca una nueva
            fs.unlink("public/images/imagesUsers/" + res.locals.user.photo)  // Elimina el archivo anterior
            fs.rename(req.files.photo.path, "public/images/imagesUsers/" + res.locals.user.photo)  // Renombra el archivo nuevo y lo almacena
        }
        // Actuliza la informacion de contacto para hacer ofertas y demandas
        res.locals.user.contactInformation.phone     = req.fields.phone
        res.locals.user.contactInformation.address   = req.fields.address
        res.locals.user.contactInformation.facebook  = req.fields.facebook
        res.locals.user.contactInformation.twitter   = req.fields.twitter
        res.locals.user.contactInformation.linkedin  = req.fields.linkedin
        // Registra hora y fecha de la ultima actualizacion
        res.locals.user.updateDate.hour = moment().format('LT')
        res.locals.user.updateDate.date = moment().format('L')
        // Guarda los cambios actualizados
        res.locals.user.save(err => {
            if (err) {
                console.log(`[ControllerUser.updateUser]: Ups! parece que hubo un error => ${err}`)  // Guarda un mensaje de error solo si existe
                req.flash('err', '[Servidor]: Ups! parece que hubo un error, codigo: UU.CU')  // Guarda un mensaje de error solo si existe
            }
            res.redirect('/users')
        })
    }


    this.deleteUser = (req, res) => {  // Funcion para eliminar a un usuario
        User.findOneAndRemove({_id: req.params.id}, (err, storedUser) => {
            if (err) {
                req.flash('err', '[Servidor]: Ups! parece que hubo un error, codigo: DU.CU')  // Guarda un mensaje de error
                res.redirect(redirect)
                return
            }
            // Si encuentra la imagen, la borra, y asi evita un error si no existe o esta dañada
            fs.stat('public/images/imagesUsers/' + storedUser.photo, (err, stats) => {
                if (err) {
                    req.flash('info', 'No fue posible eliminar el archivo fotografia')
                    throw err
                } else if(stats.isFile()) {
                    console.log(`stats: ${JSON.stringify(stats)}`)
                    fs.unlink("public/images/imagesUsers/" + storedUser.photo)  // Elimina los datos creados con el usuario
                }
            })
            res.redirect(redirect)
        })
    }

// Contacto(Completar el registro del usuario) =========================================================================
    this.setContact = (req, res) => {  // Funcion para agregar los datos de contacto
        // User.findById(req.params.id, (err, storedUser) => {
        //     if(err) {
        //         req.flash('err', '[Servidor]: Ups! parece que hubo un error, codigo: SC.CU')  // Guarda un mensaje de error solo si existe
        //         res.redirect(redirect)
        //         return
        //     }
        //     storedUser.contactInformation.phone     = req.fields.phone
        //     storedUser.contactInformation.address   = req.fields.address
        //     storedUser.contactInformation.facebook  = req.fields.facebook
        //     storedUser.contactInformation.twitter   = req.fields.twitter
        //     storedUser.contactInformation.linkedin  = req.fields.linkedin
        //     storedUser.save(err => {
        //         if (err) {
        //             req.flash('err', '[Servidor]: Ups! parece que hubo un error, codigo: SC.CU')  // Guarda un mensaje de error solo si existe
        //         }
        //         res.redirect(redirect)
        //     })
        // })
    }

// Contacto(Completar el registro del usuario) =========================================================================
    this.setScore = (req, res, data) => {  // Establece una nueva puntuacion a una publicacion
        User.findById(req.params.id, (err, storedUser) => {
            if(err) {
                req.flash('error', `[controllerUser/setScore]: Error al encontrar al usuario por id ${err}`)  // Guarda un mensaje de error solo si existe
                res.redirect(redirect)
            }

            storedUser.contactInformation.dataUser.push({  // Guarda los valores de la puntuacion y la publicacion a la que se califico
                publications : data.publications,
                type         : data.type,
            })

            storedUser.save(err => {
                if (err) {
                    req.flash('error', `[controllerUser/setScore]: Error al guardar el usuario ${err}`)  // Guarda un mensaje de error solo si existe
                }
                res.redirect(redirect)
            })
        })
    }


    this.getScores = (req, res) => {  // Obtiene el historial del puntuaciones realizadas a las publicaciones

    }


    this.updateScore = (req, res, data) => {  // Actualiza la puntuacion realizada a una publicacion
        User.findById(req.params.id, (err, storedUser) => {
            if(err) {
                req.flash('error', `[controllerUser/updateScore]: Error al encontrar al usuario por id ${err}`)  // Guarda un mensaje de error solo si existe
                res.redirect(redirect)
            }

            storedUser.contactInformation.dataUser.push({  // Guarda los valores de la puntuacion y la publicacion a la que se califico
                type : data.type,
            })

            storedUser.save(err => {
                if (err) {
                    req.flash('error', `[controllerUser/updateScore]: Error al guardar el usuario ${err}`)  // Guarda un mensaje de error solo si existe
                }
                res.redirect(redirect)
            })
        })
    }

// Formularios para hacer las imagenes =================================================================================
    this.getViewUserNew = (req, res) => {  // Pagina para agregar un nuevo usuario
        return res.render('viewsAdministrator/users/new')
    }


    this.getViewUserEdit = (req, res) => {  // Pagina para editar un usuario
        res.render('viewsUserPlus/users/update')
    }


    return this
}
