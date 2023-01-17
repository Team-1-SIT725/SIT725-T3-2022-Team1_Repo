const express = require("express");


const itemRoutes = require("./itemRoutes");
const userProfilePrivateRoutes = require("./userProfilePrivateRoutes");
const addressVarificationRoutes = require("./addressVarificationRoutes");
const profileroute=require("./profile");
const router = express.Router();


router.use("/item", itemRoutes);
router.use("/userProfilePrivate", userProfilePrivateRoutes);
router.use("/addressVarification", addressVarificationRoutes);
router.use("/profile",profileroute);
module.exports = router;

// refer to https://medium.com/@cmpbilge/routing-with-nodejs-express-4ce79752e146 for how this routing system works.

