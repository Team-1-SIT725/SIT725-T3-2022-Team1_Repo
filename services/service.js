const User = require("../models/User");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const alert = require("alert");

const bcryptSalt = 10;

//This function requires an email input from the user
const requestPasswordReset = async (email, res) => {
    const user = await User.findOne({ email }); //here the function findOne searches the database to find the user
    if (!user) {
        throw new Error("User not found"); //throws an error if token is invalid
    } //if user not found it throws an error

    let token = await Token.findOne({ userId: user._id }); //here it finds the token assigned to that user
    if (token) await token.deleteOne(); //after it is found it deletes the token

    let resetToken = crypto.randomBytes(32).toString("hex"); // a new token is created for the new password reset
    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

    // here the new token is saved
    await new Token({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
    }).save();

    const link = `localhost:3000/resetpassword.html?token=${resetToken}&id=${user._id}`; //link embedded in the resetpassword email as configured here - utils\template\requestResetPassword.handlebars

    //sendEmail function is triggered after the above process
    sendEmail(
        user.email,
        "Password Reset Request", //email subject
        {
            name: user.name,
            link: link,
        },
        "./template/requestResetPassword.handlebars" //this points to a template in the utils folder which contains the email message.
    );
    const text = "A link has been sent to your email.";
    return "<p>" + text + "</p>";
};

//When the user gets an email to reset password, the link
//embedded in the email redirects them to a page were they insert their new password
//when new password is inputted and sumbit button clicked, it initiates the resetPassword function
const resetPassword = async (userId, token, password) => {
    let passwordResetToken = await Token.findOne({ userId });

    if (!passwordResetToken) {
        throw new Error("Invalid or expired password reset token"); //throws an error if token is invalid
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

    //an email is sent to the user after the password reset has been successful
    sendEmail(
        user.email,
        "Password Reset Successfully", //email subject
        {
            name: user.name,
        },
        "./template/resetPassword.handlebars" //template containing email message to users
    );

    await passwordResetToken.deleteOne(); //deletes generated token

    return { message: "Password reset was successful" };
};

//new users require their email to be verified before using the application
//this function enables that/ It requires users to insert email address and click submit
const verifyEmail = async (email, res) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Email does not exist"); //the email is being serached in the database and if not found throws an error.

    const link2 = `localhost:3000/login.html`; //link embedded in email message for email verification
    sendEmail(
        user.email,
        "Email Verification", //email subject
        {
            name: user.name,
            link: link2,
        },
        "./template/verifyemail.handlebars" //template containing email message
    );

    const text = "A link has been sent to your email.";
    return "<p>" + text + "</p>";
};

module.exports = {
    requestPasswordReset,
    resetPassword,
    verifyEmail,
};
