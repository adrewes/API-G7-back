var settings = require('../config/settings')

var RolesSchema = settings.mongoose.Schema(
    {
        //Descripcion del rol
        descripcion: {type:String, enum:['SUPERVISOR','ADMINISTRADOR','OPERADOR'], required:[true,'"descripcion" es requerido']},
    }
);

// Export the model
exports.Roles = settings.mongoose.model('usuarios', RolesSchema,'usuarios')