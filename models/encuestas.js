var settings = require('../config/settings')

var EncuestasSchema = settings.mongoose.Schema(
    {
        //ID de la encuesta proveniente de la API de formularios
        idEncuesta : {type:String, required:[true,'"idEncuesta" es requerido']},

        //ID del usuario proveniente API de formularios
        userId : {type:String, required:[true,'"userId" es requerido']},

        //Nombre de la encuesta
        name: {type:String, required:[true,'"name" es requerido']},

        //Descripcion de la encuesta
        description: {type:String, required:[true,'"description" es requerido']},

        //Estado de la encuesta 
        status: {type:String, enum:['COMPLETE','APROBADA','RECHAZADA'], required:[true,'"status" es requerido']},

        //Fecha de envio de la encuesta
        created: {type:Date, required: [true,'"created" es requerido']},

        //Fecha de modificacion de la encuesta
        modified: {type:Date, required: [true,'"modified" es requerido']},

        //Secciones de la encuesta
        sections: [{
            //Titulo de la seccion
            title: {type:String, required:[true,'"fecha" es requerido']},

            //Descripcion de la seccion
            description: {type:String, required:[true,'"fecha" es requerido']},
            
            //Preguntas
            questions: [{
                //ID de la pregunta
                idPregunta : {type:String, required:[true,'"idPregunta" es requerido']},

                //ID del usuario proveniente API de formularios
                type : {type:String, enum: ['TEXT','NUMBER','SELECT','CHOICE','FILE','GROUPED'], required:[true,'"type" es requerido']},

                //Titulo de la pregunta
                title: {type:String, required:[true,'"title" es requerido']},

                //Valor completado por la empresa
                value: {type:String, required:[true,'"value" es requerido']},

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
                
                revisiones :[{
                    //ID de la revision
                    idRevision: {type:String, required:[true,'"idRevision" es requerido']},
                    
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
                }],

                questions: [{
                    //ID de la pregunta
                    idPregunta : {type:String, required:[true,'"idPregunta" es requerido']},
    
                    //ID del usuario proveniente API de formularios
                    type : {type:String, enum: ['TEXT','NUMBER','SELECT','CHOICE','FILE','GROUPED'], required:[true,'"type" es requerido']},
    
                    //Titulo de la pregunta
                    title: {type:String, required:[true,'"title" es requerido']},
    
                    //Valor completado por la empresa
                    value: {type:String, required:[true,'"value" es requerido']},
    
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
                     
                    revisiones :[{
                        //ID de la revision
                        idRevision: {type:String, required:[true,'"idRevision" es requerido']},
                        
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
                    }],
                }]
            }]
        }]
    }
);

// Export the model
exports.Encuestas = settings.mongoose.model('encuestas', EncuestasSchema)