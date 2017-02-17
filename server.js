var express = require('express');
//express help listen server incoming http request
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);

var assignment=require("./assignment/app.js");
assignment(app);
var port = process.env.PORT || 3000;

app.listen(port);