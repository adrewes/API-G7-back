/**
 * Todas las operaciones de base de datos de las encuestas
 */
var model = require('../models/preguntas');

// CREAR una lista de preguntas
exports.save = function (data, callback) {

    model.Preguntas({
        type: data.type,
        status : data.status,
        title: data.title,
        value: data.value,
        mandatory: data.mandatory,
        multiline: data.multiline,
        restrictions : data.restrictions,
        adornment : data.adornment,
        questions : data.questions

    }).save().then(function (err, inserted) {
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

// ACTUALIZAR las preguntas agregando una revision
// http://mongoosejs.com/docs/api.html#model_Model.update
exports.updatePregunta = function (doc, callback) {
    // Replaced .update() with .updateMany() as .update() is deprecated
    model.Preguntas.findOneAndUpdate(
        {_id : doc.idPregunta},
        { $push: { revisiones : doc.revision }}, null , function (err, data) {
            callback(err, data)
        }).populate('questions','revisiones')
} 

// ACTUALIZAR las preguntas modificando una revision
// http://mongoosejs.com/docs/api.html#model_Model.update
/* exports.updateRevision = function (criteria, doc,  callback) {
    // Replaced .update() with .updateMany() as .update() is deprecated
    model.Preguntas.findOneAndUpdate(
        criteria,
        {$set: {"revisiones.revision": doc}}, null , function (err, data) {
            callback(err, data)
        }).populate('questions','revisiones')
} 
 */

exports.updateRevision = function (criteria, doc,  callback) {
    // Replaced .update() with .updateMany() as .update() is deprecated
    model.Preguntas.findOneAndUpdate(criteria,
        { "revisiones.$": doc.revision}, {new: true, runValidators: true} , function (err, data) {
            callback(err, data)
        }).populate('questions','revisiones')
} 



// RETRIEVE preguntas based on criteria
exports.select = function (criteria, callback) {
    model.Preguntas.find(criteria, function (err, data) {
        callback(err, data)
    })
}