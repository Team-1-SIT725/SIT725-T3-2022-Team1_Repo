var express = require("express");
var router = express.Router();

//the routes point each get and post action to a controller function which executes as instructed
const {
    registerView,
    loginView,
    registerUser,
    loginUser,
} = require("../controllers/loginController");
const { protectRoute } = require("../auth/protect");
const {
    resetPasswordRequestController,
    resetPasswordController,
    verifyEmailController,
} = require("../controllers/forgotpassController");

router.get("/register", registerView);
router.get("/login", loginView);


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/requestPasswordReset", resetPasswordRequestController);
router.post("/resetPassword", resetPasswordController);
router.post("/verifyEmail", verifyEmailController);

module.exports = router;
