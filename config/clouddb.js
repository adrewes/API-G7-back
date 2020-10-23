/**
 * Setup the Database URL
 */

 // mongodb+srv://admin:admin@fundacion-pyme.3haxh.mongodb.net/<encuestas>?retryWrites=true&w=majority

 const DB_USER = "admin"
 const DB_PASSWORD = "admin"
 const DB_NAME = "encuestas"
 const CLUSTER_HOST = "fundacion-pyme.3haxh.mongodb.net"
 
 // Setup the DB URI
 exports.DB_URI= "mongodb+srv://"+DB_USER+":"+DB_PASSWORD+"@"+CLUSTER_HOST+"/"+DB_NAME+"?retryWrites=true&w=majority"