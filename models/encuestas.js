var settings = require('../config/settings')

var EncuestasSchema = settings.mongoose.Schema(
    {
        // Nombre de la encuesta
        nombre: {type:String, required:[true,'"nombre" es requerido']},

        //Nombre de la empresa
        empresa: {type:String, required:[true,'"empresa" es requerido']},

        //Estado de la encuesta
        estado: {type:String, enum:['Pendiente','Aprobada','Rechazada'], required:[true,'"estado" es requerido']},

        //Fecha de envio de la encuesta
        fecha: {type:String, required:[true,'"fecha" es requerido']}
    }
);

// Export the model
exports.Encuestas = settings.mongoose.model('encuestas', EncuestasSchema)