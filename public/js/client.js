var socket = io() // libreria socket para conectar con servidor socket

socket.on('new notices', function(data){
    console.log("client socket ");
    data = JSON.parse(data)
    console.log( " Cliente -------" + data);

    var container = document.querySelector('#noticiasCont')

    var source = document.querySelector('#newsTemplate').innerHTML; // id del script
    var templateScript = Handlebars.compile(source);  //templateScript handlebars compilando source

    //console.log("source " + source);
    //console.log(" template no compilado " + templateScript);
    console.log(" compilado str " + templateScript(data));


    console.log(container);
    container.innerHTML =   container.innerHTML + templateScript(data)

    //console.log(container + templateScript(data))
})


socket.on('message', function(data){
    console.log(" ########### DATA de socket ",     data);
})

socket.emit('send', {message: "message"})

/// Id del grupo


socket.emit('new notices', 'groupTwo')
socket.emit('images', 'groupTwo')
/*socket.emit('suscribe', 'groupOne')


$("#send").click(function() {
    room = document.getElementById('groupId').innerHTML
    message = "(client) se publico en el grupo " + room


    socket.emit('send', {room: room, message: message})
    console.log("(client) se publico en el grupo " + room);
})
*/

// 'use strict'
//
// var socket = io() // libreria socket para conectar con servidor socket
//
// socket.on('new notices', function(data){
//     data = JSON.parse(data)
//     console.log(data);
//
//
//     var container = document.querySelector('#noticiasCont').innerHTML;
//
//     console.log("siisi ");
//
//     var source = document.querySelector('#newsTemplate').innerHTML; // id del script
//
//     var templateScript = Handlebars.compile(container);  //templateScript handlebars compilando source
//
//     console.log("source " + source);
//     console.log(" template no compilado " + templateScript);
//     console.log(" compilado str " + templateScript(data));
//
//
//     container.innerHTML = container.innerHTML + templateScript(data)
//
//
//
// })
