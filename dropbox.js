var dropbox = exports;
var config = require('./config');

var app = require('dbox').app({
  'app_key': config.dropbox.app_key,
  'app_secret': config.dropbox.app_secret
});

dropbox.requestToken = function(cb) {
  // var cb = function(err, token, secret) {};
  app.requesttoken(function(status, result) {
    console.info('dropbox.requestToken', status, result);

    if (status == 200) {
      dropbox.saveRequestToken(result.oauth_token, result.oauth_token_secret);

      return cb(false, result.oauth_token, result.oauth_token_secret);
    } else {
      return cb(config.errors.dropbox_request_token, '', '');
    }
  });
};

dropbox.exchangeAccessToken = function(requestToken, cb) {
  // var cb = function(err, uid) {};
  dropbox.getRequestTokenSecret(requestToken, function(err, requestToken, requestTokenSecret) {
    var data = {
      oauth_token: requestToken,
      oauth_token_secret: requestTokenSecret
    };

    app.accesstoken(data, function(status, result) {
      console.info('dropbox.exchangeAccessToken', status, result);

      if (status == 200) {
        dropbox.saveAccessToken(result.uid, result.oauth_token, result.oauth_token_secret);

        return cb(false, result.uid);
      } else {
        return cb(config.errors.dropbox_access_token, '');
      }
    });
  });
};

dropbox.validateUid = function(uid, cb) {
  // var cb = function(err) {};
  if (typeof uid == 'string' && uid.length > 0) {
    return cb(false);
  } else {
    return cb(config.errors.dropbox_invalid_uid);
  }
};

dropbox.getMetadata = function(uid, path, options, cb) {
  // var cb = function(err, metadata) {};
  dropbox.getAccessToken(uid, function(err, accessToken, accessTokenSecret) {
    console.info('dropbox.getMetadata', uid, accessToken, accessTokenSecret);

    var client = app.client({
      oauth_token: accessToken,
      oauth_token_secret: accessTokenSecret
    });

    if (typeof options != 'object') options = {};

    client.metadata(path, options, function(status, metadata) {
      console.info('dropbox.getMetadata', status, metadata);

      if (status == 200) {
        return cb(false, metadata);
      } else {
        return cb(config.errors.dropbox_client_metadata, null);
      }
    });
  });
};

dropbox.putFile = function(uid, path, data, options, cb) {
  // var cb = function(err, metadata) {};
  dropbox.getAccessToken(uid, function(err, accessToken, accessTokenSecret) {
    console.info('dropbox.putFile', uid, accessToken, accessTokenSecret);

    var client = app.client({
      oauth_token: accessToken,
      oauth_token_secret: accessTokenSecret
    });

    if (typeof options != 'object') options = {};

    client.put(path, data, options, function(status, metadata) {
      console.info('dropbox.putFile', status, metadata);

      if (status == 200) {
        return cb(false, metadata);
      } else {
        return cb(config.errors.dropbox_client_put, null);
      }
    });
  });
};

var requestTokens = {};
dropbox.saveRequestToken = function(token, secret, cb) {
  // var cb = function(err) {};
  requestTokens[token] = secret;

  if (typeof cb == 'function') {
    return cb(false);
  }
};
dropbox.getRequestTokenSecret = function(token, cb) {
  // var cb = function(err, token, secret) {};
  var secret = '';
  if (typeof requestTokens[token] !== 'undefined') {
    secret = requestTokens[token];
  }

  if (typeof cb == 'function') {
    return cb(false, token, secret);
  }
};

var accessTokens = {};
// TODO: remove debug code
accessTokens[17413580] = {
  token: 'ky4yiq10a65vv8i',
  secret: 'vnv94dsn2sc63qc'
};
dropbox.saveAccessToken = function(uid, token, secret, cb) {
  // var cb = function(err) {};
  accessTokens[uid] = {
    token: token,
    secret: secret
  };

  if (typeof cb == 'function') {
    return cb(false);
  }
};
dropbox.getAccessToken = function(uid, cb) {
  // var cb = function(err, token, secret) {};
  var token = '';
  var secret = '';
  if (typeof accessTokens[uid] !== 'undefined') {
    token = accessTokens[uid].token;
    secret = accessTokens[uid].secret;
  }

  if (typeof cb == 'function') {
    return cb(false, token, secret);
  }
};