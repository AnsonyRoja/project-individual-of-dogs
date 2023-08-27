
const express = require('express');
const server = express();
const morgan = require('morgan');
//express.json() es un metodo de express que nos permite parsear el body de las peticiones a json
server.use(express.json());
//morgan es un middleware que nos permite ver en consola las peticiones que se hacen al servidor
server.use(morgan('dev'));

const router = require('../routes/index');

// Configurar los headers para evitar errores CORS
server.use((req, res, next) => {
    // Estos header nos permiten aceptar peticiones de cualquier origen
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
});

// Configurar el router para que use el prefijo /thedogs
server.use('/thedogs', router);



module.exports = server;
