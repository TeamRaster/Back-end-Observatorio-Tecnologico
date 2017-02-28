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


    function like() {
        let btnLike = $('#like')
        let id = $(location).attr('href').split('/')[5]
        btnLike.click(function () {



            if(btnLike.hasClass('active')) {
                console.log(id)
                $.post('/app/offers/' + id + '/like?_method=delete').done(function () {
                    console.log('Like eliminado')
                }).fail(function () {
                    console.log('Like error')
                })
                btnLike.removeClass('active')
            } else {
                $.post('/app/offers/' + id + '/like', {hola: "sdasdadadsasds"}).done(function () {
                    console.log('Like agregado')
                }).fail(function () {
                    console.log('Like error')
                })
                btnLike.addClass('active')
            }
        })
    }

    function commentInit() {
        $('#comment_form').submit(function (event) {
            event.preventDefault()

            let comment_section = $('#comment_section'),
                new_comment = $('#comment_text'),
                date = moment().format('HH:mm'),
                id = $(location).attr('href').split('/')[5]

            let newElement = $(
                '<div class="row margin-small">' +
                    '<p>' +
                        '<span> ' +
                            '<b> Eder </b>' +
                        '</span>' +
                        '<span> ' +
                            new_comment.val() +
                        '</span>' +
                        '<span> ' +
                            '<em>' + date + '</em>' +
                        '</span>' +
                    '</p>' +
                '</div>')

            $.post('/app/offers/' + id + '/comments', {
                comment : new_comment.val(),
                date    : date
            }).done(function () {
                console.log('Comentario enviado por post')
            }).fail(function () {
                console.log('Comentario NO fue enviado por post')
            })

            comment_section.append(newElement)
            new_comment.val('')
        })
    }

    commentInit()

    // like()





    // console.log('Inicializar initSocketIO')
    // initSocketIO()

    // Guardar mensajes
    // $.post('/user', {
    //     "user": name
    // }).done(function() {
    //     initSocketIO()
    // }).fail(function() {
    //     console.log("error")
    // })

})







