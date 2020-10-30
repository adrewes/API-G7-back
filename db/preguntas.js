/**
 * Todas las operaciones de base de datos de las encuestas
 */
var model = require('../models/preguntas');

// CREAR una lista de preguntas
exports.save = function (data, callback) {

    model.Preguntas({
        type: data.type,
        title: data.title,
        value: data.value,
        mandatory: data.mandatory,
        multiline: data.multiline,
        restrictions : data.restrictions,
        adornment : data.adornment,
        questions : data.questions

    }).save(function (err, inserted) {
        callback(err, inserted)
    })
    
/*     model.save(function (err, inserted) {
        callback(err, inserted)
    }) */
}

// CREAR multiples encuestas
/* exports.saveMany = function (rows, callback) {

    model.Encuestas.insertMany(rows, function (err, docs) {
        callback(err, docs)
    })

} */

// ACTUALIZAR las encuestas
// http://mongoosejs.com/docs/api.html#model_Model.update
exports.update = function (criteria, doc, callback) {
    // Replaced .update() with .updateMany() as .update() is deprecated
    model.Encuestas.updateMany(criteria, doc, function (err, data) {
        callback(err, data)

    })
} 

// RETRIEVE encuestas packages based on criteria
exports.select = function (criteria, callback) {
    model.Encuestas.
        findById(criteria).
        populate('sections.questions').
        exec(function (err, data) {
            callback(err, data)
        });
}