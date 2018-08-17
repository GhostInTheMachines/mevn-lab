// adding suggestion for changing favicon module
// http://jonathanmccormick.me/blog/resolved-error-cannot-find-module-serve-static-in-node-js/
// modified to use express rather than connect
const express = require('express'),
serveStatic = require('serve-static');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// Require file system module
const fs = require('file-system');
const mongoose = require('mongoose');


const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/express_app', { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
    console.log("Connection Succeeded");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment first section below after placeing our favicon in /public
// app.use(serveStatic('public')); // changed from app.use(favicon())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // changed to false from book example
// fixed deprecation warning https://stackoverflow.com/questions/25471856/express-throws-error-as-body-parser-deprecated-undefined-extended
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Include controllers
fs.readdirSync('controllers').forEach(function (file) {
    if(file.substr(-3) == '.js') {
        const route = require('./controllers/' + file)
        route.controller(app)
    }
})


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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

app.listen(3000, function() { console.log('listening on 3000')})
module.exports = app;
