/**
 * Todas las operaciones de base de datos de las encuestas
 */
var model = require('../models/preguntas');

// CREAR una lista de preguntas
exports.save = function (data, callback) {

    model.Preguntas({

        _id: data.id,
        type: data.type,
        status : data.status,
        title: data.title,
        value: data.value,
        mandatory: data.mandatory,
        options: data.options,
        multiline: data.multiline,
        restrictions : data.restrictions,
        adornment : data.adornment,
        questions : data.questions

    }).save(function (err, inserted) {
        callback(err, inserted)
    })
/*     }).save().then(function (err, inserted) {
        callback(err, inserted)
    }) */
    

}

// ACTUALIZAR las preguntas agregando una revision
exports.updatePregunta = function (doc, callback) {
    // Replaced .update() with .updateMany() as .update() is deprecated
    model.Preguntas.findOneAndUpdate(
        {_id : doc.idPregunta},
        { $push: { revisiones : doc.revision, status: "REVISION" }}, null , function (err, data) {
            callback(err, data)
        }).populate('questions','revisiones')
} 

// ACTUALIZAR las preguntas modificando una revision
exports.updateRevision = function (criteria, doc,  callback) {
    // Replaced .update() with .updateMany() as .update() is deprecated
    model.Preguntas.findOneAndUpdate(criteria,
        { "revisiones.$.respuestaValidada": doc.revision.respuestaValidada, $set: {status: "VALIDADA", lastValue: doc.revision.respuestaValidada.value}}, {new: true, runValidators: true} , function (err, data) {
            callback(err, data)
        }).populate('questions','revisiones')
} 

// ACTUALIZAR las preguntas modificando el estado
exports.updateEstadoPregunta = function (criteria, doc,  callback) {
    // Replaced .update() with .updateMany() as .update() is deprecated
    model.Preguntas.findOneAndUpdate(
        criteria,
        {$set: {status: doc.status}}, null , function (err, data) {
            callback(err, data)
        }).populate('questions','revisiones')
} 

// RETRIEVE preguntas based on criteria
exports.select = function (criteria, callback) {
    model.Preguntas.find(criteria, function (err, data) {
        callback(err, data)
    })
}