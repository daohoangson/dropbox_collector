var config = require('./config').config;

exports.app = require('dbox').app({
  'app_key': config.dropbox.app_key,
  'app_secret': config.dropbox.app_secret
});