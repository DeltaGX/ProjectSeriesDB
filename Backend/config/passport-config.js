const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//load model
const User = require('../models/Schemas')

module.exports = function(passport) {
    passport.use(
      new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
          // Match user
        User.findOne({
          email: email
        }).then(user => {
          if (!user) {
            return done(null, false, { message: 'No Matching Email Registered' });
          }
          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              const token = jwt.sign({ id: user._id},process.env.JWT);
              const { password, isAdmin, ...otherDetails } = user._doc;
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });

        });
      })
    );
passport.serializeUser((User, done) => done(null, User.id))
passport.deserializeUser((id, done) => {
  User.findById(id, function(err, user) {
    done(err, user);
  });
})
}
