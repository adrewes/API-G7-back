const express        = require('express');
const logger         = require('morgan');
const bodyParser     = require('body-parser');
const encuestasCron  = require('./controllers/encuestas-cron');

// This will be our application entry. We'll setup our server here.
const http = require('http');

//Set up de cron scheduler
const cron = require('node-cron');

// Set up the express app
const app = express();

// Schedule tasks to be run on the server.
/* cron.schedule('* * * * *', function() {
     console.log('running a task every minute');
   }); */

cron.schedule('* * * * *', function() {
     console.log('running a task every minute');
     encuestasCron.asyncPollsApiCall("2020-10-20")
   });



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