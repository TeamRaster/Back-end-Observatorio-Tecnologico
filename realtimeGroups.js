'use strict'
// Lógica de socketIO   SERVER

module.exports = function(io, sessionMiddleware) {

    //console.log('midd '+ Object.keys(sessionMiddleware.session))

    const redis = require('redis')
    //const io = require("socket.io")(server) // server-> instancia de http  (no express)
    const client = redis.createClient()

////// Status de REDIS
    client.on("ready", function () {
        console.log("####  REDIS  is Ready ");
    });

    client.on("warning", function (warn) {
        console.log("################################## ");
        console.log("#### Warning  REDIS  " + warn);
        console.log("################################## ");
    });

    client.on("error", function (err) {
        console.log("################################## ");
        console.log("#### Error  REDIS  " + err);
        console.log("################################## ");
    });




    client.subscribe('groupRedis') // suscripcion al nombre del canal (viene de  ./newsCrudController )
    client.subscribe('58d1a19621b3e007f4230909_Redis') // suscripcion al nombre del canal (viene de  ./newsCrudController )


    io.use(function(socket, next){
    //    io.sockets.in('groupOne').emit('message', {message: 'se emitio un mesaje al grupo ' + 'ONE' })
        // console.log('middleware ')
        sessionMiddleware(socket.request, socket.request.res, next) // Socket configurada para compartir sesion con expresss
    })


/*
    io.sockets.on('connection', function(socket){ // evento socket conectada (cliente conectada)

        console.log('## [realtimeGroups.js ] Conexion  USERID Socket I  O ' + Object.keys(socket.request.session) );

        if (socket.request.session['passport'] != undefined) {
            console.log('TIPO  //' + typeof socket.request.session['passport']['user'] );

            var target = socket.request.session['passport']['user'] ;
            console.log( "Objetossssss ---------------------------");
            for (var k in target){
                if (typeof target[k] !== 'function') {
                    console.log("Key is " + k + ", value is" + target[k]);
                }
            }
        }

        //socket.request.session
        //console.log("sockett ", socket.request.session);
    })



    client.on('message', function (channel, message) { // cada vez que lleue un mensaje al canal
            if (channel == 'images') {
                io.emit('new notices', message) // envia a TODOS los canales debe coincidir 'new notices' en client.js
            }
            console.log("Se publico algo en el canal :: " + channel)
            console.log("Se publico algo  message " + message)  //mensaje que llegó
        })

       io.on('connection', function (socket) {
           console.log("sockett CONEXION**************** ")
           socket.on('event', function(){

           })
       })*/
       ////// ------------- Obtener  grupos/canales/rooms/suscripciones  del User--//


    let notif = {
        group: 'groupId' ,// groupId
        type: 'groupId' , //[ file/ message / post]
        message: 'groupId' ,
    }

    /******************Multiples canales ( GRUPOS  O chat privado ...)****************///////
    io.sockets.on('connection', function(socket){

        // console.log('##  [ realtimeGroups.js ] Conexion  SOCKET Group 1' + Object.keys(socket.request.session) );
        // console.log('##  [ realtimeGroups.js ] Conexion  SOCKET Group 2' , socket.Server ,'SOCKET');
        // console.log('##  [ realtimeGroups.js ] Conexion  SOCKET Group 3' ,  Object.keys(socket.request._query) ,'SOCKET');
        // console.log('##  [ realtimeGroups.js ] Conexion  SOCKET Group 4' ,  Object.keys(socket.request.client) ,'SOCKET');

        socket.on('subscribe', function(room){
            console.log("--------------------- Ha entrado al canal  room :", room )
            //io.sockets.in(room).emit(JSON.stringify({'message': 'nuevo miembro 7u7'})); TODO checar si es stringify client resis o socket
            socket.join(room)
        })
        console.log('##  [ realtimeGroups.js ] Conexion  SOCKET Group ' ,  Object.keys(socket.request.client.on) ,'SOCKET');

        socket.on('unsuscribe', function(room){
            console.log("Abandonando el canal   ", room);
            socket.leave(room);
        })

        socket.on('send', function(data){
            console.log("Enviando un mensajeee ", data);
            //io.sockets.in(data.room).emit('message', data); FIXME
            io.sockets.emit('message')
        })

        socket.on('sendDataGroup', function(room, data){
            console.log("Enviando un mensajeee ", room);
            console.log("Enviando un mensajeee ", data);
            io.sockets.in(room).emit('message', data);
            io.sockets.emit('message')
        })



        socket.on('disconnect', function() {
        // this returns a list of all rooms this user is in
            //var rooms = io.sockets.manager.roomClients[socket.id];
            /*for(var room in rooms) {
                socket.leave(room);
            }*/
        })

    })


    client.on('message', function (channel, message) { // cada vez que lleue un mensaje al canal groupRedis al cliente de redis  (channel)
            if (channel == 'groupRedis') { // canal grupo redis DB
                io.emit('groupSocketIO', message) // envia a TODOS los canales debe coincidir 'groupSocketIO' en client.js
            }

            if (channel == '58d1a19621b3e007f4230909_Redis') { // canal grupo redis DB
                console.log('emitir    ', JSON.stringify(message),  ' a  ', JSON.stringify(channel))
                io.emit('58d1a19621b3e007f4230909', message) // envia a TODOS los canales debe coincidir 'groupSocketIO' en client.js
            }
            console.log("Se publico algo en el canal :: " + channel)
            console.log("Se publico algo  message " + message)  //mensaje que llegó


           io.on('connection', function (socket) {
               console.log("sockett CONEXION**************** ")
               socket.on('event', function(){

               })
           })
        })



   ////
  /*var socket = io.connect();
  socket.on('message', function (data) {
   console.log(data);
  });


  $('#send').click(function() {
   var room = $('#room').val(),
    message = $('#message').val();

   socket.emit('send', { room: room, message: message });
  });*/




/***************Termina socket para grupos ****************************/



/*
///        console.log('USERID Socket IO //' + socket.request.session.user_id );
    // ========================= Esta parte es especial para el chat, no tocar ni moficar nada =========================
    let onlineUsers = {}
    let messages = [{
        id: 1,
        text: 'Bienvenido a la sala de conversacion',
        nickname: 'Servidor'
    }, {
        id: 2,
        text: 'Escribe un mensaje',
        nickname: 'Servidor'
    }]

    // Detecta a los usuarios que se conecten a la pagina
    io.sockets.on('connection', (socket) => {
        console.log('Conexion de usuario detectado ' + socket.handshake.address)
        socket.emit('messages', messages)  // Emite los mensajes que esten almacenados por defecto
    })

        socket.on('addNewMessage', (data) => {
            console.log('addNewMessage: ', data)
            // controllers.conversationController.
            messages.push(data)  // Agrega mensajes al arreglo para despues hacer uso de ellos
            io.sockets.emit('messages', messages)  // Vuelve a emitir los mensajes almacenados, junto con los recientemente agregados
        })

        // if (socket.request.session['passport'] != undefined) {
        //     console.log('TIPO  //' + typeof socket.request.session['passport']['user'] )
        //     var target = socket.request.session['passport']['user']
        //     console.log( "Objetossssss ---------------------------")
        //     for (var k in target){
        //         if (typeof target[k] !== 'function') {
        //              console.log("Key is " + k + ", value is" + target[k])
        //         }
        //     }
        // }
        // socket.request.session
        // console.log("sockett ")
///        console.log('USERID Socket IO //' + socket.request.session.user_id )
    //})
*/



}
