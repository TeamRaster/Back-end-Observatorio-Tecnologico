'use strict'

const socket = io.connect('http://localhost:3000', {'forceNew': true})
const username = document.getElementById('username').value

document.getElementById('text_message').addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
        console.log('Click en el input')
        addMessages()
    }
})

socket.on('messages', function (data) {
    console.log('storedMessages client', data)
    render(data)
})

function render(data) {
    let html = data.map(function (message, index) {
        console.log('Renderizado de los datos')
        console.log(message.nickname)
        if (message.nickname === username) {
            return (`
                <li class="comment author-comment">
                    <div class="info">
                        <a href="#">${message.nickname}</a>
                        <span>4 hours ago</span>
                    </div>
                    <a class="avatar" href="#">
                        <img src="/images/imagesUsers/user1.jpg" width="35" alt="Profile Avatar" title="Anie Silverston" />
                    </a>
                    <p>${message.text}</p>
                </li>
            `)
        } else {
            return (`
                <li class="comment user-comment">
                    <div class="info">
                        <a href="#">${message.nickname}</a>
                        <span>4 hours ago</span>
                    </div>
                    <a class="avatar" href="#">
                        <img src="/images/imagesUsers/user1.jpg" width="35" alt="Profile Avatar" title="Anie Silverston" />
                    </a>
                    <p>${message.text}</p>
                </li>
            `)
        }
    }).join(' ')
    let lista = document.getElementById('comment-section')
    lista.innerHTML = html
}

function addMessages(e) {
    let text_ = document.getElementById('text_message')
    console.log('Texto que se va a enviar ', text_)
    let message = {
        nickname: username,
        text: text_.value
    }
    text_.value = ""
    socket.emit('addNewMessage', message)
    return false
}
