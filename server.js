//Importer le Package HTTP de node
const http = require('http');

//Importer l'application pour que le server node retourne l'application
const app = require('./app');

//Renvoie un port valide
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');

//Sur quel port l'application tourne
app.set('port', port);

//Rechercher les erreurs et les gérer
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
const address = server.address();
const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
switch (error.code) {
    case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
            default:
                throw error;
            }
        };

//Créer un server
const server = http.createServer(app);

//Ecouteur d'événement, rapporte le port sur lequel le server s'éxéccute
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
