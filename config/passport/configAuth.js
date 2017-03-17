// Configuraciones para la autenticacion con redes sociales
'use strict'

module.exports = {
  facebookAuth: {
    clientID		: '196096000859413', // 603003759892361
    clientSecret 	: '60f39e62bfca0fe5662cd39abc5afa89', // 9cfe6485399c61c8c89517e0586e318d
    callbackURL 	: 'http://localhost:3000/auth/facebook/callback'
  },
  twitterAuth: {
    consumerKey		: 'hYnafavpgf8GqLnJcf0kCQQDD', // Pi7beYrXX08btHfpNVIo2JTvL
    consumerSecret 	: 'XPIiwQqGCeSpYjPJ864RF3FyFtU92PHc6XrMg96mjd4Pis21fD',// Vu1NyXfhqvElWH7IFN4MtKxOLVa9GlVapHt4dd4ilHuVw5ldGm
    callbackURL 	: '/auth/twitter/callback'
  },
  linkedinAuth: {
    consumerKey	    : '783fppjbf6tat1',
    consumerSecret 	: '1VLNma3f31aOZPHm',
    callbackURL 	: 'http://localhost:3000/auth/linkedin/callback'
  },
  localAuth: {
    username        : 'username',
    password        : 'password'
  },
    successRedirect : '/accounts/login',
    failureRedirect : '/accounts/signin'
}
