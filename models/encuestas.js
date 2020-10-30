var settings = require('../config/settings')
var Preguntas = require('../models/preguntas');

var PreguntasSchema = settings.mongoose.Schema(
    {

        //ID del usuario proveniente API de formularios
        type : {type:String, enum: ['TEXT','NUMBER','SELECT','CHOICE','FILE','GROUPED'], required:[true,'"type" es requerido']},

        //Titulo de la pregunta
        title: {type:String, required:[true,'"title" es requerido']},

        //Valor completado por la empresa
        //TODO Ver el caso de archivos
        value: {type:String, required:false},

        //Obligatoriedad de la pregunta
        mandatory: {type:Boolean, required:true, default:false},
        
        //Indica se permite el ingeso de valores con saltos de linea
        multiline: {type:Boolean, required:true, default:false},
        
        //Restricciones que aplican a las respuestas
        restrictions: {
            min: {type:String, required:false},
            max: {type:String, required:false}
        },

        //Indica en que formato está la respuesta
        adornment: {type:String, required:false},

        //Preguntas en el caso de que sea multiline
        questions: [this]
    }
);

var EncuestasSchema = settings.mongoose.Schema(
    {
        //ID del usuario proveniente API de formularios
        userId : {type:String, required:[true,'"userId" es requerido']},

        //Nombre de la encuesta
        name: {type:String, required:[true,'"name" es requerido']},

        //Descripcion de la encuesta
        description: {type:String, required:[true,'"description" es requerido']},

        //Estado de la encuesta 
        status: {type:String, enum:['COMPLETED','APROBADA','RECHAZADA'], required:[true,'"status" es requerido']},

        //Fecha de envio de la encuesta
        created: {type:Date, required: [true,'"created" es requerido']},

        //Fecha de modificacion de la encuesta
        modified: {type:Date, required: [true,'"modified" es requerido']},

        //Secciones de la encuesta
        sections: [{
            //Titulo de la seccion
            title: {type:String, required:[true,'"title" es requerido']},

            // description: {type:String, required:[true,'"fecha" es requerido']},
            //Descripcion de la seccion
            description: {type:String, required:false},
            
            //Preguntas
            questions: [{type: settings.mongoose.Schema.Types.ObjectId, ref: 'preguntas', required: true}],
        }]
    }
);

// Export the model
exports.Encuestas = settings.mongoose.model('encuestas', EncuestasSchema,'encuestas')
//exports.Preguntas = settings.mongoose.model('preguntas', PreguntasSchema)