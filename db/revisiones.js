/**
 * Todas las operaciones de base de datos de las revisiones
 */
var model = require('../models/revisiones');

// CREAR una revision
exports.save = function (data, callback) {

    model.Revisiones({

        idEncuesta : data.idEncuesta,
        observacion : data.observacion,
        respuestaValidada : data.respuestaValidada

    }).save(function (err, inserted) {
        callback(err, inserted)
    })
    
/*     model.save(function (err, inserted) {
        callback(err, inserted)
    }) */
}

// ACTUALIZAR las revisiones
// http://mongoosejs.com/docs/api.html#model_Model.update
/* exports.update = function (criteria, doc, callback) {
    // Replaced .update() with .updateMany() as .update() is deprecated
    model.Encuestas.updateMany(criteria, doc, function (err, data) {
        callback(err, data)

    })
}  */

// RETRIEVE revisiones packages based on criteria
exports.select = function (criteria, callback) {
    model.Revisiones.find(criteria, function (err, data) {
        callback(err, data)
    })
}