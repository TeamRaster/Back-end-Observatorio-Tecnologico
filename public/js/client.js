<<<<<<< HEAD
var socket = io() // libreria socket para conectar con servidor socket

socket.on('new notices', function(data){
    data = JSON.parse(data)
    console.log(data);


    var container = document.querySelector('#noticiasCont')

    console.log("siisi ");

    var source = document.querySelector('#newsTemplate').innerHTML; // id del script
    var templateScript = Handlebars.compile(source);  //templateScript handlebars compilando source

    //console.log("source " + source);
    //console.log(" template no compilado " + templateScript);
    console.log(" compilado str " + templateScript(data));


    console.log(container);
    container.innerHTML =   container.innerHTML + templateScript(data)

    //console.log(container + templateScript(data))

})
=======
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
>>>>>>> abf96eeed7fc8d943dce9bfacf3ae13c8752225d
