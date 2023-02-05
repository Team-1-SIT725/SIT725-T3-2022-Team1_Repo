const {
    requestPasswordReset,
    resetPassword,
    verifyEmail,
  } = require("../services/service"); //this declares the functions created in service.js file
  
  //this function waits for the execution of the requestPasswordReset function and uses the provided email to initiate paswword reset
  const resetPasswordRequestController = async (req, res, next) => {
    const requestPasswordResetService = await requestPasswordReset(
      req.body.email
    );
    return res.redirect("/resetmessage.html");
  };
  
//After the user clicks the reset link in email, the are redirected to a page were they have to provide a new password
//The token and user if is retried from URL parameters and inputed into a hidden form label
  const resetPasswordController = async (req, res, next) => {
    const resetPasswordService = await resetPassword(
      req.body.userId,
      req.body.token,
      req.body.password
    );
    return res.redirect("/successmessage.html"); //on success the user is redirected to a success message
  };

  //This function waits for the execution of the verifyEmail function and requires the email input from the form
  const verifyEmailController = async (req, res, next) => {
    const verifyEmailService = await verifyEmail(
      req.body.email
    );
    return res.redirect("/verifyemail.html");
    };
  
   
  module.exports = {
    resetPasswordRequestController,
    resetPasswordController,
    verifyEmailController,
  };