'use strict'

// Exporta todos los archivos que esten DENTRO DE ESTA carpeta por ejemplo si quieres acceder a viewsController solo basta la siguiente linea
// const controllers = require('.././controllers') => Solo se requiere de esta liena de codigo
// router.get('/', controllers.viewsController.getViewIndexPlus) => asi se manda a llamar

const fs = require('fs')
const path = require('path')

let files = fs.readdirSync(__dirname)

files.forEach(function(file){
    let fileName = path.basename(file, '.js')
    if(fileName !== 'index'){
        exports[fileName] = require('./'+ fileName)
    }

})
