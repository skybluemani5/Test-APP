
var express      = require("express");
var app          = express();
var http         = require('http').Server(app);
var Session      = require('express-session');
var cookieParser = require('cookie-parser'); 
var bodyParser   = require('body-parser');
var async        = require('async');


app.use(cookieParser());

var Session = Session({
    secret:'hackerstillalive',
    saveUninitialized: true,
    resave: false
});

app.use(Session);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

var config =require('./middleware/config')(app,express);
var db = require("./middleware/db.js");
var auth_rout = require('./middleware/auth-routes.js')(app,db,bodyParser,async);

process.on('uncaughtException', function(err) {
    console.log(err);
});
http.listen(app.get('port'),function(){
    console.log("Listening on http://"+app.get('port'));
});
