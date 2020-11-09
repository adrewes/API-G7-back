const usuarios = require('../db/usuarios'); 
const jwt = require("jsonwebtoken");

exports.login = function (req, res) {

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
}