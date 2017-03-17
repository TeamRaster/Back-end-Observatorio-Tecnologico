// Configuraciones para la autenticacion con redes sociales
'use strict'

module.exports = {

    facebookAuth: {
        clientID		  : '196096000859413',
        clientSecret 	  : '60f39e62bfca0fe5662cd39abc5afa89',
        callbackURL 	  : 'http://localhost:3000/auth/facebook/callback',
        profileFields     : ['id', 'email', 'name', 'picture', 'link'],
        passReqToCallback : true
    },
    twitterAuth: {
        consumerKey		  : 'hYnafavpgf8GqLnJcf0kCQQDD',
        consumerSecret 	  : 'XPIiwQqGCeSpYjPJ864RF3FyFtU92PHc6XrMg96mjd4Pis21fD',
        callbackURL 	  : 'http://localhost:3000/auth/twitter/callback',
        profileFields     : ['id', 'display_url', 'media_url', 'profile_image_url_https', 'name', 'url'],
        passReqToCallback : true
    },
    linkedinAuth: {
        consumerKey       : '783fppjbf6tat1',
        consumerSecret    : '1VLNma3f31aOZPHm',
        callbackURL 	  : 'http://localhost:3000/auth/linkedin/callback',
        profileFields     : ['id', 'first-name', 'last-name', 'picture-url', 'public-profile-url'],
        passReqToCallback : true
    },
    localAuth: {
        username          : 'email',
        password          : 'password',
        passReqToCallback : true,
    },
    successRedirect       : '/', // Este puede ser redirigido al home, pero por el moento solo aqui
    failureRedirect       : '/accounts/signin' // Te dirije a la misma pagina pero para mostrar un msj de error
}
