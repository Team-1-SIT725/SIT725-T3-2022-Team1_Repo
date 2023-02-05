const bcrypt = require("bcryptjs");
LocalStrategy = require("passport-local").Strategy; // passport-local is the strategy used for
// authenticating against a username and password stored 'locally' 
const alert = require("alert");
const User = require("../models/User");

const loginCheck = passport => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //Check customer

      User.findOne({ email: email }) //find users email in Mongo DB
        .then((user) => {
          if (!user) {
            console.log("wrong email");
            alert("no user found with this email");
            return done();
          }

          //Match Password
          bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) throw error;
            if (isMatch) {
              return done(null, user);
            } else {
              console.log("Wrong password");
              alert("incorrect password");
              return done();
            }
          });
        })
        .catch((error) => console.log(error));
    })
  );
    //storing the user id in the session using serializer
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

//  when we need the user model instance, we use the user id to search the database
  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(error, user);
    });
  });
};

module.exports = {
  loginCheck,
};