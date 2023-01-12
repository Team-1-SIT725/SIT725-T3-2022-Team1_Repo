const express = require("express");

const accountRoutes = require("./accountRoutes.js");
const adminRoutes = require("./adminRoutes");
const itemRoutes = require("./itemRoutes");
const searchRoutes = require("./searchRoutes");
const messagesRoutes = require("./messagesRoutes");
const userProfilePrivateRoutes = require("./userProfilePrivateRoutes");
const userProfilePublicRoutes = require("./userProfilePublicRoutes");

const router = express.Router();

router.use("/account", accountRoutes);
router.use("/admin", adminRoutes);
router.use("/item", itemRoutes);
router.use("/search", searchRoutes);
router.use("/message", messagesRoutes);
router.use("/userProfilePrivate", userProfilePrivateRoutes);
router.use("/userProfilePublic", userProfilePublicRoutes);

module.exports = router;

// refer to https://medium.com/@cmpbilge/routing-with-nodejs-express-4ce79752e146 for how this routing system works.
