/// Imports du Framework express
const express = require('express');
/// Instance du serveur express
const server = express();

/// Configuration routes
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).end('<h1>Bonjour<h1>');
});

/// Lancement du serveur
server.listen(8080, function() {
console.log('Serveur en écoute, well done')
});