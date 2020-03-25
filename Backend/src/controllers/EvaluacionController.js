const pool = require('../database');
var express = require('express');
var app = express();

module.exports = {
    GetPreguntas: GetPreguntas,
    GetRespuestas: GetRespuestas
};

function GetPreguntas(req, res){
    console.log('Preguntas para la evaluacion');

    const queryString = "SELECT * FROM preguntas"
    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            res.status(500).send('Ops.. Error en la consulta.')
            return
        }
        res.status(200).json(rows);
    })
}

function GetRespuestas(req, res){
    console.log('Respuestas para la evaluacion');

    const queryString = "SELECT * FROM respuesta"
    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            res.status(500).send('Ops.. Error en la consulta.')
            return
        }
        res.status(200).json(rows);
    })
}