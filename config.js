exports.config = {};
var config = exports.config;

config.dropbox = {
  app_key: process.env.DROPBOX_APP_KEY,
  app_secret: process.env.DROPBOX_APP_SECRET
};

if (typeof config.dropbox.app_key !== 'string'
  || typeof config.dropbox.app_secret !== 'string') {
  console.error('DROPBOX_APP_KEY or DROPBOX_APP_SECRET env variable missing');
  process.exit(-1);
}

config.http = {
  port: process.env.PORT || 29690
};