var express = require('express');
var path = require('path');
var skipper = require('skipper');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('./models/user')(mongoose);
require('./models/hotel')(mongoose);
require('./models/device')(mongoose);
require('./models/offers')(mongoose);
require('./models/ratings')(mongoose);
require('./models/upload')(mongoose);
require('./models/serviceslist')(mongoose);
require('./models/foodmenu')(mongoose);
require('./models/service')(mongoose);
require('./models/issue')(mongoose);
require('./models/staff')(mongoose);
require('./models/escalation')(mongoose);
require('./models/reservation')(mongoose);
require('./models/order')(mongoose);
require('./models/department')(mongoose);

var http = require('http');

var app = express();

var config = require('./Config/config.js');
var mongodb_connection_string = config.MONGO_SERVER_URL;



mongoose.connect(mongodb_connection_string);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    "use strict";
    console.log("mongo connected");
});



var routes = require('./routes/index');
var users = require('./routes/users');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(skipper());
app.use(function(req, res, next) {

    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Accept,Authorization');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/api', users);



// app.use(function(req, res, next) {
//     res.set('Access-Control-Allow-Origin', '*');
//     res.set('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Headers');
//     next();
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



/**
 * Listen on provided port, on all network interfaces.
 */

app.listen(process.env.PORT || 5000, function () {
    console.log( "Listening on 5000" );
});

app.on('error', onError);



/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}


module.exports = app;

