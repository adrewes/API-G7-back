//const Sequelize = require('sequelize');
//const usuario = require('../models').usuario;

var encuestas = require('../db/encuestas')

module.exports = {
	create(req, res) {

        var doc = req.body;
		new encuestas.save(doc,function (err, doc) {

            if (err) {
                console.log(err)
                res.status(500)
                res.send("Error connecting to db")
            } else {
                res.status(201).send(doc)
            }
        });
	},

	list(_, res) {
		return encuestas.select(null,function (err, docs) {

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

    find(req, res) {
		return encuestas.select({idEncuesta:{ $eq: req.params.idEncuesta} },function (err, docs) {

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