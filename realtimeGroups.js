'use strict'
// Lógica de sockets IO

module.exports = function(server, sessionMiddleware) {
    //console.log('server '+ server)
    //console.log('midd '+ Object.keys(sessionMiddleware.session))

    const redis = require('redis')

    const io = require("socket.io")(server) // server-> instancia de http  (no express)
    const client = redis.createClient()

    //client.subscribe('images') // suscripcion al del canal (viene de  ./newsCrudController )
    client.subscribe('images') // suscripcion al del canal (viene de  ./newsCrudController )

    io.use(function(socket, next){
    //    io.sockets.in('groupOne').emit('message', {message: 'se emitio un mesaje al grupo ' + 'ONE' })
        // console.log('middleware ')
        sessionMiddleware(socket.request, socket.request.res, next) // Socket configurada para compartir sesion con expresss
    })




/*
    io.sockets.on('connection', function(socket){ // evento socket conectada (cliente conectada)

        console.log('## [realtimeSocket.js ] Conexion  USERID Socket I  O ' + Object.keys(socket.request.session) );

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



    /******************Multiples canales ( GRUPOS  O chat privado ...)****************///////
    io.sockets.on('connection', function(socket){

        console.log('## [realtimeSocket.js ] Conexion  SOCKET Group ' + Object.keys(socket.request.session) );

        socket.on('subscribe', function(room){
            console.log("--------------------- Ha entrado al canal  room :", room )
            socket.join(room)
        })

        socket.on('unsuscribe', function(room){
            console.log("Abandonando el canal   ", room);
            socket.leave(room);
        })

        socket.on('send', function(data){
            console.log("Enviando un mensajeee ", data);
            //io.sockets.in(data.room).emit('message', data); FIXME
            io.sockets.emit('message')
        })

    })


////////////////////  PArte cliente
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
   })

   ////
  /*var socket = io.connect();
  socket.on('message', function (data) {
   console.log(data);
  });

  socket.emit('subscribe', 'roomOne');
  socket.emit('subscribe', 'roomTwo');

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
    //callback para la suscripcion del canal 'message'
/*     client.on('message', function (channel, message) { // cada vez que lleue un mensaje al canal
         if (channel == 'images') {
             io.emit('new notices', message) // envia a TODOS los canales debe coincidir 'new notices' en client.js
         }
         console.log("Se publico algo en el canal :: " + channel)
         console.log("Se publico algo en el message " + message)  //mensaje que llegó
     })

    io.on('connection', function (socket) {
        console.log("sockett CONEXION**************** ")
        socket.on('event', function(){

        })
    })*/




}
