    //var socket = io //.connect('http://localhost') // libreria socket para conectar con servidor socket

let serverUri = 'http://localhost:3000/'
//var socket = io.connect();
var socket = io();


/*socket.on('connect', function(data) {
       socket.emit('join', 'Hello World from client');
   });
*/
/* */
/*socket.on('notiToGroup', function(data){
    console.log("client socket ")

    console.log( " Cliente -------" + data);
    data = JSON.parse(data)
})
*/

/*socket.on('groupSocketIO', function(data){ // canal por cada grupo !
    console.log("client socket ");
    data = JSON.parse(data)
    console.log( " Cliente -------" + data);

})*/



socket.on('58d1a19621b3e007f4230909', function(data){ // canal por cada grupo !
    console.log("client socket  58d1a19621b3e007f4230909");
    data = JSON.parse(data)
    console.log( " Cliente ------- 58d1a19621b3e007f4230909" + data);

})

socket.emit('subscribe', "GRUPO generico   groups[i].toString()")

socket.emit('sendDataGroup', {mesage: "Mensaje para el grupo  EXCLUSIVOOO "})

socket.on('message', function(data){
    console.log(" ########### DATA de socket ",     data);
})


 /*socket.emit('subscribe', 'roomOne');
 socket.emit('subscribe', 'roomTwo');*/
// socket.emit('new notices', 'groupTwo')


 //// TODO
 //socket.emit('subscribe', '58d1a19621b3e007f4230909');

var room = '58d1a19621b3e007f4230909'
var message = 'Mensaje desde el cliente de l grupp   58d1a19621b3e007f4230909'


socket.emit('groupSocketIO', 'groupTwo')

var BASE_URL = "http://localhost:3000"



$('#sendMessage').click(function() {

    console.log("Ajaxxxxxxxxxxxxxxxxxxxxxxx ");
    socket.emit('58d1a19621b3e007f4230909', {message: "Mensaje sólo para 58d1a19621b3e007f4230909 GRUPO "})

    $.ajax({'url': BASE_URL + '/groups/notif/' + '58d1a19621b3e007f4230909', // FIXME
        'type' : 'POST',
        //'json': true,
        'headers' : {'Content-Type' : 'application/json'},
        // 'headers' : {'Content-Type': 'application/json; charset=utf-8',
        //              'enctype': 'multipart/form-data',
        //              'Connection':'keep-alive'},
        'data' : JSON.stringify({'groupMessage': $("#groupMessage").val()}) ,  //JSON.stringify(requestObject), // datos a enviar
        //processData: false,
        //contentType: false,
        //'processData' : false,
        'success' : function(data){
            //data = JSON.parse(data)
            console.log(" Sucess data <rq /groups/notif/ +,",  room.toString(), "  ", data );
        },
        //'dataType' : 'json', // text  ->  JSON.parse(data)   retorno //Content-Type:"application/json; charset=utf-8"
        'error': function(jqXHR, textStatus, errorThrown ){
            //console.log(Object.keys(jqXHR));

            console.log("EtextStatus-> ", textStatus, " error =" ,errorThrown," jqXHR",jqXHR);
            //comcast.cvs.apps.alerts.test.showErrorDialog( '<div style="color:red;font-weight:bold;">' +
            // 'Failed to save the settop box. See server logs for problem.</div>' );

            },
    });
    return false // disable reload

}) //button send notif

















 /*socket.emit('send', { room: room, message: message });
 socket.emit('message', { room: room, message: message });
*/


 // TODO
 /*

socket.on('58d1a19621b3e007f4230909', function(data){
    console.log("client socket ");
    data = JSON.parse(data)
    console.log( " Cliente -------" + data);

    //console.log(container + templateScript(data))
})


socket.on('message', function(data){
    console.log(" ########### DATA de socket ",     data);
})







 // TEST

//
// var groups = []
//
// //groups.push('58c8d253bf31f91570c66a94')
//
// // ajax pRA SUSCRIBIR A CADA GRUPO / CANAL  TODO separar archivos
// $.ajax({'url': BASE_URL + '/groups/user/myGroups/',
//     'type' : 'GET',
//     'headers' : {'Content-Type' : 'application/json'},
//     //'data' : JSON.stringify(requestObject), // datos a enviar
//     'processData' : false,
//     'success' : function(data){
//         //data = JSON.parse(data)
//         //console.log( JSON.stringify(data) )
//         console.log( "Data [client grouop]",  data);
//
//         for (var i = 0; i < data.length; i++) {
//             groups.push( data[i]['_id'])
//             //console.log( data[i]['_id'])
//         }
//
//         for (var i = 0; i < groups.length; i++) {
//             console.log("IR A ", groups[i].toString())
//             socket.emit('subscribe', groups[i].toString())
//         }
//
//     },
//     'error': function(jqXHR, data){
//         console.log(data);
//         //comcast.cvs.apps.alerts.test.showErrorDialog( '<div style="color:red;font-weight:bold;">' +
//         // 'Failed to save the settop box. See server logs for problem.</div>' );
//         },
//     'dataType' : 'json' // text  ->  JSON.parse(data)
// });
//
// var sendData = {};
//
//
//
// if (document.getElementById('groupId') == null ){
//     console.log("no estas en grupo ");
//
// }else{
//
// var room = "58d1a19621b3e007f4230909"
// console.log("ROOM  ", room , "room" );
//
// socket.emit('send', { room: room, message: groupMessage });
//
// /// AJAX para enviar mensaje al gruppo ACTUAL
// $(document).ready(function (){
//
//     //$("#sendMessage").click(function(){
//         //room = $("#groupId").html();
//         console.log("rooooom  ", room , "roo m" );
//         sendData['groupMessage'] = $("#groupMessage").val();
//         sendData['groupId'] = "58c8d253bf31f91570c66a94"
//
//         console.log('URL  ', BASE_URL + '/groups/notif/' )//+ room.toString() );
//
//         // $.post( BASE_URL + '/groups/notif/', {
//         //     'groupMessage': $("#groupMessage").val()
//         // }).done(function (data) {
//         //         console.log('noti enviado por post', data )
//         //     }).fail(function () {
//         //         console.log('noti NO fue enviado por post')
//         //     })
//
//         console.log("Enviarrr :  ", $("#groupMessage").val());
//
//
// /******************** tst con ajaxSubmit */
//     //    $('#notiForm').submit(function() {
//     //       //$("#status").empty().text("File is uploading...");
//     //       console.log('Enviando' );
//        //
//     //       $(this).ajaxSubmit({
//     //         error: function(xhr) {
//     //             status('Error: ' + xhr.status);
//     //         },
//     //         success: function(response) {
//     //             // $("#status").empty().text(response);
//     //             console.log("Response  ", response);
//     //         }
//     //       });
//     //       //Very important line, it disable the page refresh.
//     //         return false;
//     //     });
//

// })
//
//
// // Suscribir a groups
// //console.log("long ", Object.keys(groups[0]));
// console.log("long ", (groups[0]));
//
//
// let idCurrentGroup = document.getElementById('groupId').innerHTML;
//
// console.log('actulmente estas en ', idCurrentGroup);
//
// ///socket.emit('subscribe', idCurrentGroup.toString());
// //socket.emit('subscribef', idCurrentGroup.toString());
//
//     socket.emit('subscribe', 'roomOne');
//     socket.emit('subscribe', 'roomTwo');
//
//     //room = "ROOM !!!!1";
//     let message = "Emitido al room  !!!!1";
//
//     //socket.emit('58c094044fed0c14fca39461', {message: "Mensaje sólo para 58c094044fed0c14fca39461 GRUPO "})
//
//     socket.emit('send', { room: room, message: message });
//
//     socket.on('message', function (data) {
//         console.log(" ########### DATA de socket GRUPOS ",     data);
//     });
//
//
//     //socket.on('new notices', function(data){
//     socket.on(room.toString(), function(data){
//         console.log("client socket ");
//         data = JSON.parse(data)
//         console.log( " Cliente ------- ENVIO", data);
//     })
//
// } /// fin else
//
// /*
//
// socket.on('new group', function(data){
//     console.log("client socket ");
//     data = JSON.parse(data)
//     console.log( " Cliente -------" + data);
//
//     var container = document.querySelector('#noticiasCont')
//
//     console.log("siisi ");
//
//     var source = document.querySelector('#newsTemplate').innerHTML; // id del script
//     var templateScript = Handlebars.compile(source);  //templateScript handlebars compilando source
//
//     //console.log("source " + source);
//     //console.log(" template no compilado " + templateScript);
//     console.log(" compilado str " + templateScript(data));
//
//
//     console.log(container);
//     container.innerHTML =   container.innerHTML + templateScript(data)
//
//     //console.log(container + templateScript(data))
// })
//
//
// socket.on('message', function(data){
//     console.log(" ########### DATA de socket ",     data);
//
//
// })
// socket.emit('send', {message: "message"})
//
// socket.emit('new group', 'groupTwo')
// socket.emit('images', 'groupTwo')
// */
//
//
//
//
//
//
//
//
//
//
//
// /*socket.emit('suscribe', 'groupOne')
//
//
// $("#send").click(function() {
//     room = document.getElementById('groupId').innerHTML
//     message = "(client) se publico en el grupo " + room
//
//
//     socket.emit('send', {room: room, message: message})
//     console.log("(client) se publico en el grupo " + room);
// })
// */
//
//
// // 'use strict'
// //
// // var socket = io() // libreria socket para conectar con servidor socket
// //
// // socket.on('new group', function(data){
// //     data = JSON.parse(data)
// //     console.log(data);
// //
// //
// //     var container = document.querySelector('#noticiasCont').innerHTML;
// //
// //     console.log("siisi ");
// //
// //     var source = document.querySelector('#newsTemplate').innerHTML; // id del script
// //
// //     var templateScript = Handlebars.compile(container);  //templateScript handlebars compilando source
// //
// //     console.log("source " + source);
// //     console.log(" template no compilado " + templateScript);
// //     console.log(" compilado str " + templateScript(data));
// //
// //
// //     container.innerHTML = container.innerHTML + templateScript(data)
// //
// //
// //
// // })
