var collection = exports;

var fs = require('fs');

var config = require('../config');
var dropbox = require('../dropbox');

collection.get = function(req, res) {
  var uid = req.params.uid;
  var collection = req.params.collection;

  dropbox.validateUid(uid, function(err) {
    if (!err) {
      // the uid is good
      var options = {

      };

      dropbox.getMetadata(uid, collection, options, function(err, metadata) {
        if (!err) {
          var files = [];
          for (var i = metadata.contents.length - 1; i >= 0; i--) {
            var content = metadata.contents[i];
            if (!content.is_dir) {
              files.push(content);
            }
          };

          res.render('collection_view', {
            'title': collection,

            'uid': uid,
            'collection': collection,
            'files': files
          });
        } else {
          return res.send(config.phrases.error);
        }
      });
    } else {
      // invalid uid? Just go back to root
      return res.redirect('/');
    }
  });
};

collection.upload = function(req, res) {
  var uid = req.body.uid;
  var collection = req.body.collection;
  var file = req.files.files;

  dropbox.validateUid(uid, function(err) {
    if (!err) {
      // the uid is good
      fs.readFile(file.path, function(err, data) {
        // according to nodejs.org, if no encoding is 
        // specified, the data returned will be a Buffer
        if (!err) {
          var options = {

          };

          dropbox.putFile(uid, collection + '/' + file.name, data, options, function(err) {
            if (!err) {
              return res.redirect(config.routes.collection + '/' + uid + '/' + collection);
            } else {
              return res.send(config.phrases.error);
            }
          });
        } else {
          return res.send(config.phrases.error);
        }
      });
    } else {
      // invalid uid? Just go back to root
      return res.redirect('/');
    }
  });
};