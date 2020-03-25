var indexRoutes = require('./routes/IndexRoutes');
var evaluacionRoutes = require('./routes/EvaluacionRoutes');
var asistenciaRoutes = require('./routes/Asistencia.Routes');
var express = require('express');
var app = express();

module.exports = {
    indexRoutes: indexRoutes,
    evaluacionRoutes: evaluacionRoutes,
    asistenciaRoutes: asistenciaRoutes
};