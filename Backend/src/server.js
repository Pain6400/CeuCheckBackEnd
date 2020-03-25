var routes = require('./routes');
var express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());//necesario para capturar datos en formato json

app.listen(8000, function() { //escucha en el puerto 8000
    console.log('Escuchando en puerto 8000!');
});

//NECESARIO PARA SERVIR ESTA API A OTROS CON OTRO DOMINIO

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//ROUTER//
app.use('/', routes.indexRoutes);
app.use('/evaluacion', routes.evaluacionRoutes);
app.use('/asistencia', routes.asistenciaRoutes);


app.use(function(req, res, next) {
    res.status(404).send('Esa pagina no existe!');
});