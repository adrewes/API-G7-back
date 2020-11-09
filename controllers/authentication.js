const usuarios = require('../db/usuarios'); 
const jwt = require("jsonwebtoken");
const usuariosController = require('../controllers/usuarios'); 

module.exports = {

    login (req, res) {

        var doc = req.body;

        usuarios.selectOne({username: doc.username, password: doc.password}, function (err, doc) {

            if (err) {
                console.log(err)
                res.status(500)
                res.send("Error connecting to db")
            } else {
                if (doc.length == 0) {
                    res.status(404)
                }
                console.log("Login correcto")

                jwt.sign({ userId: doc.id, role: doc.rol}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP }, (err, token) => {

                if (err) {
                    console.log(err)
                    res.status(500)
                    res.send("Error al generar el token")
                }

                res.status(200)
                res.json({
            
                    token
            
                });
            });
            }
        });

    },

    authenticateToken(req, res, role) {

        // Gather the jwt access token from the request header
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) return res.sendStatus(401) // if there isn't any token
    
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            console.log(err)

            //Si el rol no coincide con el que se tiene que validar devuelvo error
            if (err || payload.role != role) return res.sendStatus(403)

            //Checkeo si el usuario con el id que viene en el token existe
            usuarios.selectOne({ _id: payload.userId}, function (err, docs) {

                if (err) {
                    console.log(err)
                    res.status(500)
                    res.send("Error connecting to db")
                } else {
                    if (docs.length == 0) {
                        res.status(401)
                    }
                    console.log("Retrieved usuarios = %d", docs.length)
                }
            })
        })
    }
}