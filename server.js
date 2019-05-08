/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    Const = require('./shared/constants').constant,

    game = require('./lib/serverSideGame');

var app = express();

// all environments
app.set('port', Const.SERVER_PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/flappybirds', routes.flappybirds);

// Route to get shared const file
app.get('/shared/constants.js', function (req, res) {
    res.sendfile('shared/constants.js');
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

game.startServer();