var express    = require('express');
var bodyParser = require('body-parser');
var path       = require('path');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/static'));

app.listen(3000);
