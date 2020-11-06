var settings = require('../config/settings')

var UsuariosSchema = settings.mongoose.Schema(
    
    {
        //username
        usuario : {type:String, required:[true,'"usuario" es requerido']},

        //Clave del usuario
        contraseña : {type:String, required:[true,'"contraseña" es requerido']},
        
        //Nombre del usuario
        nombre: {type:String, required:[true,'"nombre" es requerido']},

        //Fecha de alta del usuario
        fechaAlta: {type:Date, required: [true,'"fechaAlta" es requerido']},

        //Rol del usuario
        rol: [{type: settings.mongoose.Schema.Types.ObjectId, ref: 'roles', required: true}],

    }
);

// Export the model
exports.Usuarios = settings.mongoose.model('usuarios', UsuariosSchema,'usuarios')