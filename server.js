const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);


app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
});