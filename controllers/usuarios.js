var usuarios = require('../db/usuarios')
const authController = require('../controllers/authentication'); 

const REQUIRED_ROLES = ["ADMINISTRADOR"];

module.exports = {

	create(req, res) {

        // authController.authenticateToken(req, res, REQUIRED_ROLES)

        var doc = req.body;

        // if (res.statusCode==200){

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
        // }
    },

    patch(req, res) {

        // authController.authenticateToken(req, res, REQUIRED_ROLES)

        var doc = req.body;

        // if (res.statusCode==200){
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
        // }
	},

	list(req, res) {

        // authController.authenticateToken(req, res, REQUIRED_ROLES)

        // if (res.statusCode==200){
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
                    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
                    res.send(docs)
                }
            });
        // }
	},

    findByUsername(req, res) {

        // authController.authenticateToken(req, res, REQUIRED_ROLES)

        // if (res.statusCode==200){       
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
                    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
                    res.send(docs)
                }
            });
        // }
    },

    delete (req, res) {
        
        // authController.authenticateToken(req, res, REQUIRED_ROLES)

        // if (res.statusCode==200){       
            return usuarios.delete({_id: req.params.idUsuario}, function (err, data) {

                if (err) {
                    console.log(err)
                    res.status(500)
                    res.send("Error connecting to db")
                } else if (data.deletedCount == 0){
                    console.log("El id de usuario no existe")
                    res.sendStatus(404)
                } else {
                    console.log(data)
                    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
                    res.sendStatus(200)
                }
            });
        // }
    },
    
};