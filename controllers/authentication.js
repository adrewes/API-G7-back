const usuarios = require('../db/usuarios'); 
const jwt = require("jsonwebtoken");

module.exports = {

    login (req, res) {

        var doc = req.body;

        res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
        
        usuarios.selectOne({username: doc.username, contraseña: doc.contraseña}, function (err, data) {

            if (err) {
                console.log(err)
                res.status(500)
                res.send("Error connecting to db")
            } else if (!data){ //No se encontró el usuario
                console.log("El usuario no existe!")
                res.status(400)
                res.send("Usuario o clave invalidos")
            } else {

                console.log("Login correcto")

                jwt.sign({ userId: data.id, role: data.rol}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP }, (err, token) => {

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

    authenticateToken(req, res, roles, callback) {

        // Gather the jwt access token from the request header
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) {
            res.sendStatus(401) // if there isn't any token
        } else {

            jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
                console.log(err)
    
                //Si el rol no coincide con el que se tiene que validar devuelvo error
                if (err || (roles != null && !roles.includes(payload.role))) return res.sendStatus(403)
    
                //Checkeo si el usuario con el id que viene en el token existe
                usuarios.selectOne({ _id: payload.userId}, function (err, data) {
    
                    if (err) {
                        console.log(err)
                        res.status(500)
                        res.send("Error connecting to db")
                    } else if (!data){ //No se encontró el usuario
                        console.log("El usuario no existe!")
                        res.status(401)
                    }
                })
                callback(err,payload)

            })
        }
    
    }
}