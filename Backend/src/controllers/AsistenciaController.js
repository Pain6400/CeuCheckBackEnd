const pool = require('../database');
var express = require('express');
var app = express();

module.exports = {
    GetClasesPorAula: GetClasesPorAula,
    RegistrarAsistencia: RegistrarAsistencia,
    GetAsistencias: GetAsistencias,
    GetAulas: GetAulas,
    Getdocentes: Getdocentes
};

function GetClasesPorAula(req, res){
    
    var aula = req.params.id;
    var Fecha = new Date();

    var hora = GetHora(Fecha);
    var minutos = GetMinutos(Fecha);
    var dia = GetDia(Fecha);
    //console.log(hora +':'+ minutos)
    const queryString = "select s.idseccion, concat(d.nombres , ' ', d.apellidos) as docente, s.aulaid, s.materiaid, m.nombremateria, s.horainicio, s.horafinal, di.descripcion from seccion s inner join docentes d on d.iddocente = s.docenteid  inner join materias m on m.idmateria = s.materiaid inner join dias di on di.id  = s.dias where S.aulaid = ? and S.dias = ?";
    pool.query(queryString, [aula, dia], (err, rows, fields) => {
        if (err) {
            res.status(500).send('Ops.. Error en la consulta.')
            return
        }
        
        var registroEncontrado = { Status : 404, Mensaje : 'No Hay clases' };
        //console.log(rows);
        rows.forEach(element => {


            if(parseInt('' + hora + minutos) >= parseInt(element.horainicio) && parseInt('' + hora + minutos) <= parseInt(element.horafinal))
            {
                //console.log(element);
                console.log("Clases Seleccionadas")
                registroEncontrado = element;
            }

        });

        res.status(200).json(registroEncontrado);
    });
}

function GetHora(Fecha){
    return Fecha.getHours();
}

function GetMinutos(Fecha){
    return Fecha.getMinutes();
}

function GetDia(Fecha){
    //Capturar Dia y mostrar el texto en lugar de numero.
    //var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
    //return diasSemana[Fecha.getDay()];

    var dia = Fecha.getDay();
    //console.log(diasSemana[Fecha.getDay()]);

    if( dia == 1 || dia == 3 ){
        dia = 13;
    } else if( dia == 2 || dia == 4 ){
        dia = 24;
    } else if( dia == 0 ){
        dia = 7; 
    }

    return dia;
}

//Obtiene las asistencias del dia actual
function GetAsistencias(req, res){
    console.log('Asistencias en el dia');

    const queryString = "SELECT id, seccionid , case when asistio = 1 then 'Asistio' when asistio = 0 then 'No Asistio' end as Asistio ,observacion , fecha FROM asistencia WHERE DATE_FORMAT(fecha, '%Y-%m-%d') = CURDATE()"
    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            res.status(500).send('Ops.. Error en la consulta.')
            return
        }
        res.status(200).json(rows);
    })
}

function RegistrarAsistencia(req, res){

    let NuevoRegistro = {
        seccionid: req.body.seccionid,
        asistio: req.body.asistio,
        observacion: req.body.observacion,
        fecha: req.body.fecha
    }
    console.log(NuevoRegistro)
    //console.log(NuevoRegistro);
    const queryString = "INSERT INTO asistencia (seccionid, asistio, observacion, fecha) VALUES (?, ?, ?, ?)"
    pool.query(queryString, [NuevoRegistro.seccionid, NuevoRegistro.asistio, NuevoRegistro.observacion, NuevoRegistro.fecha], (err, results, fields) => {
        
        if (err) {
            res.status(500).send('Ops.. Error al registrar la asistencia.')
            return
        }
        console.log('Asistencia Registrada con exito..');
        res.status(200).send('Asistencia Registrada con exito..');

    });
}

function GetAulas(req, res){
    console.log('Preguntas para la evaluacion');

    const queryString = "select * from seccion"
    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            res.status(500).send('Ops.. Error en la consulta.')
            return
        }
        res.status(200).json(rows);
    })
}

function Getdocentes(req, res){

    const queryString = "select * from docentes"
    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            res.status(500).send('Ops.. Error en la consulta.')
            return
        }
        res.status(200).json(rows);
    })
}