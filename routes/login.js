var express = require("express")
var router = express.Router();  

const {
    registerView,
    loginView,
    registerUser,
    loginUser,
  } = require("../controllers/loginController");
  const { dashboardView } = require("../controllers/dashboardController");
  const { protectRoute } = require("../auth/protect");
  const {resetPasswordRequestController, resetPasswordController,} = require("../controllers/forgotpassController");
  const { verifyEmail } = require("../controllers/emailverifyController");
  
  router.get("/register", registerView);
  router.get("/login", loginView);
  //Dashboard
  router.get("/dashboard", protectRoute, dashboardView);
  
  router.post("/register", registerUser);
  router.post("/login", loginUser);
  router.post("/requestPasswordReset", resetPasswordRequestController);
  router.post("/resetPassword", resetPasswordController);
  router.post("/verifyemail", verifyEmail);
  
  module.exports = router;