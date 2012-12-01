var config = require('../config');
var dropbox = require('../dropbox.js');

exports.index = function(req, res) {
  var uidQuery = req.query.uid;
  if (typeof uidQuery == 'string') {
    // TODO: remove debug code
    req.session.uid = uidQuery;
  }

  var uid = req.session.uid;

  dropbox.validateUid(uid, function(err) {
    if (!err) {
      // the uid is good
      return res.redirect(config.routes.list);
    } else {
      dropbox.requestToken(function(err, token, secret) {
        if (!err) {
          var callbackUrl = 'http://' + config.http.host_name + ':' + config.http.port + config.routes.callback;
          var authorizeUrl = 'https://www.dropbox.com/1/oauth/authorize?oauth_token=' + token + '&oauth_callback=' + callbackUrl;

          return res.redirect(authorizeUrl); 
        } else {
          return res.send(config.phrases.error);
        }
      });
    }
  });
};