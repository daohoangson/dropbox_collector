var list = exports;

var config = require('../config');
var dropbox = require('../dropbox');

list.get = function(req, res) {
  var uid = req.session.uid;

  dropbox.validateUid(uid, function(err) {
    if (!err) {
      // the uid is good
      var options = {

      };

      dropbox.getMetadata(uid, '.', options, function(err, metadata) {
        if (!err) {
          var collections = [];
          for (var i = metadata.contents.length - 1; i >= 0; i--) {
            var content = metadata.contents[i];
            if (content.is_dir) {
              collections.push(content);
            }
          };

          return res.render('list', {
            'title': config.phrases.title,

            'uid': uid,
            'collections': collections
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