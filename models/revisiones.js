var settings = require('../config/settings')
var idValidator = require('mongoose-id-validator');

var RevisionesSchema = settings.mongoose.Schema(
    {

        //ID de la encuesta a la que corresponde la revision
        idPregunta: {type: settings.mongoose.Schema.Types.ObjectId, ref: 'preguntas', required: true}, 

        //Datos de la realizada
        observacion: {
            //Nombre de usuario que realizo la observacion
            usuario: {type:String, required:[true,'"usuario" es requerido']},          
            //Mensaje de la observacion
            mensaje: {type:String, required:[true,'"mensaje" es requerido']},          
            //Fecha y hora de la creacion de la revision
            created: {type:Date, required: [true,'"created" es requerido']},
        },
        respuestaValidada: {
            //Nombre de usuario que realizo la validacion
            usuario: {type:String, required:[true,'"usuario" es requerido']},          
            //Nuevo valor de la respuesta
            value: {type:String, required:[true,'"mensaje" es requerido']},            
            //Fecha y hora de la creacion de la respuesta
            created: {type:Date, required: [true,'"created" es requerido']},
        }
    }
);

RevisionesSchema.plugin(idValidator);
// Export the model
exports.Revisiones = settings.mongoose.model('revisiones', RevisionesSchema)