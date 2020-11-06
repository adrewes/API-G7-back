const pollsAPI = require('../clients/polls')

exports.asyncPollsApiCall = async (dateFrom) => {
    const response = await pollsAPI.getPolls(dateFrom)
    console.log(response.data)
}