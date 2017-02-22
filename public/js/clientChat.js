$(function () {
    function initSocketIO() {
        $('text_message').focus()

        let host = window.location.host
        console.log(host)
        const socket = io.connect('http://' + host, {
            reconnect: false,
            'try multiple transports': false
        })

        // Eventos que esta escuchando
        socket.on('connect', function () {
            console.log('connected')
            // socket.emit('join', JSON.stringify({}))
        })

        socket.on('connecting', function() {
            console.log('connecting');
        })

        socket.on('disconnect', function () {
            console.log('disconnect')
        })

        socket.on('connect_failed', function() {
            console.log('connect_failed');
        })

        socket.on('error', function(err) {
            console.log('error: ' + err)
        })

        // Mensajes que lleguen desde el servidor
        socket.on('chat', function(msg) {
            console.log('on messages')
            let message = JSON.parse(msg)
            console.log('message desde el cliente')
            console.log(message)
            let type = message.type
            console.log(type)

            let container = $('ul#comment-section') // Selecciona la lista donde iran los mensajes del chat
            let struct = container.find('li.' + type + ':first') // Encuentra el primer elemento li dentro de la lista
            let messageView = struct.clone() // Crea una copia de la plantilla(Solo del li)
            messageView.find('.time').text((new Date()).toString("HH:mm")) // Localiza el span .time y le agrega la hora actual

            // Tipos de mensajes 'Mensajes y Servidor'
            if (message.type == 'message') {
                let matches = message.msg.match(/^\s*[\/\\]me\s(.*)/) // Mensajes especiales que empiezen con /me ...
                if (matches) { // Si hay coincidencia entra aqui
                    console.log(matches)
                    console.log(matches[1])
                    messageView.find('.user').text(message.user) // Localiza el span .user y le coloca el nombre de usuario
                    messageView.find('.message_chat').text(matches[1])
                    messageView.find('.message_chat').css('font-weight', 'bold') // Localiza el span .user y le agrega estilos especiales
                } else {  // Para los mensajes normales
                    messageView.find('.user').text(message.user) // Localiza el span .user y le coloca el nombre de usuario
                    messageView.find('.message_chat').text(message.msg) // Localiza el span .message y le coloca el texto
                }
            }
            else if (message.type == 'information') {
                console.log('Condicional Information')
                messageView.find('.user').text(message.user)
                messageView.find('.message_chat').text(message.msg)
                messageView.addClass('control') // Agrega la clase para los mensajes, que solo avisan
            }
            console.log('message.user')
            console.log(message.user)
            if (message.user == 'Servidorddddddd') messageView.find('.user').addClass('self') // Clases para cuando los mensajes son tuyos

            container.append(messageView.show()) // Agrega el nuevo li a la lista
            console.log('append')

            let container_messages = $('.container_messages')
            container_messages.scrollTop(container_messages.innerHeight()) // Coloca el scroll en el ultimo mensaje
        })

        // Creacion de un nuevo mensaje en el chat
        $('#messageForm form').submit(function(event) {
            event.preventDefault() // Evita enviar el formulario
            let input = $(this).find('input') // Selecciona el input dentro del formulario
            let msg = input.val() // Obtiene el valor del input
            console.log('valor del input')
            console.log(msg)
            let message = {
                msg  : msg,
                type : 'message'
            }
            socket.emit('chat', JSON.stringify(message))
            input.val('') // Limpia el input para un nuevo mensaje
        })
    }

    console.log('Inicializar initSocketIO')
    initSocketIO()

    // Guardar mensajes
    // $.post('/user', {
    //     "user": name
    // }).done(function() {
    //     initSocketIO()
    // }).fail(function() {
    //     console.log("error")
    // })

})













    // const username = document.getElementById('username').value
    //
    // // Obtener el texto de cada mensaje, al presionar la tecla de 'Enter'
    // document.getElementById('text_message').addEventListener("keypress", (e) => {
    //     if (e.keyCode == 13) {
    //         console.log('Click en el input')
    //         addMessages()
    //     }
    // })
    //
    // socket.on('messages', function (data) {
    //     console.log('storedMessages client', data)
    //     render(data)
    // })
    //
    // function render(data) {
    //     let html = data.map(function (message, index) {
    //         console.log('Renderizado de los datos')
    //         console.log(message.nickname)
    //         if (message.nickname === username) {
    //             return (`
    //                 <li class="comment author-comment">
    //                     <div class="info">
    //                         <a href="#">${message.nickname}</a>
    //                         <span>4 hours ago</span>
    //                     </div>
    //                     <a class="avatar" href="#">
    //                         <img src="/images/imagesUsers/user1.jpg" width="35" alt="Profile Avatar" title="Anie Silverston" />
    //                     </a>
    //                     <p>${message.text}</p>
    //                 </li>
    //             `)
    //         } else {
    //             return (`
    //                 <li class="comment user-comment">
    //                     <div class="info">
    //                         <a href="#">${message.nickname}</a>
    //                         <span>4 hours ago</span>
    //                     </div>
    //                     <a class="avatar" href="#">
    //                         <img src="/images/imagesUsers/user1.jpg" width="35" alt="Profile Avatar" title="Anie Silverston" />
    //                     </a>
    //                     <p>${message.text}</p>
    //                 </li>
    //             `)
    //         }
    //     }).join(' ')
    //     let lista = document.getElementById('comment-section')
    //     lista.innerHTML = html
    // }
    //
    // function addMessages(e) {
    //     let text_ = document.getElementById('text_message')
    //     console.log('Texto que se va a enviar ', text_)
    //     let message = {
    //         nickname: (username != "") ? username : 'Invitado',
    //         text: text_.value
    //     }
    //     text_.value = ""
    //     socket.emit('newMessage', message)
    //     return false
    // }
    //
    // function sendForm() {
    //     // document.formMessage.submit()
    // }
