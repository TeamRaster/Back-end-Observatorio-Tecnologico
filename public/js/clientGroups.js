//var socket = io //.connect('http://localhost')
// libreria socket para conectar con servidor socket solo parte de IO

let serverUri = 'http://localhost:3000/'
//var socket = io.connect();
var socket = io();

var room = "room_one"; // default room
$(document).ready(function() {

	socket = io.connect();

	socket.on("displayMessage", function (data) { // mensaje enviado
		var num = $(".message_box").children("p").length;
		console.log(num);
		console.log(data);

		var messageString = "<p>"+data+"</p>";
		if (num >= 10) { // remover mansajes(+10)
             $(".message_box").children("p:first").remove();
         }
		$(".message_box").append(messageString);
	});

	socket.on("clear_room", function(){ /// Elimina mensajes del anterior grupo ()
		$(".message_box").children("p").html("&nbsp;");
	});

	$(".submit_button").click(function(e){  //enviar mensaje a room
		e.preventDefault();
		var message = $(".message_input").val();
		if (message != "")
            socket.emit("chatMessage", [room, message]);

        $(".message_input").val("");
	});


	$(".room_button").click(function(e){ // suscripcion al room (class="room_button")
		e.preventDefault();
		var old_room = room;
		window.room = $(this).data("room");
		var join_event = "join_" + room;
		socket.emit(join_event, [old_room, room]);
	});

});
