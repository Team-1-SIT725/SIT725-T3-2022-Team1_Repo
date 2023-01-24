const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const alert = require('alert');

//For Register Page
const registerView = (req, res) => {
  res.render("register", {});
};

//Post Request for Register

const registerUser = (req, res) => {
  const { name, email, location, password, confirm } = req.body;

  if (!name || !email || !password || !confirm) {
    console.log("Fill empty fields");
  }

  //Confirm Passwords

  if (password !== confirm) {
    console.log("Password must match");
    alert("Passwords do not match!");
  } else {
    //Validation
    User.findOne({ email: email }).then((user) => {
      if (user) {
        console.log("email exists");
        alert("Email already exists!");
        // res.render("register", {
        //   name,
        //   email,
        //   password,
        //   confirm,
        // });
      } else {
        //Validation
        const newUser = new User({
          name,
          email,
          location,
          password,
        });
        //Password Hashing
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;
            newUser
              .save()
              .then(res.redirect("/emailverification.html"))
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
};

// For View
const loginView = (req, res) => {
  res.redirect("/login.html");
};

//Logging in Function

const loginUser = (req, res) => {
  const { email, password } = req.body;

  //Required
  if (!email || !password) {
    console.log("Please fill in all the fields");
    res.render("login", {
      email,
      password,
    });
    
  } 
  
  else {
    passport.authenticate("local", {
      successRedirect: "/profile.html",
      failureRedirect: "/login.html",
      failureFlash: true,
    })(req, res);
  }
  
};

module.exports = {
  registerView,
  loginView,
  registerUser,
  loginUser,
};
