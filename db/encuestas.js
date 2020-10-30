/**
 * Todas las operaciones de base de datos de las encuestas
 */
var model = require('../models/encuestas');

// CREAR una encuesta
exports.save = function (data, callback) {

    model.Encuestas({
        userId : data.userId,
        companyName : data.companyName,
        name : data.name,
        description : data.description,
        status : data.status,
        created: data.created,
        modified: data.modified,
        sections: data.sections,
        questions: data.questions
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