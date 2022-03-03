const PROX_CONFIG = [
  {
    context:['/api'],
    target: 'https://publishing-house-service.herokuapp.com/',
    secure: false,
    changeOrigin:true,
    logLevel: 'debug'
  }
];

module.exports = PROX_CONFIG;