var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/meanhotel';

// Connect to mongoDB using mongoose
mongoose.connect(dburl);

// Listening for when the connection has been made and passing a callback function when that happens
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dburl);
});

// Listening for when the disconnection has been made and passing a callback function when that happens
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// Listening for when the error has been made and passing a callback function when that happens
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error ' + err);
});


// Mongoose listening process on disconnect and restart via terminal
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('mongoose disconnected through app termination (SIGINT)' );
        process.exit(0);
    });
});

process.on('SIGTERM', function() {
    mongoose.connection.close(function() {
        console.log('mongoose disconnected through app termination (SIGTERM)' );
        process.exit(0);
    });
});

process.once('SIGUSR2', function() {
    mongoose.connection.close(function() {
        console.log('mongoose disconnected through app termination (SIGUSR2)' );
        process.kill(process.pid, 'SIGUSR2');
    });
});


// Bring in schemas and models
require('./hotels.model.js');
