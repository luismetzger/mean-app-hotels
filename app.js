require('./api/data/db.js');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');


// Requiring all the routes in the api directory
var routes = require('./api/routes');

// defining the port
app.set('port', 3000);

// Middleware
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});


// accessing static pages from public directory
app.use(express.static(path.join(__dirname, 'public')));


// Middleware before routes are rendered that deals with any forms that are POSTED
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api', routes);


// Server listening
var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log("Magic happens on port " + port);
});
