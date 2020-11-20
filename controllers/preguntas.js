var preguntas = require('../db/preguntas')
const authController = require('../controllers/authentication'); 

const REQUIRED_ROLES = ["SUPERVISOR", "OPERADOR"];

module.exports = {

    createPreguntaInternal(pregunta, callback) {

        var preguntaModel = {

            id: pregunta.id, 
            type: pregunta.type,
            status: pregunta.status ? pregunta.status : "PENDIENTE",
            title: pregunta.title,
            value: pregunta.type == "FILE" ? "http://www.uade.edu.ar/"+"pregunta.value[0].name" : pregunta.value,
            lastValue: pregunta.type == "FILE" ? "http://www.uade.edu.ar/"+"pregunta.value[0].name" : pregunta.value,
            mandatory: pregunta.mandatory,
            options: pregunta.options,
            multiline: pregunta.multiline,
            restrictions: pregunta.restrictions,
            adornment: pregunta.adornment,
            questions: pregunta.questions
        }

        preguntas.save(preguntaModel, function (err, doc) {

            if (err) {
                console.log(err)
                return (err)
            } else {
                callback(err, doc);
            }
        });

    },

    /* 	create(req, res) {
    
            var doc = req.body;
            preguntas.save(doc,function (err, doc) {
    
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

    createRevision(req, res) {

        res.header('Access-Control-Allow-Origin', 'http://localhost:3000')

        authController.authenticateToken(req, res, REQUIRED_ROLES, function (err, data){

            if (res.statusCode == 200) {
                //Construyo la fecha de creacion
                let dateString = new Date().toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" });;

                let dateObj = new Date(dateString);
    
                var doc = req.body;
    
                doc.revision.observacion.created = dateObj
    
                preguntas.updatePregunta(doc, function (err, doc) {
    
                    if (err) {
                        console.log(err)
                        res.status(500)
                        // res.send("Error connecting to db")
                        res.send(err)
                    } else {
                        res.status(201).send(doc)
                    }
                });
            }
        })

    },

    /*     patchPregunta(req, res) {
    
            var doc = req.body;
            preguntas.updatePregunta(doc,function (err, doc) {
    
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

    patchRevision(req, res) {
        
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000')

        authController.authenticateToken(req, res, REQUIRED_ROLES, function (err, data){
            
            if (res.statusCode == 200) {
    
                let dateString = new Date().toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" });;

                let dateObj = new Date(dateString);
                var doc = req.body;
                doc.revision.respuestaValidada.created = dateObj
    
                preguntas.updateRevision({ "_id": doc.idPregunta, "revisiones._id": doc.idRevision }, doc, function (err, doc) {
    
                    if (err) {
                        console.log(err)
                        res.status(500)
                        // res.send("Error connecting to db")
                        res.send(err)
                    } else {
                        res.status(200).send(doc)
                    }
                });
            }
        })

    },

    aprobarPregunta(req, res) {

        res.header('Access-Control-Allow-Origin', 'http://localhost:3000')

        authController.authenticateToken(req, res, REQUIRED_ROLES, function (err, data){
            if (res.statusCode == 200) {
    
                var doc = req.body;
    
                preguntas.updateEstadoPregunta({_id:{ $eq: req.params.idPregunta} }, doc, function (err, doc) {
    
                    if (err) {
                        console.log(err)
                        res.status(500)
                        // res.send("Error connecting to db")
                        res.send(err)
                    } else {
                        res.status(200).send(doc)
                    }
                });
            }
        })

    },

    /* 	list(_, res) {
            return preguntas.select(null,function (err, docs) {
    
                if (err) {
                    console.log(err)
                    res.status(500)
                    res.send("Error connecting to db")
                } else {
                    if (docs.length == 0) {
                        res.status(404)
                    }
                    console.log("Retrieved preguntas = %d", docs.length)
                    res.send(docs)
                }
            });
        }, */

    /*     find(req, res) {
            var doc = req.body;
            return preguntas.select({_id: doc.idPregunta, "revisiones._id": doc.idRevision}, function (err, docs) {
    
                if (err) {
                    console.log(err)
                    res.status(500)
                    res.send("Error connecting to db")
                } else {
                    if (docs.length == 0) {
                        res.status(404)
                    }
                    console.log("Retrieved encuestas = %d", docs.length)
                    res.send(docs)
                }
            });
        }, */

};
