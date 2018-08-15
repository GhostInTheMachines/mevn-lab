// adding suggestion for changing favicon module
// http://jonathanmccormick.me/blog/resolved-error-cannot-find-module-serve-static-in-node-js/
// modified to use express rather than connect
var express = require('express'),
serveStatic = require('serve-static');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


// var routes = require('./routes/index');  This is wrong in the book which
// has this ass var index = require('./routes/index');
// since the next step deletes the routes directory, we can assume the author
// meant to say get rid of var routes instead

// var users = require('./routes/users');
var app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost:27017)/express_app', function() {
    console.log('Connection has been made');
})
.catch(err => {
    console.error('App starting error:', err.stack);
    process.exit(1);
});

// Require file system module
var fs = require('file-system');

// Include controllers
fs.readdirSync('controllers').forEach(function (file) {
    if(file.substr(-3) == '.js') {
        const route = require('./controllers/' + file)
        route.controller(app)
    }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(serveStatic('public')); // changed rom app.use(favicon())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
// fixed deprecation warning https://stackoverflow.com/questions/25471856/express-throws-error-as-body-parser-deprecated-undefined-extended
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/users', users);

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
