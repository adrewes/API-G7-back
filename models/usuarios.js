var settings = require('../config/settings')

var UsuariosSchema = settings.mongoose.Schema(
    
    {
        //username
        username : {type:String, required:[true,'"username" es requerido'], unique : true},

        //Clave del usuario
        contraseña : {type:String, required:[true,'"contraseña" es requerido']},
        
        //Nombre del usuario
        nombre: {type:String, required:[true,'"nombre" es requerido']},

        //Fecha de alta del usuario
        fechaAlta: {type:Date, required: [true,'"fechaAlta" es requerido']},

        //Rol del usuario
        rol: {type:String, enum:['SUPERVISOR','ADMINISTRADOR','OPERADOR'], required:[true,'"rol" es requerido']},

    }
);

// Export the model
exports.Usuarios = settings.mongoose.model('usuarios', UsuariosSchema,'usuarios')