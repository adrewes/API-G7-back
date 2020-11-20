var usuarios = require('../db/usuarios')
const authController = require('../controllers/authentication');


module.exports = {

    create(req, res) {

        const REQUIRED_ROLES = ["ADMINISTRADOR"];

        res.header('Access-Control-Allow-Origin', 'http://localhost:3000')

        authController.authenticateToken(req, res, REQUIRED_ROLES, function (err, data) {
            var doc = req.body;

            if (res.statusCode == 200) {

                usuarios.save(doc, function (err, doc) {

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

    patch(req, res) {

        res.header('Access-Control-Allow-Origin', 'http://localhost:3000')

        const REQUIRED_ROLE = "ADMINISTRADOR";

        authController.authenticateToken(req, res, null, function (err, data) {

            var doc = req.body;
            if (res.statusCode == 200) {

                if (req.params.idUsuario != data.userId && data.role != REQUIRED_ROLE) {
                    res.sendStatus(401)
                } else {

                    usuarios.update({ _id: req.params.idUsuario }, doc, function (err, doc) {

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
            }

        })
    },

    list(req, res) {

        const REQUIRED_ROLES = ["ADMINISTRADOR"];

        res.header('Access-Control-Allow-Origin', 'http://localhost:3000')


        authController.authenticateToken(req, res, REQUIRED_ROLES, function (err, data) {
            if (res.statusCode == 200) {
                return usuarios.select(null, function (err, docs) {

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
            }
        })

    },

    find(req, res) {

        res.header('Access-Control-Allow-Origin', 'http://localhost:3000')

        var payload;

        authController.authenticateToken(req, res, null, function (err, data) {
            payload = data
        })

        if (res.statusCode == 200) {
            console.log(payload.userId)

            return usuarios.selectOne({ _id: payload.userId }, function (err, docs) {

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
        }
    },

    findById(req, res) {

        const REQUIRED_ROLES = ["ADMINISTRADOR"];

        res.header('Access-Control-Allow-Origin', 'http://localhost:3000')

        var payload;

        authController.authenticateToken(req, res, REQUIRED_ROLES, function (err, data) {
            payload = data
        })

        if (res.statusCode == 200) {
            console.log(req.params.idUsuario)

            return usuarios.selectOne({ _id: req.params.idUsuario }, function (err, docs) {

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
        }
    },

    delete(req, res) {

        res.header('Access-Control-Allow-Origin', 'http://localhost:3000')

        authController.authenticateToken(req, res, REQUIRED_ROLES, function (err, data) {
            if (res.statusCode == 200) {
                return usuarios.delete({ _id: req.params.idUsuario }, function (err, data) {

                    if (err) {
                        console.log(err)
                        res.status(500)
                        res.send("Error connecting to db")
                    } else if (data.deletedCount == 0) {
                        console.log("El id de usuario no existe")
                        res.sendStatus(404)
                    } else {
                        console.log(data)
                        res.sendStatus(200)
                    }
                });
            }
        })
    },

};