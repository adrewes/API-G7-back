var settings = require('../config/settings')

var EncuestasSchema = settings.mongoose.Schema(
    {
        //ID de la encuesta generado por el modulo anterior
        idEncuesta : {type:String, required:[true,'"idEncuesta" es requerido']},

        //ID del usuario proveniente API de formularios
        userId : {type:String, required:[true,'"userId" es requerido']},

        //Nombre de la encuesta
        name: {type:String, required:[true,'"name" es requerido']},

        //Descripcion de la encuesta
        description: {type:String, required:[true,'"description" es requerido']},

        //Datos de la compañia
        company : {
            name: {type:String, required:[true,'"company.name" es requerido']},
        },

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