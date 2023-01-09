const JWT = require("jsonwebtoken");
const User = require("../models/User");
const Token = require("../models/Token");
const sendEmail = require("../utils/sendEmail");
//const sendEmail2 = require("../utils/sendEmail2");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const JWTSecret = "mfefkuhio3k2rjkofn2mbikbkwjhnkj";
const bcryptSalt = 10;
const clientURL = "http://localhost:3000";

const verifyEmail = async (email, res) => {
    const user = ({ email });
    
    const link2 = `localhost:3000/login.html`;
   // const link = `localhost:3000/resetpassword.html`
    sendEmail(
      user.email,
      "Email Verification",
      {
        name: user.name,
        link: link2,
      },
      "./template/verifyemail.handlebars"
    );
    const text = "A link has been sent to your email."
    return '<p>' + text + '</p>';
   // return { link };
  };

  module.exports = {
    verifyEmail,
  };