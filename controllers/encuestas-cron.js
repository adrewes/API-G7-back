const pollsAPI = require('../clients/polls');
const encuestasController = require('../controllers/encuestas'); 

exports.asyncPollsApiCall = async (dateFrom) => {
    const response = await pollsAPI.getPolls(dateFrom)

    for (let encuesta of response.data){
        console.log(encuesta);
        encuestasController.createEncuestaInternal(encuesta)
    }

}