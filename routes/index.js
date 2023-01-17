const express = require("express");


const itemRoutes = require("./itemRoutes");
const userProfilePrivateRoutes = require("./userProfilePrivateRoutes");
const addressVarificationRoutes = require("./addressVarificationRoutes");
const router = express.Router();


router.use("/item", itemRoutes);
router.use("/userProfilePrivate", userProfilePrivateRoutes);
router.use("/addressVarification", addressVarificationRoutes);
module.exports = router;

// refer to https://medium.com/@cmpbilge/routing-with-nodejs-express-4ce79752e146 for how this routing system works.

