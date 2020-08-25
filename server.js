const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var db = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
// Routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/public", "index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname + "/public", "notes.html"));
});

app.get("/api/db",function(req,res){
    
    return res.json(db);
});

app.post("/api/db", function(req, res) {
    var newObject = req.body;
    db.push(newObject);
    fs.writeFileSync('./db/db.json',JSON.stringify(db),'utf8');
    res.json(db);
  });


app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
});