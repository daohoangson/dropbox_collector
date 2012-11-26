var dropboxApp = require('../dropbox.js').app;

exports.index = function(req, res){
  console.log()
  dropboxApp.requesttoken(function(status, request_token){
    console.log(status);
    console.log(request_token);

    res.redirect(request_token.authorize_url);
  });
};