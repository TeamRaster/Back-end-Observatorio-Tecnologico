var socket = io() // libreria socket para conectar con servidor socket

//var socket = io.connect();

var groups = []
let BASE_URL = "http://localhost:3000/admin"

// ajax pRA SUSCRIBIR A CADA GRUPO / CANAL  TODO separar archivos
$.ajax({'url': BASE_URL + '/groups/user/myGroups/',
    'type' : 'GET',
    'headers' : {'Content-Type' : 'application/json'},
    //'data' : JSON.stringify(requestObject), // datos a enviar
    'processData' : false,
    'success' : function(data){
        //data = JSON.parse(data)
        console.log(data);

        for (var i = 0; i < data.length; i++) {

            groups.push( data[i]['_id'])
            console.log( data[i]['_id'])

        }

        for (var i = 0; i < groups.length; i++) {
            console.log("IR A ", groups[i].toString())
            socket.emit('subscribe', groups[i].toString())
        }

    },
    'error': function(jqXHR, data){
        console.log(data);
        //comcast.cvs.apps.alerts.test.showErrorDialog( '<div style="color:red;font-weight:bold;">' +
        // 'Failed to save the settop box. See server logs for problem.</div>' );
        },
    'dataType' : 'json' // text  ->  JSON.parse(data)
});

var sendData = {};



if (document.getElementById('groupId') == null ){
    console.log("no estas en grupo ");

}else{

var room = ""
console.log("ROOM  ", room , "roo m" );

socket.emit('send', { room: room, message: groupMessage });

/// AJAX para enviar mensaje al gruppo ACTUAL
$(document).ready(function (){

    //$("#sendMessage").click(function(){
        //room = $("#groupId").html();
        console.log("rooooom  ", room , "roo m" );
        sendData['groupMessage'] = $("#groupMessage").val();
        sendData['groupId'] = "58c8d253bf31f91570c66a94"

        console.log('URL  ', BASE_URL + '/groups/notif/' )//+ room.toString() );

        // $.post( BASE_URL + '/groups/notif/', {
        //     'groupMessage': $("#groupMessage").val()
        // }).done(function (data) {
        //         console.log('noti enviado por post', data )
        //     }).fail(function () {
        //         console.log('noti NO fue enviado por post')
        //     })

        console.log("Enviarrr : 45 ", $("#groupMessage").val());

       $('#notiForm').submit(function() {
          //$("#status").empty().text("File is uploading...");
          console.log('Enviando' );

          $(this).ajaxSubmit({
            error: function(xhr) {
                status('Error: ' + xhr.status);
            },
            success: function(response) {
                // $("#status").empty().text(response);
                console.log(response);
            }
          });
          //Very important line, it disable the page refresh.
            return false;
        });


        /*$.ajax({'url': BASE_URL + '/groups/notif/',
            'type' : 'POST',
            //'json': true,
            'headers' : {'Content-Type' : 'application/json', 'enctype': 'multipart/form-data'},
            // 'headers' : {'Content-Type': 'application/json; charset=utf-8',
            //              'enctype': 'multipart/form-data',
            //              'Connection':'keep-alive'},
            'data' : JSON.stringify({'groupMessage': $("#groupMessage").val()}) ,  //JSON.stringify(requestObject), // datos a enviar
            processData: false,
            //contentType: false,
            //'processData' : false,
            'success' : function(data){
                //data = JSON.parse(data)
                console.log(" data <rq /groups/notif/ +,",  room.toString(), "  ", data );
            },
            //'dataType' : 'json', // text  ->  JSON.parse(data)   retorno //Content-Type:"application/json; charset=utf-8"
            'error': function(jqXHR, textStatus, errorThrown ){
                //console.log(Object.keys(jqXHR));

                console.log("EtextStatus-> ", textStatus, " error =" ,errorThrown," jqXHR",jqXHR);
                //console.log("claves error =", Object.keys(errorThrown));
                //console.log("claves jqXHR =", Object.keys(jqXHR));
                //comcast.cvs.apps.alerts.test.showErrorDialog( '<div style="color:red;font-weight:bold;">' +
                // 'Failed to save the settop box. See server logs for problem.</div>' );
                },
        });*/

    //}) button send action
})


// Suscribir a groups
//console.log("long ", Object.keys(groups[0]));
console.log("long ", (groups[0]));




let idCurrentGroup = document.getElementById('groupId').innerHTML;

console.log('actulmente estas en ', idCurrentGroup);

socket.emit('subscribe', idCurrentGroup.toString());
//socket.emit('subscribef', idCurrentGroup.toString());

    socket.emit('subscribe', 'roomOne');
    socket.emit('subscribe', 'roomTwo');

    //room = "ROOM !!!!1";
    let message = "Emitido al room  !!!!1";

    //socket.emit('58c094044fed0c14fca39461', {message: "Mensaje sólo para 58c094044fed0c14fca39461 GRUPO "})

    socket.emit('send', { room: room, message: message });

    socket.on('message', function (data) {
        console.log(" ########### DATA de socket GRUPOS ",     data);
    });


    //socket.on('new notices', function(data){
    socket.on(room.toString(), function(data){
        console.log("client socket ");
        data = JSON.parse(data)
        console.log( " Cliente -------" + data);
    })

} /// fin else

/*

socket.on('new group', function(data){
    console.log("client socket ");
    data = JSON.parse(data)
    console.log( " Cliente -------" + data);

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


socket.on('message', function(data){
    console.log(" ########### DATA de socket ",     data);


})
socket.emit('send', {message: "message"})

socket.emit('new group', 'groupTwo')
socket.emit('images', 'groupTwo')
*/











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
// socket.on('new group', function(data){
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
