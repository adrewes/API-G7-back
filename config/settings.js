/**
 * All database settings done in this file
 */

var mongoose = require('mongoose')
// This would make mongoose use native Promises
mongoose.Promise = global.Promise;

// This environment property is used for getting the URI for MongoDB

const DB_USER = "admin"
const DB_PASSWORD = "admin"
const DB_NAME = "encuestas"
const CLUSTER_HOST = "fundacion-pyme.3haxh.mongodb.net"

// Setup the DB URI
process.env.DB_URI = "mongodb+srv://"+DB_USER+":"+DB_PASSWORD+"@"+CLUSTER_HOST+"/"+DB_NAME+"?retryWrites=true&w=majority"

var uri = process.env.DB_URI
//var uri = "mongodb+srv://admin:admin@fundacion-pyme.3haxh.mongodb.net/encuestas?retryWrites=true&w=majority"

// No need to provid ethe user /password separately its part of the URI
// var options = {user:process.env.DB_USER, pass:process.env.DB_PASSWORD}

//Config para que corra las validaciones de campos en todas las transacciones
mongoose.set('runValidators', true);

mongoose.connect(uri, {
    // useMongoClient: true
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

// Setup event listeners for the mongoose connections
mongoose.connection.on('error', function(err){
    console.log('Mongoose connection error')
    console.log(err)
})
// events
mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected')
})
mongoose.connection.on('open', function(){
    console.log('Mongoose connected')
})

// export the mongoose & db
exports.mongoose = mongoose;
exports.db = mongoose.connection;

//Seteo el secreto para la generacion y validacion de jwt
process.env.JWT_SECRET = require('crypto').randomBytes(64).toString('hex')

//Seteo el tiempo de expiracion del token (5 minutos)
process.env.JWT_EXP = "300s"


console.log('El secreto del token es: ' + process.env.JWT_SECRET);