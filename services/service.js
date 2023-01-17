const JWT = require("jsonwebtoken");
const User = require("../models/User");
const Token = require("../models/Token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const JWTSecret = "mfefkuhio3k2rjkofn2mbikbkwjhnkj";
const bcryptSalt = 10;
const clientURL = "http://localhost:3000";

// const signup = async (data) => {
//   let user = await User.findOne({ email: data.email });
//   if (user) {
//     throw new Error("Email already exist", 422);
//   }
//   user = new User(data);
//   const token = JWT.sign({ id: user._id }, JWTSecret);
//   await user.save();

//   return (data = {
//     userId: user._id,
//     email: user.email,
//     name: user.name,
//     token: token,
//   });
// };

const requestPasswordReset = async (email, res) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Email does not exist");

  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();

  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));
 

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `localhost:3000/resetpassword.html?token=${resetToken}&id=${user._id}`;
 // const link = `localhost:3000/resetpassword.html`
  sendEmail(
    user.email,
    "Password Reset Request",
    {
      name: user.name,
      link: link,
    },
    "./template/requestResetPassword.handlebars"
  );
  const text = "A link has been sent to your email."
  return '<p>' + text + '</p>';
 // return { link };
};

const resetPassword = async (userId, token, password) => {
  let passwordResetToken = await Token.findOne({ userId });

  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }

  console.log(passwordResetToken.token, token);

  const isValid = await bcrypt.compare(token, passwordResetToken.token);

  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }

  const hash = await bcrypt.hash(password, Number(bcryptSalt));

  await User.updateOne(
    { _id: userId },
    { $set: { password: hash } },
    { new: true }
  );

  const user = await User.findById({ _id: userId });

  sendEmail(
    user.email,
    "Password Reset Successfully",
    {
      name: user.name,
    },
    "./template/resetPassword.handlebars"
  );

  await passwordResetToken.deleteOne();

  return { message: "Password reset was successful" };

};

const verifyEmail = async (email, res) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Email does not exist");
    
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
    
    // return res.redirect("/login.html");
    const text = "A link has been sent to your email."
    return '<p>' + text + '</p>';
   // return { link };
  };

module.exports = {
  requestPasswordReset,
  resetPassword,
  verifyEmail,
};