'use strict'
// Lógica de socketIO  y redis  SERVER

module.exports = (io, sessionMiddleware) => {

    //console.log('midd '+ Object.keys(sessionMiddleware.session))

    const redis = require('redis')
    //const io = require("socket.io")(server) // server-> instancia de http  (no express)
    const client = redis.createClient()

////// Status de REDIS
    client.on("ready", function () {
        //console.log("####  REDIS  is Ready ");
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


    //client.subscribe('groupRedis') // suscripcion al nombre del canal (viene de  ./controllerGroups )
    //client.subscribe('subscriptions') // suscripcion al nombre del canal (viene de  ./controllerGroups )
    //client.subscribe('58d1a19621b3e007f4230909_Redis') // suscripcion al nombre del canal (viene de  ./controllerGroups )

    //client.subscribe('58d1a19621b3e007f4230909') // suscripcion al nombre del canal (viene de  ./controllerGroups )


    io.use(function(socket, next){
    //    io.sockets.in('groupOne').emit('message', {message: 'se emitio un mesaje al grupo ' + 'ONE' })
        sessionMiddleware(socket.request, socket.request.res, next) // Socket configurada para compartir sesion con expresss
    })


    var rooms = ["room_one", "room_two", "room_three", "room_four", "room_five"];

    var message = []
    var messages = []
    var storeMessage = (room, message) => { // Guardar mensajes en redis y emitir al room
    	client.lpush(room, message, function (err, res) {
    		client.ltrim(room, 0, 9); // solo 10 mensajes por room  TODO aumentar
    	});
    	io.sockets.in(room).emit("displayMessage", message);
    }

    var emitMessages = (room, socket) => {
    	client.lrange(room, 0, -1, function(err, messages){
    		messages = messages.reverse();
    		messages.forEach(function( ) {
    			socket.emit("displayMessage", message);
    		});
    	});
    }




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


    io.sockets.on("connection", function (socket) {
    	var self = this;

    	socket.join("room_one");

    	emitMessages("room_one", socket);

    	socket.on("chatMessage", function(data){
    	  storeMssage(data[0], data[1]); // funcion gfrardar y emitir mensaje data[room, message ]
    	});

        // mostrar todos los mensajes
    	for (var i = 0; i < rooms.length; i++) {
    		var room = rooms[i];
    		var join_event = "join_" + room;
    		socket.on(join_event, function(rooms){
    			//socket.leave(rooms[0]); // Abandonar un room
    			socket.join(rooms[1]);
    			socket.emit("clear_room"); // eliminar mensajes grupo anterior (html cliente)
    			emitMessages(rooms[1], socket);
    		});
    	}

    });



    /******************Multiples canales ( GRUPOS  O chat privado ...)****************///////
/*
    io.sockets.on('connection', function(socket){

        // console.log('##  [ realtimeGroups.js ] Conexion  SOCKET Group 1' + Object.keys(socket.request.session) );
        // console.log('##  [ realtimeGroups.js ] Conexion  SOCKET Group 2' , socket.Server ,'SOCKET');
        // console.log('##  [ realtimeGroups.js ] Conexion  SOCKET Group 3' ,  Object.keys(socket.request._query) ,'SOCKET');
        // console.log('##  [ realtimeGroups.js ] Conexion  SOCKET Group 4' ,  Object.keys(socket.request.client) ,'SOCKET');

        socket.on('subscribe', function(room){
            console.log("--------------------- Ha entrado al canal  room :", room )
            io.sockets.in(room).emit(JSON.stringify({'message': 'nuevo miembro 7u7'})); ///TODO checar si es stringify client resis o socket
            socket.join(room)
        })
        console.log('##  [ realtimeGroups.js ] Conexion  SOCKET Group ' ,  Object.keys(socket.request.client.on) ,'SOCKET');

        socket.on('unsuscribe', function(room){
            console.log("Abandonando el canal   ", room);
            socket.leave(room);
        })

        socket.on('send', function(data){
            // console.log("Enviando un mensajeee ", data);
            //io.sockets.in(data.room).emit('message', data); FIXME
            io.sockets.emit('message')
        })
        */

/*        socket.on('sendDataGroup', function(data){

            console.log("(sendDataGroup) Enviando un mensajeee a room: ", data.room);
            console.log("(sendDataGroup) Enviando un mensajeee :", data.message);
            io.sockets.in(data.room).emit(data.message);
            io.sockets.to(data.room).emit({message: data.message});

            io.sockets.emit('message')
        })
*/


/*        socket.on('disconnect', function() {
        // this returns a list of all rooms this user is in
            //var rooms = io.sockets.manager.roomClients[socket.id];
            // for(var room in rooms) {
            //     socket.leave(room);
            // }
        })

    })*/

/*<<<<<<< HEAD
=======
   io.on('connection', function (socket) {
    //    console.log("sockett CONEXION**************** ")
       socket.on('event', function(){
>>>>>>> 79bbc2073df8eddd2d124d4f8deadb015442290e*/
                // TODO  room en el message
    client.on('message', function (channel, message) { // cada vez que lleue un mensaje al canal groupRedis al cliente de redis  (channel)

        console.log(message);
        console.log(typeof message);

        //message = JSON.parse(message)
        console.log(message);

            if (channel == 'groupRedis') { // canal grupo redis DB
                console.log("groupRedis  mesage ", message);
                console.log("data message ", message);
                io.emit('groupSocketIO', message) // envia a TODOS los canales debe coincidir 'groupSocketIO' en client.js

                /*console.log("DATA Channel ROOM: ", message['room'], "Message  ", message['message']) // envia a TODOS los canales debe coincidir 'groupSocketIO' en client.js
                io.emit(message['room'], message['message']) // envia a TODOS los canales debe coincidir 'groupSocketIO' en client.js*/

                console.log("DATA Channel ROOM: ", message, "Message  ", message) // envia a TODOS los canales debe coincidir 'groupSocketIO' en client.js
                io.emit(message, message) // envia a TODOS los canales debe coincidir 'groupSocketIO' en client.js
            }


            if (channel == 'subscriptions') { // canal grupo redis DB
                console.log("NEW subscriptions to : ", message)
                client.subscribe(message) // channel to subscribe
            }



            if (channel == '58d1a19621b3e007f4230909_Redis') { // canal grupo redis DB room / message
                //console.log(message, '???????????');
                //console.log(Object.keys(message), '???????????');

                message = JSON.parse(message)

                console.log(Object.keys(message), "######################")

                console.log("-************************")
                console.log("ROOOOMM ", message['room'])
                console.log(typeof (message))

                console.log('emitir    ', (message['message']),  ' a  ', (message['room']))

                io.emit(message['room'], message['message']) // envia a TODOS los canales debe coincidir room '58d1a19621b3e007f4230909_Redis' en client.js

                //io.in(message['room']).emit( message['message']);

                //client.sockets.in(room).emit('new msg to client', data)
            }

            //    io.emit('58d1a19621b3e007f4230909', message) // envia a TODOS los canales debe coincidir 'groupSocketIO' en client.js

            console.log("Se publico algo en el canal :: " + channel)
            console.log("Se publico algo  message " + message)  //mensaje que llegó


           io.on('connection', function (socket) {
               console.log("sockett CONEXION**************** IO ")
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
