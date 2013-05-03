var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/lrs');
var users = db.get('users');

var passport = require('passport');
var LocalAPIKeyStrategy = require('passport-localapikey').Strategy;

passport.use(new LocalAPIKeyStrategy(
  function(apikey, done) {
    users.findOne({ apikey: apikey }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  users.findOne({ id: id }, function (err, user) {
    done(err, user);
  });
});