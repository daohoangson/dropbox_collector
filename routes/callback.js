var callback = exports;

var config = require('../config');
var dropbox = require('../dropbox');

callback.get = function(req, res) {
  var requestToken = req.query.oauth_token;

  if (typeof requestToken !== 'string') {
    return res.send(config.phrases.error);
  }

  dropbox.exchangeAccessToken(requestToken, function(err, uid) {
    if (!err) {
      req.session.uid = uid;
      return res.redirect('/');
    } else {
      return res.send(config.phrases.error);
    }
  });
};