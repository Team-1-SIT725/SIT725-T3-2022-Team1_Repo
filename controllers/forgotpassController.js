const {
    requestPasswordReset,
    resetPassword,
    verifyEmail,
  } = require("../services/service");
  
//   const signUpController = async (req, res, next) => {
//     const signupService = await signup(req.body);
//     return res.json(signupService);
//   };
  
  const resetPasswordRequestController = async (req, res, next) => {
    const requestPasswordResetService = await requestPasswordReset(
      req.body.email
    );
    return res.redirect("/resetmessage.html");
    //return res.json(requestPasswordResetService);
  };
  
  const resetPasswordController = async (req, res, next) => {
    const resetPasswordService = await resetPassword(
      req.body.userId,
      req.body.token,
      req.body.password
    );
    return res.redirect("/successmessage.html");
    //return res.json(resetPasswordService);
  };

  const verifyEmailController = async (req, res, next) => {
    const verifyEmailService = await verifyEmail(
      req.body.email
    );
    return res.redirect("/verifyemail.html");
      //return res.json(verifyEmailService);
      // const text = "A link has been sent to your email."
      // return '<p>' + text + '</p>';
     // return { link };
    };
  
   
  module.exports = {
    resetPasswordRequestController,
    resetPasswordController,
    verifyEmailController,
  };