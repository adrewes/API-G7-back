/* Controllers */
const preguntasController = require('../controllers/preguntas');
const encuestasController = require('../controllers/encuestas'); 
const usuariosController = require('../controllers/usuarios'); 

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Example project did not give you access to the api web services',
    })); 
    
    //Preguntas
    //TODO No hacen faltas endpoint de preguntas salvo que usemos otro servicio para levantar las encuestas
/*     app.post('/api/pregunta/create/', preguntasController.create);
    app.get('/api/pregunta/list/', preguntasController.find);
    app.patch('/api/pregunta/',preguntasController.patchPregunta); */

    app.post('/api/pregunta/revision',preguntasController.createRevision);  
    app.patch('/api/pregunta/revision',preguntasController.patchRevision);

    //Encuestas
    //app.post('/api/encuesta', encuestasController.create);
    app.patch('/api/encuesta/:idEncuesta', encuestasController.patch);
    app.get('/api/encuesta/', encuestasController.list);
    app.get('/api/encuesta/:idEncuesta', encuestasController.find);

    //Login
   // app.post('/api/login', usuariosController.post);

};