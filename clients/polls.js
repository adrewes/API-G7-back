const axios = require("axios");
const BASE_URL = `https://observatorio-pyme-answer-back.herokuapp.com`

module.exports = {
    getPolls: (dateFrom) => axios({
        method:"GET",
        url : BASE_URL + `/external-api/polls`,
        headers: {
            "x-api-key": "5CD4ED173E1C95FE763B753A297D5"
        },
        params: {
            date: dateFrom
        }
    })
}