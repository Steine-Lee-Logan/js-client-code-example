"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var index_1 = require("./routes/index");
var user_1 = require("./routes/user");
var ingram_1 = require("./routes/ingram");
var app = express();
var bodyParser = require('body-parser');
var soap = require('soap');
var apiWSDL = 'https://cws.ingrambook.com/CWS/companion.asmx?wsdl';
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/', index_1.default);
app.use('/users', user_1.default);
app.use('/ingram', ingram_1.default);
app.post('/ingram/test_api', function (req, res) {
    //console.log('headers: ' + JSON.stringify(req.headers));
    //console.log('body: ' + JSON.stringify(req.body));
    var retData = {
        headers: req.headers,
        body: req.body,
        error: ''
    };
    soap.createClient(apiWSDL, function (err, client) {
        if (err) {
            console.log(err);
            //throw new Error(err);
        }
        //let soapHeaders: string = '<com:UserInfo><com:UserName>p0Z_251</com:UserName></com:UserInfo>';
        var soapHeaders = { 'UserInfo': { 'UserName': 'p0Z_251' } };
        client.addSoapHeader(soapHeaders);
        console.log(client.soapHeaders);
        var args = {
            queryType: 1,
            query: 'kw=book'
        };
        client.SearchRequestEnhanced(args, function (err, result) {
            if (err) {
                //throw new Error(err);
                console.log(err);
            }
            //res.send(retData);
            console.log(result);
        });
    });
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
    app.use(function (err, req, res, next) {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;
//# sourceMappingURL=app.js.map