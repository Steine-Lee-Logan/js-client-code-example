import express = require('express');
import path = require('path');

import routes from './routes/index';
import users from './routes/user';
import ingram from './routes/ingram';

var app = express();
var bodyParser = require('body-parser');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/', routes);
app.use('/users', users);
app.use('/ingram', ingram);

app.post('/ingram/test_api', (req, res) => {
    console.log('headers: ' + JSON.stringify(req.headers));
    console.log('body: ' + JSON.stringify(req.body));

    let retData: any = {
        headers: req.headers,
        body: req.body
    }; 

    res.send(retData);
});

app.get('*', function (req, res) {
    res.sendStatus(404);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err: any, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
