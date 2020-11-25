const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const encuestasCron = require('./controllers/encuestas-cron');
const morgan = require("morgan");


// This will be our application entry. We'll setup our server here.
const http = require('http');

//Set up de cron scheduler
const cron = require('node-cron');

// Set up the express app
const app = express();

// Schedule tasks to be run on the server.
cron.schedule('0 1 * * *', function() {

    //Construyo la fecha del dia anterior en formato "AAAA-MM-DD"
    let dateString = new Date().toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" });;

    let dateObj = new Date(dateString);

    //Seteo la fecha de ayer
    dateObj.setDate(dateObj.getDate() - 1);

    // year as (YYYY) format
    let year = dateObj.getFullYear();

    // month as (MM) format
    let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);

    // date as (DD) format
    let date = ("0" + dateObj.getDate()).slice(-2);

    // date as YYYY-MM-DD format
    let dateQuery = year + "-" + month + "-" + date;

    console.log('Runing Encuestas Cron Job for date ' + dateQuery);
    encuestasCron.asyncPollsApiCall(dateQuery)

}, "America/Argentina/Buenos_Aires");



// Log requests to the console.
app.use(logger('dev'));


// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup a default catch-all route that sends back a welcome message in JSON format.
require('./routes')(app);
/* app.get('*', (req, res) => res.status(200).send({
     message: 'Welcome to the beginning of nothingness.',
})); */

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);


const server = http.createServer(app);
server.listen(port);

module.exports = app;