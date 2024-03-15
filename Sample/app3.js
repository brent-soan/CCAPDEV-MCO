const express = require("express");
const { connectToDb, getDb } = require("./db"); // Import exported functions
const { ObjectId } = require("mongodb");
const app = express();
app.use(express.json()); // Parses any json coming in on the request
const port = 8080;

// DB connection
let db

connectToDb((err) => {
    if (!err) { // Listen to requests if connection is successful
        app.listen(port, "localhost", () => {
            console.log("App is listening on port " + port);
        });
        db = getDb(); // Need this to interact with DB like fetching data
    }
});

// Routes
app.get("/books", (req, res) =>{
    let books = [];

    db.collection("books")
        .find() // Returns a cursor that points to the whole collection of documents since there is no filter
        .sort({author: 1}) // Sort the documents
        .forEach(book => books.push(book)) // Push each book to the books array
        .then(() => {
            res.status(200).json(books); // Set status to 200 and send a JSON which is the books
        })
        .catch(() => {
            res.status(500).json({error: "Could not fetch documents"}); // Set status to 500 and send JSON which is the error
        });
});

app.get("/books/:id", (req, res) => {
    if(ObjectId.isValid(req.params.id)) { // Execute if parameter is valid
        db.collection("books")
        .findOne({_id: new ObjectId(req.params.id)})
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(() => {
            res.status(500).json({error: "Could not fetch the document"});
        })
    } else { // Execute if paramter is not valid
        res.status(500).json({error: "Not a valid document id"}); 
    }
});

app.post("/books", (req, res) => {
    const book = req.body;

    db.collection("books")
        .insertOne(book)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({err: "Could not create a new docuent"});
        })
});