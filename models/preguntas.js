var settings = require('../config/settings')

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

//exports.Preguntas = settings.mongoose.model('preguntas', PreguntasSchema)
//exports.PreguntasSchema