var evaluacionController = require('../controllers/EvaluacionController')
var express = require('express');
var router = express.Router();

router.get('/Preguntas', function(req, res) {
    evaluacionController.GetPreguntas(req, res);
});

router.get('/Respuestas', function(req, res) {
    evaluacionController.GetRespuestas(req, res);
});

module.exports = router;