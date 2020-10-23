//const Sequelize = require('sequelize');
//const usuario = require('../models').usuario;

var encuestas = require('../db/encuestas')

module.exports = {
/*     create(req, res) {
        return usuario
            .create({
                username: req.params.username,
                status: req.params.status
            })
            .then(usuario => res.status(200).send(usuario))
            .catch(error => res.status(400).send(error))
    }, */

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

/*     find(req, res) {
        return usuario.findAll({
            where: {
                username: req.params.username,
            }
        })
            .then(usuario => res.status(200).send(usuario))
            .catch(error => res.status(400).send(error))
    }, */
};