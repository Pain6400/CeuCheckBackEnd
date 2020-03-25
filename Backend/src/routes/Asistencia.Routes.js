var asistenciaController = require('../controllers/AsistenciaController')
const express = require('express');
const router = express.Router();

router.get('/GetClasesPorAula/:id', function(req, res) {
    asistenciaController.GetClasesPorAula(req, res);
});

router.get('/AsistenciasDia', function(req, res) {
    asistenciaController.GetAsistencias(req, res);
});

router.get('/Aulas', function(req, res) {
    asistenciaController.GetAulas(req, res);
});

router.get('/Docentes', function(req, res) {
    asistenciaController.Getdocentes(req, res);
});

router.post('/RegistrarAsistencia', (req, res) => {
    asistenciaController.RegistrarAsistencia(req, res);
});


module.exports = router;