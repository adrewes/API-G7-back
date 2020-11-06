//const Sequelize = require('sequelize');
//const usuario = require('../models').usuario;

var encuestas = require('../db/encuestas')

module.exports = {
	create(req, res) {

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
	},

    patch(req, res) {

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
    },

	list(_, res) {
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
	},

    find(req, res) {
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
	},
};