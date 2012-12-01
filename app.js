
/**
 * Module dependencies.
 */

var express = require('express')
  , expose = require('express-expose')
  , http = require('http')
  , path = require('path');

var app = express();
var config = require('./config');

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));

  app.locals({ config: config });
  app.expose(config, 'config');

  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: config.http.session_secret
  }));

  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', require('./routes').index);
app.get(config.routes.callback, require('./routes/callback').get);
app.get(config.routes.list, require('./routes/list').get);
app.get(config.routes.new, require('./routes/new').get);
app.get(config.routes.collections + '/:uid/:collection', require('./routes/collection').get);
app.post(config.routes.upload, require('./routes/collection').upload);

http.createServer(app).listen(config.http.port, function(){
  console.log("Express server listening on port " + config.http.port);
});
