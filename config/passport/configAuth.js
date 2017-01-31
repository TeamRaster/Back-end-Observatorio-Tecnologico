// Configuraciones para la autenticacion con redes sociales
'use strict'

module.exports = {
  'facebookAuth': {
    'clientID'		  : '196096000859413',
    'clientSecret' 	: '60f39e62bfca0fe5662cd39abc5afa89',
    'callbackURL' 	: '/auth/facebook/callback'
  },
  'twitterAuth': {
    'clientID'		  : '9QJBOcRk7EOSd905pxYQJhveF',
    'clientSecret' 	: 'pMmodNpxLyjzfJEFc4DqTCg2tM0RSvl5sLgztHqpejVJQsdj4A',
    'callbackURL' 	: '/auth/twitter/callback'
  }
  // Aun no esta implementado
  // linkedinAuth: {
  //   clientID		  : '579183015617251',
  //   clientSecret 	: '0ca6487c876e4ecb2cda3c7f2e1a0b4d',
  //   callbackURL 	: 'http://localhost:8080/auth/facebook/callback'
  // }
}
