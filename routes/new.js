var new_ = exports;

var config = require('../config');
var dropbox = require('../dropbox');

new_.get = function(req, res) {
  var uid = req.session.uid;

  dropbox.validateUid(uid, function(err) {
    if (!err) {
      // the uid is good
      return res.send('soon');
    } else {
      // invalid uid? Just go back to root
      return res.redirect('/');
    }
  });
};