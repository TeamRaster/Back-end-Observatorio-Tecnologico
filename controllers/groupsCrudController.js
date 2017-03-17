    'use strict'

const Group = require('../models/modelGroups')
const User = require('../models/modelUsers')

const fs = require('fs')

const redis = require('redis')
const client = redis.createClient()

const io = require('socket.io-client');
const serverUrl = 'http://localhost:3000';
const conn = io.connect(serverUrl);


module.exports = {
    setGroup: (req, res) => {
        ///let ext_ = req.files.image.name.split(".").pop()
        let newGroup = new Group({

            title      : req.fields.title,
            description   : req.fields.description,
            //creator      : 'id_creator',
            // contact       : 'id_contact', // todo usar id de cada equema para relacionarlo
            // creator       : 'id_creator'
        })

        newGroup.save(err => {
            if (err) {
                console.log(`  Error group no almacenada ${err}`)
                res.redirect('/app/groups')
            }
            //fs.rename(req.files.image.path, "public/images/imagesGroup/" + newGroup._id + "." + ext_)
            console.log('[Successfull]  Grupo CREADOO  con exito')
            res.redirect('/app/groups')
            //res.status(200).send({newGroup: newGroup})
        })
    },


    getGroups: (req, res) => {

        Group.find({}, (err, storedGroups) => {
            if(err) {
                console.log(`  Error al buscar todo grupo ${err}`)
                res.redirect('/app/groups')
            }

            res.render('./viewsUserPlus/groups/index', {groups: storedGroups})
        })
    },


    getGroup: (req, res) => {

        //let groupId
        let usersST = {}
        User.find({}, (err, storedUsers) => { // Obtener usuarios para agregr grupos TODO de momento son todos ...
            if(err) {
                console.log('=========================================================')
                console.log(`[groupsCrud/getGroups]: Error al recuperar todos los usuarios guardados ${err}`)
                console.log('=========================================================')
            }
            usersST = storedUsers
        })


        Group.findById(req.params.id, (err, storedGroup) => {

            if(err) {
                console.log(`[getGrouP]   Error al buscar  group ${err}`)
                res.redirect('/app/groups')
            }

            let adminsPopulate = {
                                    path: "members", // miembros
                                    //match: {isAdmin: {$in: [false] } }  // condicion  Admin como true
                                }

            User.populate(storedGroup, adminsPopulate, (err, storedGroup) => {

                if(err) {
                    console.log(`[getGrouP]   Error al buscar  group ${err}`)
                }
                //res.status(200).send(storedGroup);
                console.log("/////// Group ----- " + storedGroup +" ------------");
                let room = "ROOM !!!!1";
                let message = "Emitido al room  !!!!1";
                /*
                let myObj   = client; //{myFn : function() {}, tamato: true};
                let allKeys = Object.keys(myObj);
                console.log("--------------------------KEY---------------------------");
                console.log(allKeys);

                let fnKeys  = allKeys.filter(key => typeof myObj[key] == 'function');
                console.log("--------------------------KEY---------------------------");
                console.log(fnKeys);
                console.log("--------------------------KEY---------------------------");
                */
                ///client.in(room).emit('message', { room: room, message: message });
                ///client.sockets.in(room).emit('new msg to client', data)
                console.log(Object.keys(storedGroup), '--------------- ');
                message = {
                    message: "Se publico en el canal  CTRLR "  + storedGroup['_id'],
                }

                //client.subscribe(storedGroup['_id'].toString())  //// // TODO     NO vaaqui

                client.publish(storedGroup['_id'].toString(), JSON.stringify(message) ) //  descomen

                res.render('./viewsUserPlus/groups/view', {group: storedGroup,  users: usersST})
            });
        })

    },


    notiToGroup: (req, res) => { // notify to group // validar: isMemberGroup
        //let groupId = req.params.groupId
        console.log(Object.keys(req.fields))
        let message = req.fields.groupMessage


        //console.log('****************** grupo', groupId);
        console.log('****************mensaje del input', message);

        //client.publish(groupId.toString(), JSON.stringify(message) ) //  descomen
        res.status(200).send({message: message})
        //res.end('{"success" : "Updated Successfully", "status" : 200}')
/*
        Group.findById(groupId, (err, storedGroup) => {

            client.publish(storedGroup['_id'].toString(), JSON.stringify(message) ) //  descomen

            if(err) {
                console.log(`[notiToGroup]   Error al buscar  group ${err}`)
                res.redirect('/app/groups')
            }

            let adminsPopulate = {
                                    path: "members", // miembros
                                    //match: {isAdmin: {$in: [false] } }  // condicion  Admin como true
                                 }

            User.populate(storedGroup, adminsPopulate, (err, storedGroup) => {

                if(err) {
                    console.log(`[getGrouP]   Error al buscar  group ${err}`)
                }
                //res.status(200).send(storedGroup);
                console.log("/////// Group ----- " + storedGroup +" ------------");
                let room = "ROOM !!!!1";
                let message = "Emitido al room  !!!!1";

                console.log(Object.keys(storedGroup), '--------------- ');
                message = {
                    message: "Se publico en el canal  CTRLR "  + storedGroup['_id'],
                }

                //client.subscribe(storedGroup['_id'].toString())  //// // TODO     NO vaaqui
                client.publish(storedGroup['_id'].toString(), JSON.stringify(message) ) //  descomen

                res.render('./viewsUserPlus/groups/view', {group: storedGroup,  users: usersST})
            });
        })*/

    },


    updateGroup: (req, res) => {

        Group.findById(req.params.id, (err, storedGroup) => {
            if(err) {
                console.log(`  Error al buscar el g     rupo ${err}`)
                res.redirect('/app/groups')
            }
            storedGroup.business    = req.fields.business
            storedGroup.description = req.fields.description
            storedGroup.category    = req.fields.category

            if (req.files.image.name != "") {
                let ext_ = req.files.image.name.split(".").pop()
                /*fs.unlink("public/images/imagesGroup/" + storedGroup.image)
                fs.rename(req.files.image.path, "public/images/imagesGroup/" + storedGroup.image)*/
            }

            storedGroup.save(err => {
                if (err) {
                    console.log(`  Error al actualizar los datos ${err}`)
                    res.redirect('/app/groups')
                }
                res.redirect('/app/groups')
            })
        })
    },


    deleteGroup: (req, res) => {
        Group.findOneAndRemove({_id: req.params.id}, (err, storedGroup) => {
            if (err) {
                console.log(`  Error al eliminar los datos ${err}`)
                res.redirect('/app/groups')
            }
            //fs.unlink("public/images/imagesGroup/" + storedGroup.image)
            res.redirect('/app/groups')
        })
    },


    /*/**************Operacion es sobre miembros y Requests */////////////
    addMemberToGroup: (req, res) => {
        console.log(req.params.groupId +"------------------------------");
        console.log(req.params.userId +"------------------------------");
        let groupId = req.params.groupId;
        let userId = req.params.userId;
        let update = req.fields;

        Group.findOneAndUpdate(
            { _id: groupId },
            { $push: { members: {user: userId} } }, // addToSet allow insert only if same element in the array !exist

            /*{ $push: {  // Datos a Actualizar
                 requests: {sendBy: userId},
                 comment: comment }
            },*/

            //{upsert: true}, /// crea el elemento ... si no existe

            function(err, groupUpdated) {
                if (err) {
                  return res.status(500).send({message: 'Error en DateB ' + err});
                }
                console.log("______________________________________________________");
                console.log(" Miembro gregado al grupos   --",groupUpdated);
                return res.status(200).send({group: groupUpdated});
            });
            ///    res.redirect('/app/groups')
    },

    deleteMemberFromGroup: (req, res) => {
        console.log(req.params.groupId +"------------------------------");
        console.log(req.params.userId +"------------------------------");
        let groupId = req.params.groupId;
        let userId = req.params.userId;
        //let user = req.session.passport.user
        //let userId = user['_id']

        /*if (dataUserGroup.isAdmin(req) == 0 ) {
            return res.status(401).send({message: 'No eres administrador del grupo' + err});
        }*/

        Group.update(
            { _id: groupId },
            { $pull: { 'members': {user: userId} } },
            //{ $unset: { 'members.user': {$in: userId} } },

            function(err, groupUpdated) {
                if (err) {
                  return res.status(500).send({message: 'Error en DB ' + err});
                }
                  return res.status(200).send({group: groupUpdated});
            }
        );

    },

    sendRequest: (req, res) => { // solicitud oara pertenecer al grupo
        let groupId = req.params.groupId
        let user = req.session.passport.user
        let userId = '';
        let comment = req.params.comment

            if (user != undefined){
                console.log(Object.keys(req.session) + "sess ")
                console.log(user['_id'])
                userId = user['_id']
            }
            else {
                res.redirect('/accounts/signin')
            }

        console.log("---------------------Solicitud a grupo  ", groupId, userId);

        Group.count({ '_id': groupId, 'requests.sendBy': {$in: userId} },  (err, countRequestToGroup) => { // TODO posible error -> validar si existe el grupo

            console.log("countRequestToGroupttttttttt ", countRequestToGroup);
            if (countRequestToGroup == 0) { // NO envió solicitud al grupo antes !
                Group.findOneAndUpdate(
                    //{ '_id': groupId, 'requests.sendBy': {$in: userId}}, // condiciones
                    { '_id': groupId}, // condiciones
                    { $push: {  // Datos a Actualizar
                         requests: {sendBy: userId},
                         comment: comment }
                    },
                    function(err, groupUpdated) {
                        if (err) {
                          return res.status(500).send({message: 'Error en DB groupMemberFound Update ' + err});
                        }
                        return res.status(200).send({group: groupUpdated});
                    }
                )
            } else{ // fin if existe el grupo
                return res.status(200).send({message : "Ya ha enviado una solicitua al grupo"});
            }

        })


    },

    getMyGroups: (req, res) => { // REtorna los grupos en los que esta el userId
        //let userId = req.params.userId
        //let userId = req.session.passport.user['_id']
        let userId = '589964c107519107147d5be1'

        console.log("Grupos con userid  ##### ", userId);

        let memberConditions =  {
                                    'members.user': userId,
                                }

        Group.find(memberConditions, (err, myGroups) => {

        /*    User.populate(myGroups, adminsPopulate, (err, myGroups) => {
                if(err) {
                    console.log(`getGroupS   Error al buscar  group ${err}`)
                }
                res.status(200).send(myGroups);

                console.log("/////// Group Admins  ----- " + myGroups +" ------------");
                //res.render('./viewsUserPlus/groups/view', {group: myGroups})
            });*/

            res.status(200).send(myGroups);

            if(err) {
                console.log(`getMyGroups   Error al buscar  group ${err}`)
                res.redirect('/app/groups')
            }

        })
    },

    getGroupAdmins: (req, res) => {
        let groupId = req.params.groupId

        Group.findById(groupId, (err, storedGroup) => {
            let adminsPopulate = {
                                    path: "members", // miembros
                                    match: {isAdmin: {$in: [true] } }  // condicion  Admin como true
                                }

            User.populate(storedGroup, adminsPopulate, (err, storedGroup) => {
                if(err) {
                    console.log(`getGroup   Error al buscar  group ${err}`)
                }
                //res.status(200).send(storedGroup);
                console.log("/////// Group Admins  ----- " + storedGroup +" ------------");
                res.render('./viewsUserPlus/groups/view', {group: storedGroup})
            });

            if(err) {
                console.log(`getGroupAdmins   Error al buscar  group ${err}`)
                res.redirect('/app/groups')
            }

        })

    },

    isMemberGroup:(req, res, next) => { // middleware saber si es miembro del grupo
            let groupId = req.params.groupId
            let user = req.session.passport.user
            console.log("isMemberGroup_______________________________________",groupId, " ", user, "_______________________-")
            let userId = user['_id']
            console.log(user['_id']+"########################")

            Group.find({'_id': groupId, 'members.user': {$in: userId} },  (err, storedGroup) => {// FIXME
                if(err) {
                    console.log(`[isMemberGroup]   Error al buscar  group ${err}`)
                    return false
                    //res.redirect('/app/groups')
                }

                if (storedGroup) {
                    return next()
                    //return true
                }
            })
            console.log({status: 401, message: "No es MIEMBRO de este grupo : Ah ah ah "})
            return false
            //return res.status(401).send({message: "No es admin de este grupo :3 Ah ah ah "});
        //}
    },


    isAdmin:(req, res, next) => { // middleware saber si es admin del grupo
            let groupId = req.params.groupId
            let user = req.session.passport.user // TODO req.user serialize
            console.log("ISADMIN_______________________________________",groupId, " ", user, "_______________________-")
            let userId = user['_id']
            console.log(user['_id']+"########################")

            let adminConditions = {
                '_id': groupId,
                'members.user':  userId,
                'members.isAdmin':  true,
            }

            Group.find(adminConditions,  (err, storedGroup) => {
                if(err) {
                    console.log(`[isAdmin]   Error al buscar  group ${err}`)
                    return false
                    //res.redirect('/app/groups')
                }

                if (storedGroup.length != 0) {
                    console.log('ADMIN GROUP --------------------------------', Object.keys(storedGroup));
                    return next()
                    //return true
                }
            })
            console.log({status: 401, message: "[groupsCrudController.isAdmin] No es admin de este grupo :3 Ah ah ah "})
            return false
            //return res.status(401).send({message: "No es admin de este grupo :3 Ah ah ah "});
        //}
    },

    addAdminToGroup: (req, res) => { // Agregar admins al grupo TODO(Solo admins del grupo)
        let groupId = req.params.groupId
        //let user = req.session.passport.user
        let userId = req.params.userId;
        let comment = req.params.comment

        /*if (user != undefined){
            console.log(Object.keys(req.session) + "sess ")
            console.log(user['_id'])
            userId = user['_id']
        }
        else {
            res.redirect('/accounts/signin')
        }*/

        console.log("---------------------Agregado ADMIN a grupo  ", groupId, userId);
        /*let adminsPopulate = {
            path: "members", // miembros
            match: {isAdmin: {$in: [true] } }  // condicion  Admin como true
        }*/

        //$inc incrementar un campo: {campo: nVecesUm}
        Group.findOneAndUpdate(
            { '_id': groupId,  'members.user':  userId },// condiciones
            { $set: {
                 'members.$.isAdmin': 'true' ,
              }
            },

            function(err, groupUpdated) {
                if (err) {
                  return res.status(500).send({message: 'Error en DB ' + err});
                }
                return res.status(200).send({group: groupUpdated});
            }
        );

    },

    deleteAdminFromGroup: (req, res) => { // Eliminar admins al grupo TODO(Solo admins del grupo) Solo el fundaddor ???
        let groupId = req.params.groupId
        //let user = req.session.passport.user
        let userId = req.params.userId
        //let comment = req.params.comment

        /*if (user != undefined){
            console.log(Object.keys(req.session) + "sess ")
            console.log(user['_id'])
            userId = user['_id']
        }
        else {
            res.redirect('/accounts/signin')
        }*/

        console.log("---------------------Eliminar admin del grupo  ", groupId, userId);

        Group.findOneAndUpdate(
            { '_id': groupId,  'members.user':  userId },// condiciones
            { $set: {
                 'members.$.isAdmin': 'false' ,
              }
            },

            function(err, groupUpdated) {
                if (err) {
                  return res.status(500).send({message: 'Error en DB ' + err});
                }
                return res.status(200).send({group: groupUpdated});
            }
        );

    },
    // TODO Eliminar o marcar como atendida la solicitud
    replyRequest: (req, res) => { // REspoder solicitud para pertenecer al gru TODO(Solo admins del grupo)
        let groupId = req.params.groupId
        let user = req.session.passport.user
        let userId = '';
        let comment = req.params.comment

            if (user != undefined){
                console.log(Object.keys(req.session) + "sess ")
                console.log(user['_id'])
                userId = user['_id']
            }
            else {
                res.redirect('/accounts/signin')
            }

        console.log("---------------------Solicitud a grupo  ", groupId, userId);

        Group.update(
            { _id: groupId },
            { $push: {
                 requests: {sendBy: userId},
                 comment: comment }
            },

            function(err, groupUpdated) {
                if (err) {
                  return res.status(500).send({message: 'Error en DB ' + err});
                }
            return res.status(200).send({group: groupUpdated});
            }
        );

    },

}
