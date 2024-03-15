const express = require("express");
const app = express();
var hbs = require("hbs");

app.set("view engine", "hbs"); // Set view engine to handlebars
app.use(express.static("/Phase 2/public")) // Makes files in public accessible
app.listen(3000, () => {
    console.log("Listening on port 3000");
});

