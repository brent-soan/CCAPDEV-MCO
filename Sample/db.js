const { MongoClient } = require("mongodb"); // Destructures MongoClient and allows to connect to DB
let dbConnection;

module.exports = { // Exports things
    connectToDb: (cb) => {
        MongoClient.connect("mongodb://localhost:27017/bookstore") // Connects to local DB using the connection string
            .then((client) => {
                dbConnection = client.db(); // Returns an interface to interact with DB
                return cb();
            })
            .catch(err => {
                console.log(err);
                return cb(err);
            });
    }, // Connect to DB
    getDb: () => dbConnection// Return DB connection after connecting
}