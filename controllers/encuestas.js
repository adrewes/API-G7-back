//const Sequelize = require('sequelize');
//const usuario = require('../models').usuario;

const encuestas = require('../db/encuestas')
const preguntasController = require('../controllers/preguntas');
const authController = require('../controllers/authentication'); 

var mongoose = require('mongoose')

const REQUIRED_ROLES = ["SUPERVISOR","OPERADOR"];

module.exports = {

    createEncuestaInternal(encuesta) {



        var encuestaModel = {

            idEncuesta: encuesta.id,
            userId : encuesta.userId,
            company: encuesta.company,
            name : encuesta.name,
            description : encuesta.description,
            status : encuesta.status,
            created: encuesta.created,
            modified: encuesta.modified,        
            sections: []
        }

        for (let seccion of encuesta.sections){
            
            preguntasArray = []
            
            for (let pregunta of seccion.questions){

                pregunta.id = mongoose.Types.ObjectId();
                preguntasController.createPreguntaInternal(pregunta,function (err, doc) {

                    if (err) {
                        console.log(err)
                        throw (err)
                    }                        
                });
                preguntasArray.push(pregunta.id);
            }
            encuestaModel.sections.push({
                title: seccion.title,
                description: seccion.description,
                questions : preguntasArray
            });
        
        }
        encuestas.save(encuestaModel,function (err, doc) {

            if (err) {
                console.log(err)

            } else {
                console.log(doc)
            }
        });
    },

/* 	create(req, res) {

        var doc = req.body;
		encuestas.save(doc,function (err, doc) {

            if (err) {
                console.log(err)
                res.status(500)
                // res.send("Error connecting to db")
                res.send(err)
            } else {
                res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
                res.status(201).send(doc)
            }
        });
	}, */

    patch(req, res) {
        //TODO volver a habilitar
/*         authController.authenticateToken(req, res, REQUIRED_ROLES)

        if (res.statusCode==200){        */

            var doc = req.body;
            encuestas.update({"_id": req.params.idEncuesta}, doc, function (err, doc) {

                if (err) {
                    console.log(err)
                    res.status(500)
                    // res.send("Error connecting to db")
                    res.send(err)
                } else {
                    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
                    res.status(200).send(doc)
                }
            });
        // }
    },

	list(req, res) {
        //TODO volver a habilitar       
/*         authController.authenticateToken(req, res, REQUIRED_ROLES)

        if (res.statusCode==200){       */

            return encuestas.list(null,function (err, docs) {

                if (err) {
                    console.log(err)
                    res.status(500)
                    res.send("Error connecting to db")
                } else {
                    if (docs.length == 0) {
                        res.status(404)
                    }
                    console.log("Retrieved encuestas = %d", docs.length)
                    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
                    res.send(docs)
                }
            });
        // }
	},

    find(req, res) {
        //TODO volver a habilitar
/*         authController.authenticateToken(req, res, REQUIRED_ROLES)

        if (res.statusCode==200){       */

            return encuestas.select({_id:{ $eq: req.params.idEncuesta} },function (err, docs) {

                if (err) {
                    console.log(err)
                    res.status(500)
                    res.send("Error connecting to db")
                } else {
                    if (docs.length == 0) {
                        res.status(404)
                    }
                    console.log("Retrieved encuestas = %d", docs.length)
                    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
                    res.send(docs)
                }
            });
        }
	// },
};