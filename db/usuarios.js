/**
 * Todas las operaciones de base de datos de las encuestas
 */
var model = require('../models/usuarios');

// CREAR una lista de preguntas
exports.save = function (data, callback) {

    let dateString = new Date().toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" });;

    let dateObj = new Date(dateString);

    model.Usuarios({

        username: data.username,
        contraseña : data.contraseña,
        nombre: data.nombre,
        fechaAlta: dateObj,
        rol: data.rol
    
    }).save(function (err, inserted) {
        callback(err, inserted)
    })
}

// ACTUALIZAR un usuario
exports.update = function (criteria, doc,  callback) {
    // Replaced .update() with .updateMany() as .update() is deprecated
    model.Usuarios.findOneAndUpdate(criteria,
        doc, {new: true, runValidators: true} , function (err, data) {
            callback(err, data)
        })
} 

// RETRIEVE usuarios based on criteria
exports.select = function (criteria, callback) {
    model.Usuarios.find(criteria, function (err, data) {
        callback(err, data)
    })
}

// RETRIEVE usuarios based on criteria
exports.selectOne = function (criteria, callback) {
    model.Usuarios.findOne(criteria, function (err, data) {
        callback(err, data)
    })
}