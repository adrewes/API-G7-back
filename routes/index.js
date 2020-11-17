/* Controllers */
const preguntasController = require('../controllers/preguntas');
const encuestasController = require('../controllers/encuestas');
const usuariosController = require('../controllers/usuarios'); 
const authController = require('../controllers/authentication'); 
const corsController = require('../controllers/authentication'); 

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Example project did not give you access to the api web services',
    })); 
    
    //TODO No hacen faltas endpoint de preguntas salvo que usemos otro servicio para levantar las encuestas
    /*     app.post('/api/pregunta', preguntasController.create);
    app.get('/api/pregunta/list/', preguntasController.find);
    app.patch('/api/pregunta/',preguntasController.patchPregunta); */
    
    //Preguntas
    app.post('/api/pregunta/revision',preguntasController.createRevision);  
    app.patch('/api/pregunta/revision',preguntasController.patchRevision);
    app.patch('/api/pregunta/:idPregunta/status',preguntasController.aprobarPregunta);

    //Encuestas
    //app.post('/api/encuesta', encuestasController.create);
    app.patch('/api/encuesta/:idEncuesta/status', encuestasController.patch);
    app.get('/api/encuesta/', encuestasController.list);
    app.get('/api/encuesta/:idEncuesta/', encuestasController.find);

    //Login
    app.post('/api/login', authController.login);

    //Obtener lista de usuarios
    app.post('/api/usuario', usuariosController.create);
    app.get('/api/usuario', usuariosController.list);
    app.get('/api/usuario/:username', usuariosController.findByUsername);
    app.patch('/api/usuario/:idUsuario', usuariosController.patch);
    app.delete('/api/usuario/:idUsuario', usuariosController.delete);

    app.options('/*', function(req, res, next){
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        res.send(200);
    })

};