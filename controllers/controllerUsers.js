'use strict'

const fs = require('fs')  // Modulo para el manejo de archivos, crear, mover, eliminar, renombrar etc
    , moment = require('moment')  // Modulo para el tiempo

module.exports = (app) => {
    const User = app.models.modelUsers  // Manda a llamar el modelo de Usuarios
    let redirect = '/users'  // Variable para redireccionar a la ruta

// Registro del usuario ================================================================================================
    this.setUser = (req, res) => {  // Funcion para agregar un usuario
        console.log(`\n[ControllerUsers.setUser]: ${JSON.stringify(req.body)}`)
        console.log(`\n[ControllerUsers.setUser]: ${JSON.stringify(req.file)}`)
        let user = new User()
            user.username       = req.body.username,
            user.local.email    = req.body.email,
            user.local.password = req.body.password,
            user.administrator  = req.body.options === "true" ? true : false,
            user.photo          = req.file.filename,
            user.path           = req.file.destination,

        user.creationDate.hour = moment().format('LT')  // Ingresa el formato de la hora
        user.creationDate.date = moment().format('L')  // Ingresa el formato de la fecha

        user.save( err => {  // Guardar el nuevo usuario creado
            if (!err) {
                console.log('\n[ControllerUser.setUser]: Usuario guardado con exito')
                req.flash('info', '[Servidor]: Los datos se han guardado con exito')
                return
            } else {
                console.log(`\n[ControllerUser.setUser]: Ups! parece que hubo un error => ${err}`)
                req.flash('err', '[Servidor]: Ups! parece que hubo un error')  // Mensaje de error
                return
            }

            if (res.locals.user.administrator)
                res.redirect('/users/new')
            else
                res.redirect('/accounts/signup')
        })
    }

    this.getUser = (req, res) => {  // Funcion para obtener un usuario
        // La busqueda del usuario es por un middleware en la ruta
        res.render('./viewsUserPlus/users/view', {
            err     : req.flash('err'),
            warning : req.flash('warning'),
            info    : req.flash('info'),
            success : req.flash('success')
        })
    }

    this.getUsers = (req, res) => {  // Funcion para obtener los usuarios
        User.find({}, (err, storedUsers) => {  // Devuelve todos los datos de la tabla usuarios
            if (!err) {
                // Renderiza los posibles mensajes que le puede llegar a la vista
                res.render('./viewsAdministrator/users/index', {
                    users   : storedUsers,
                    err     : req.flash('err'),
                    warning : req.flash('warning'),
                    info    : req.flash('info'),
                    success : req.flash('success')
                })
            } else {
                console.log(`\n[ControllerUser.getUsers]: Ups! parece que hubo un error => ${err}`)
                req.flash('err', '[Servidor]: Ups! parece que hubo un error en la base datos, codigo: GUS.CU')  // Guarda un error
                res.redirect(redirect)  // Redirecciona y muestra el error
            }
        })
    }

    this.updateUser = (req, res) => {  // Funcion para actualizar un usuario
        res.locals.storedUser.username  = req.body.username
        res.locals.storedUser.local.email     = req.body.email
        if(req.body.password != "") {
            res.locals.storedUser.local.password  = req.body.password  // Actualizacion solo si escribio una nueva contraseña
        } else if (req.file != "" && req.file != undefined) {  // Actualizacion de foto de perfil solo si coloca una nueva
            console.log(`\n[ControllerUser.updateUser]: req.file: ${req.file}`)
            fs.unlink(req.file.path)  // Elimina el archivo anterior
            res.locals.storedUser.photo = req.file.filename
        }
        // Actualiza la informacion de contacto para hacer ofertas y demandas
        res.locals.storedUser.contactInformation.phone     = req.body.phone
        res.locals.storedUser.contactInformation.address   = req.body.address
        res.locals.storedUser.contactInformation.facebook  = req.body.facebook
        res.locals.storedUser.contactInformation.twitter   = req.body.twitter
        res.locals.storedUser.contactInformation.linkedin  = req.body.linkedin
        // Registra hora y fecha de la ultima actualizacion
        res.locals.storedUser.updateDate.hour = moment().format('LT')
        res.locals.storedUser.updateDate.date = moment().format('L')
        // Guarda los cambios actualizados
        res.locals.storedUser.save(err => {
            if (err) {
                console.log(`\n[ControllerUser.updateUser]: Ups! parece que hubo un error => ${err}`)  // Guarda un mensaje de error solo si existe
                req.flash('err', '[Servidor]: Ups! parece que hubo un error, codigo: UU.CU')  // Guarda un mensaje de error solo si existe
                return
            }
            res.redirect('/users')
        })
    }

    this.deleteUser = (req, res) => {  // Funcion para eliminar a un usuario
        User.findOneAndRemove({_id: req.params.id}, (err, storedUser) => {
            if (!err) {
                // Si encuentra la imagen, la borra, y asi evita un error si no existe o esta dañada
                fs.stat('public/images/imagesUsers/' + storedUser.photo, (err, stats) => {
                    if (err) {
                        console.log(`\n[ControllerUsers.deleteUser]: Ups. parece que hubo un error ${err}`)
                        req.flash('info', 'No fue posible eliminar el archivo fotografia')
                        return
                    } else if(stats.isFile()) {
                        console.log(`\n[ControllerUsers.deleteUser]: stats => ${JSON.stringify(stats)}`)
                        fs.unlink("public/images/imagesUsers/" + storedUser.photo)  // Elimina los datos creados con el usuario
                    }
                })
            } else {
                req.flash('err', '[Servidor]: Ups! parece que hubo un error, codigo: DU.CU')  // Guarda un mensaje de error
                return
            }

            if (!res.locals.user.administrator) {  // Si el usuario logeado actualmente no es administrador, cierra sesion
                res.redirect('/accounts/logout')
            } else {
                res.redirect(redirect)
            }
        })
    }

// Contacto(Completar el registro del usuario) =========================================================================
    this.setContact = (req, res) => {  // Funcion para agregar los datos de contacto
        res.locals.user.contactInformation.phone     = req.body.phone
        res.locals.user.contactInformation.address   = req.body.address
        res.locals.user.contactInformation.facebook  = req.body.facebook
        res.locals.user.contactInformation.twitter   = req.body.twitter
        res.locals.user.contactInformation.linkedin  = req.body.linkedin
        // Registra hora y fecha de la ultima actualizacion
        res.locals.user.updateDate.hour = moment().format('LT')
        res.locals.user.updateDate.date = moment().format('L')
        // Guarda los cambios actualizados
        res.locals.user.save(err => {
            if (err) {
                console.log(`\n[ControllerUser.setContact]: Ups! parece que hubo un error => ${err}`)  // Guarda un mensaje de error solo si existe
                req.flash('err', '[Servidor]: Ups! parece que hubo un error, codigo: SC.CU')  // Guarda un mensaje de error solo si existe
                return
            }
            res.redirect('/users')
        })
    }

// Contacto(Completar el registro del usuario) =========================================================================
    this.setScore = (req, res, data) => {  // Establece una nueva puntuacion a una publicacion
        res.locals.storedUser.history.dataUser.push({
            // publications : ,
            // type         : ,
        })
        res.locals.storedUser.save(err => {
            if (err) {
                console.log(`\n[ControllerUser.setScore]: Ups! parece que hubo un error => ${err}`)  // Guarda un mensaje de error solo si existe
                req.flash('err', '[Servidor]: Ups! parece que hubo un error, codigo: SS.CU')  // Guarda un mensaje de error solo si existe
                return
            }
            res.redirect('/users')
        })
    }


    this.getScores = (req, res) => {  // Obtiene el historial del puntuaciones realizadas a las publicaciones

    }


    this.updateScore = (req, res, data) => {  // Actualiza la puntuacion realizada a una publicacion

    }

// Formularios para hacer las imagenes =================================================================================
    this.getViewUserNew = (req, res) => {  // Pagina para agregar un nuevo usuario
        return res.render('viewsAdministrator/users/new', {
            user    : req.user,
            err     : req.flash('err'),
            warning : req.flash('warning'),
            info    : req.flash('info'),
            success : req.flash('success')
        })
    }

    this.getViewUserEdit = (req, res) => {  // Pagina para editar un usuario
        res.render('viewsUserPlus/users/update', {
            user    : req.user,
            err     : req.flash('err'),
            warning : req.flash('warning'),
            info    : req.flash('info'),
            success : req.flash('success')
        })
    }

    this.getViewUsercontact = (req, res) => {  // Pagina para editar un usuario
        res.render('viewsUserPlus/users/newContact', {
            user    : req.user,
            err     : req.flash('err'),
            warning : req.flash('warning'),
            info    : req.flash('info'),
            success : req.flash('success')
        })
    }


    return this
}
