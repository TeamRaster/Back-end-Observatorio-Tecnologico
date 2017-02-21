// Exporta todos los archivos que esten DENTRO DE ESTA carpeta para reducir lineas de codigo en otros archivos

'use strict'

const fs = require('fs')
const path = require('path')

let files = fs.readdirSync(__dirname)

files.forEach(function(file){
    let fileName = path.basename(file, '.js')
    if(fileName !== 'index'){
        exports[fileName] = require('./'+ fileName)
    }

})
