var preguntas = require('../db/preguntas')

module.exports = {
	create(req, res) {

        var doc = req.body;
		preguntas.save(doc,function (err, doc) {

            if (err) {
                console.log(err)
                res.status(500)
                // res.send("Error connecting to db")
                res.send(err)
            } else {
                res.status(201).send(doc)
            }
        });
    },

    createRevision(req, res) {

        var doc = req.body;
		preguntas.updatePregunta(doc,function (err, doc) {

            if (err) {
                console.log(err)
                res.status(500)
                // res.send("Error connecting to db")
                res.send(err)
            } else {
                res.status(201).send(doc)
            }
        });
    },

    patchPregunta(req, res) {

        var doc = req.body;
		preguntas.updatePregunta(doc,function (err, doc) {

            if (err) {
                console.log(err)
                res.status(500)
                // res.send("Error connecting to db")
                res.send(err)
            } else {
                res.status(201).send(doc)
            }
        });
    },

    patchRevision(req, res) {

        var doc = req.body;
		preguntas.updateRevision({"_id": doc.idPregunta, "revisiones._id": doc.idRevision }, doc, function (err, doc) {

            if (err) {
                console.log(err)
                res.status(500)
                // res.send("Error connecting to db")
                res.send(err)
            } else {
                res.status(200).send(doc)
            }
        });
	},

	list(_, res) {
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
	},

    find(req, res) {
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
    },
    
};