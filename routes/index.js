/* Controllers */
const preguntasController = require('../controllers/preguntas');
const encuestasController = require('../controllers/encuestas'); 
const revisionesController = require('../controllers/revisiones');

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Example project did not give you access to the api web services',
    })); 
    
    //Preguntas
    app.post('/api/pregunta/create/', preguntasController.create);
    app.get('/api/pregunta/list/:idEncuesta', preguntasController.list);

    //Encuestas
    app.post('/api/encuesta/create/', encuestasController.create);
    app.get('/api/encuesta/list', encuestasController.list);
    app.get('/api/encuesta/find/:idEncuesta', encuestasController.find);

    //Revisiones
    app.post('/api/revision/create/', revisionesController.create);
    app.get('/api/revision/list/:idEncuesta', revisionesController.list);
    //app.get('/api/encuesta/find/:idEncuesta', encuestasController.find);
};