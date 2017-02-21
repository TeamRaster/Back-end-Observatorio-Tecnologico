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
