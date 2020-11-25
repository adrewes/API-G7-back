const pollsAPI = require('../clients/polls');
const encuestasController = require('../controllers/encuestas'); 
const encuestasDB = require('../db/encuestas');

exports.asyncPollsApiCall = async (dateFrom) => {

    const response = await pollsAPI.getPolls(dateFrom)
    
    for (let encuesta of response.data){

        console.log(encuesta);

        encuestasDB.select({idEncuesta:{ $eq: encuesta.id}}, function (err, data) {
            if (data.length==0){
                encuestasController.createEncuestaInternal(encuesta)
            } else {
                console.log("La encuesta ya existe!")
            }
        })

    }

}