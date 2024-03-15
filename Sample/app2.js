const express = require("express"); // Store express function
const app = express(); // Store the invoked function
const morgan = require("morgan");

app.set("view engine", "ejs"); // Register view engine
//app.set("views", "folderName"); // Set the views folder by setting the name of folder to the second parameter
app.listen(8080, () => {
    console.log("App listening on port 8080");
}); // Listening to port 8080

// Middleware and static files
app.use(express.static("public")); // Makes all the files in the public folder available to public
// Log details of a request using third party middleware
app.use(morgan("dev"));
//app.use(morgan("tiny"));

// Log details of a request
/*app.use((req, res, next) => { 
    console.log("New request made");
    console.log("Host:", req.hostname);
    console.log("Path:", req.path);
    console.log("Method:", req.method);
    console.log();
    next();
});*/

app.get("/", (req, res) => { // GET request listener
    const blogs = [{title: "Yoshi finds eggs", snippet: "Lorem ipsum dolor sit amet"}, 
                   {title: "Mario finds stars", snippet: "Lorem ipsum dolor sit amet"},
                   {title: "How to defeat bowser", snippet: "Lorem ipsum dolor sit amet"}];
    res.render("index", {title: "Home", blogs}); // Sends an object to index.ejs
});

app.get("/about", (req, res) => {
    res.render("about", {title: "About"});
});

app.get("/blogs/create", (req, res) => {
    res.render("create", {title: "Create a new blog"});
});

app.use((req, res) => { // Always fire if it reaches this point
    res.status(404).render("404", {title: "ERROR 404"});
});