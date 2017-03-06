'use strict'

const redis = require('redis')
var sub = redis.createClient()
var pub = redis.createClient()
sub.subscribe('chat')

let onlineUsers = {}

module.exports = function(io, sessionMiddleware) {
    // const client = redis.createClient()
    // client.subscribe('images') // suscripcion al nombre del canal (viene de  ./newsCrudController )

    io.use(function(socket, next){
        sessionMiddleware(socket.request, socket.request.res, next) // Socket configurada para compartir sesion con expresss
    })

    let messages = {
        msg  : 'Bienvenido a la sala de conversacion de este grupo',
        user : 'Servidor',
        type : 'information'
    }

    io.on('connection', (socket) => {  // Detecta a los usuarios que se conecten a la pagina

        // console.log('USERID Socket IO //' + Object.keys(socket.request.session))

        if (socket.request.session['passport'] != undefined) {
            // console.log('TIPO  //' + typeof socket.request.session['passport']['user'])
            var target = socket.request.session['passport']['user']
            // console.log("Objetossssss ---------------------------")
            // for (var k in target) {
            //     if (typeof target[k] !== 'function') {
            //         console.log("Key is " + k + ", value is" + target[k])
            //     }
            // }
        }

        socket.request.session
        // console.log("sockett ")

        socket.on('chat', (data) => {
            console.log('Nuevo mensaje recibido en el servidor')
            console.log('realtime----------------')
            console.log(socket.request.session)
            console.log(socket.request.session['passport']['user'])
            let req = JSON.parse(data)
            let res = JSON.stringify({
                msg: req.msg,
                user: socket.request.session['passport']['user']['username'],
                type: req.type,
                // session : socket.request.session['passport']['user']['username']
            })
            console.log(res)
            pub.publish('chat', res)
        })

        // Nuevo usuario conecatado al canal
        // socket.on('join', () => {
        //     let res = JSON.stringify({
        //         msg  : ' se ha conectado',
        //         user : 'Nasaaa',
        //         type : 'information'
        //     })
        //     console.dir(res)
        //     pub.publish('chat', res)
        // })

        sub.on('message', function (channel, message) {
            console.log('channel 60')
            console.log(channel)
            console.log('message 63')
            console.log(message)
            socket.emit(channel, message)
        })

    }) // Cierre de la conexion


//callback para la suscripcion del canal 'message'
//     client.on('message', function (channel, message) { // cada vez que lleue un mensaje al canal
//         if (channel == 'images') {
//             io.emit('new notices', message) // envia a TODOS los canales debe coincidir 'new notices' en client.js
//         }
//         console.log("Se publico algo en el canal :: " + channel)
//         console.log("Se publico algo en el message " + message) // mensaje que llegó
//     })

/*    io.on('connection', function (socket) {
        console.log("sockett ")
        socket.on('event', function(){

        })
    })*/




} // Cierre de Exports














/*sio.sockets.on("connection", function(socket) {
  socket.request.session // Now it's available from Socket.IO sockets too! Win!
  console.log(socket.request.session) // Now it's available from Socket.IO sockets too! Win!
})*/

/*sio.sockets.on('connection', function(socket){ // evento socket conectada (cliente conectada)
    //socket.request.session // Now it's available from Socket.IO sockets too! Win!

    console.log("sockett ")
        console.log('USERID Socket IO //' + socket.request.session.user_id )
        console.log('USERID Socket IO //' + Object.keys(socket.request.session) )

        if (socket.request.session['passport'] != undefined) {
        console.log('TIPO  //' + typeof socket.request.session['passport']['user'] )
        var target = socket.request.session['passport']['user']
        console.log( "Objetossssss ---------------------------")
            for (var k in target){
        if (typeof target[k] !== 'function') {
             console.log("Key is " + k + ", value is" + target[k])
        }
    }
}


        console.log('USERID Socket IO //' + (socket.request.session)['cookie']['httpOnly'] )
        console.log('USERID Socket IO //' + Object.keys(socket.request.session['cookie'] ))

})*/
