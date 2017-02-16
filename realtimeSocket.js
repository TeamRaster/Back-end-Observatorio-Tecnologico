//'use strict'

// Lógica de sockets IO
module.exports = function(server, sessionMiddleware){
    //console.log('server '+ server);
    //console.log('midd '+ Object.keys(sessionMiddleware.session));

    const io = require("socket.io")(server) // server-> instancia de http  (no express)
    const redis = require('redis')
    const client = redis.createClient()

    client.subscribe('images') // suscripcion al nombre del canal (viene de  ./newsCrudController )

    io.use(function(socket, next){
        console.log('middleware ');
        sessionMiddleware(socket.request, socket.request.res, next) // Socket configurada para compartir sesion con expresss

        // small adapter
    })

    io.sockets.on('connection', function(socket){ // evento socket conectada (cliente conectada)

        console.log('USERID Socket IO //' + Object.keys(socket.request.session) );


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

        socket.request.session
        console.log("sockett ");
///        console.log('USERID Socket IO //' + socket.request.session.user_id );
    })

//callback para la suscripcion del canal 'message'
    client.on('message', function (channel, message) { // cada vez que lleue un mensaje al canal
        if (channel == 'images') {
            io.emit('new notices', message) // envia a TODOS los canales debe coincidir 'new notices' en client.js
        }
        console.log("Se publico algo en el canal :: " + channel);
        console.log("Se publico algo en el message " + message); // mensaje que llegó
    })

/*    io.on('connection', function (socket) {
        console.log("sockett ");
        socket.on('event', function(){

        });
    });*/

}














/*sio.sockets.on("connection", function(socket) {
  socket.request.session // Now it's available from Socket.IO sockets too! Win!
  console.log(socket.request.session) // Now it's available from Socket.IO sockets too! Win!
});*/

/*sio.sockets.on('connection', function(socket){ // evento socket conectada (cliente conectada)
    //socket.request.session // Now it's available from Socket.IO sockets too! Win!

    console.log("sockett ");
        console.log('USERID Socket IO //' + socket.request.session.user_id );
        console.log('USERID Socket IO //' + Object.keys(socket.request.session) );

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


        console.log('USERID Socket IO //' + (socket.request.session)['cookie']['httpOnly'] );
        console.log('USERID Socket IO //' + Object.keys(socket.request.session['cookie'] ));

})*/
