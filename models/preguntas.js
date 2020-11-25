var settings = require('../config/settings')

var PreguntasSchema = settings.mongoose.Schema(
    {
        //ID del usuario proveniente API de formularios
        type : {type:String, enum: ['TEXT','NUMBER','SELECT','CHOICE','FILE','GROUPED'], required:[true,'"type" es requerido']},

        //Estado de la revision 
        status: {type:String, enum:['PENDIENTE','REVISION','VALIDADA','APROBADA'], required:[true,'"status" es requerido']},

        //Titulo de la pregunta
        title: {type:String, required:[true,'"title" es requerido']},

        //Valor completado por la empresa
        value: {type:String, required:false},

        //Valor revisado por el operador
        lastValue: {type:String, required:false},

        //Obligatoriedad de la pregunta
        mandatory: {type:Boolean, required:true, default:false},
 
        //Obligatoriedad de la pregunta
        options: [{type:String, required:false}],

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
        questions: [{type: settings.mongoose.Schema.Types.ObjectId, ref: 'preguntas', required: true}],

        //Revisiones
        revisiones: [{

            //Estado de la revision 
            //TODO revisar si hace falta que la revision tenga estado status: {type:String, enum:['REVISION','VALIDADA','APROBADA'], required:[true,'"status" es requerido']},

            //Datos de la observacion
            observacion: {
                //Nombre de usuario que realizo la observacion
                usuario: {type:String, required: false},      
                //Mensaje de la observacion
                mensaje: {type:String, required: false},    
                //Fecha y hora de la creacion de la revision
                created: {type:Date, required: false},
            },
            respuestaValidada: {
                //Nombre de usuario que realizo la validacion
                usuario: {type:String, required: false},         
                //Nuevo valor de la respuesta
                value: {type:String, required: false},        
                //Fecha y hora de la creacion de la respuesta
                created: {type:Date, required: false},
            }
        }]
    }, { timestamps: true }
);

exports.Preguntas = settings.mongoose.model('preguntas', PreguntasSchema)
//exports.PreguntasSchema