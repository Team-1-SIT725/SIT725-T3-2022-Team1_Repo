const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const alert = require("alert");

//For Register Page
const registerView = (req, res) => {
    res.render("register", {});
};

//Post Request for User registration
//Here, the inputs from the registration is being retrieved
const registerUser = (req, res) => {
    const { name, email, location, password, confirm } = req.body; //Here, the inputs from the registration is being retrieved

    if (!name || !email || !password || !confirm) {
        console.log("Fill empty fields"); //if the form fields are empty, it throws a message to the console
    }

    //Confirm Passwords
    if (password !== confirm) {
        console.log("Password must match");
        alert("Passwords do not match!"); //alerts user is passwords do not match
    } else {
        //Validation
        //It checks the database for the email typed in and checks if it already exists
        User.findOne({ email: email }).then((user) => {
            if (user) {
                console.log("email exists");
                alert("Email already exists!");
                
            } else {
                //Validation
                // if the email does not exist, it saves the users input to a variable "newUser"
                const newUser = new User({
                    name,
                    email,
                    location,
                    password,
                });
                //Password Hashing
                //This encrypts the password with bcrypt
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        newUser.password = hash;
                        newUser
                            .save() //password is saved after encryption
                            .then(res.redirect("/emailverification.html")) //user is redirected to the email verification page
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
//The log in funtion requires the email and password input from the form
const loginUser = (req, res) => {
    const { email, password } = req.body;

    //Checks to see if form fields are inputted
    if (!email || !password) {
        console.log("Please fill in all the fields");
        // res.render("login", {
        //     email,
        //     password,
        // });
    } else {
       //if all credentials are inputted as required it authenticates the user using passport
        passport.authenticate("local", {
            successRedirect: "/profile.html", //a successful authentication takes users to their profile
            failureRedirect: "/login.html", //a failed authentication takes users back to login
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
