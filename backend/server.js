/// Imports du Framework express
const express = require('express');
/// Recuparation des arguments et parameters du body de la request HTTP
const bodyParser = require('body-parser');
/// Routes
const apiRouter = require('./apiRouter').router;
/// Instance du serveur express
const server = express();


/// Body parser config
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

/// Configuration routes
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).end('<h1>Bonjour<h1>');
});

server.use('/api/', apiRouter);

/// Lancement du serveur
server.listen(3070, function() {
console.log('Serveur en écoute, well done')
});