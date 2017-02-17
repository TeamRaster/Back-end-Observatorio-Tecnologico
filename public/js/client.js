'use strict'

const socket = io.connect('http://localhost:3000', {'forceNew': true})

socket.on('messages', function (data) {
    render(data)
})

function render(data) {
    let html = data.map(function (message, index) {
        console.log('asdasdasdasdasd')
        console.log(message.nickname)
        if(message.nickname == 'Servidor') {
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
        else if (message.nickname == 'Eder') {
            return (`
                <li class="comment author-comment">
                    <div class="info">
                        <a href="#">${message.nickname}</a>
                        <span>4 hours ago</span>
                    </div>
                    <a class="avatar" href="#">
                        <img src="https://scontent.xx.fbcdn.net/v/t1.0-1/p160x160/15241294_1186636554790659_6837415210864127904_n.jpg?oh=0c89f1349f173676b8bf13595d2b1705&oe=5946CC79" width="35" alt="Profile Avatar" title="Anie Silverston" />
                    </a>
                    <p>${message.text}</p>
                </li>
            `)
        }
    }).join(' ')
    let lista = document.getElementById('comment-section')
    console.log(lista)
    lista.innerHTML = html
}

function addMessages(e) {
    let text_ = document.getElementById('text_message')
    let message = {
        nickname: 'Eder',
        text: text_.value
    }
    text_.value = ""
    socket.emit('addNewMessage', message) //Emite un nuevo mensaje
    return false
}
