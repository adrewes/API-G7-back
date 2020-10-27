/* Controllers */
const encuestasController = require('../controllers/encuestas'); 

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Example project did not give you access to the api web services',
    })); 
    
    app.post('/api/encuesta/create/', encuestasController.create);
    app.get('/api/encuesta/list', encuestasController.list);
    app.get('/api/encuesta/find/:idEncuesta', encuestasController.find);
};