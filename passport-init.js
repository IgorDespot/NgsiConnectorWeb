const db = require('./db');
const { Strategy } = require('passport-local');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.users.findById(id, (error, user) => {
      if (error) {
        return done(error);
      }
      return done(null, user);
    });
  });

  passport.use(new Strategy((username, password, done) => {
    db.users.findByUsername(username, (error, user) => {
      if (error) {
        return done(error);
      }
      if (!user) {
        return done(null, false, {
          message: 'Invalid username or password'
        });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Invalid username or password' });
      }
      return done(null, user);
    });
  }));
};
