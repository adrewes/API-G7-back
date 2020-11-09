var usuarios = require('../db/usuarios')

module.exports = {

	create(req, res) {

        var doc = req.body;
		usuarios.save(doc,function (err, doc) {

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
		usuarios.update({_id: req.params.idUsuario}, doc, function (err, doc) {

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
		return usuarios.select(null,function (err, docs) {

            if (err) {
                console.log(err)
                res.status(500)
                res.send("Error connecting to db")
            } else {
                if (docs.length == 0) {
                    res.status(404)
                }
                console.log("Retrieved usuarios = %d", docs.length)
                res.send(docs)
            }
        });
	},

    findById(req, res) {

		return usuarios.selectOne({ _id: req.params.userId}, function (err, docs) {

            if (err) {
                console.log(err)
                res.status(500)
                res.send("Error connecting to db")
            } else {
                if (docs.length == 0) {
                    res.status(404)
                }
                console.log("Retrieved usuarios = %d", docs.length)
                res.send(docs)
            }
        });
    },

    findByUsername(req, res) {

		return usuarios.selectOne({ username: req.params.username}, function (err, docs) {

            if (err) {
                console.log(err)
                res.status(500)
                res.send("Error connecting to db")
            } else {
                if (docs.length == 0) {
                    res.status(404)
                }
                console.log("Retrieved usuarios = %d", docs.length)
                res.send(docs)
            }
        });
    },
    
};