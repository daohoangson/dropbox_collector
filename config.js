var config = exports;

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
  session_secret: process.env.SESSION_SECRET || 'lorem ipsum',
  host_name: process.env.HOST_NAME,
  port: process.env.PORT || 29690
};

if (typeof config.http.host_name !== 'string') {
  console.error('HOST_NAME env variable missing');
  process.exit(-1);
}

config.errors = {
  dropbox_request_token: 1,
  dropbox_access_token: 2,
  dropbox_invalid_uid: 3,
  dropbox_client_metadata: 4,
  dropbox_client_put: 5,

  unknown: 9999
};

config.phrases = {
  title: 'DROLECT',

  new_collection: 'New Collection',

  error: 'ERROR'
};

config.routes = {
  callback: '/callback',
  list: '/list',
  new: '/new',
  collections: '/collections',
  files: '/files',
  upload: '/upload',
};