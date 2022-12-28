const express = require("express");

const accountRoutes = require("./accountRoutes.js");
const adminRoutes = require("./adminRoutes");
const itemRoutes = require("./itemRoutes");
const itemSearchRoutes = require("./itemSearchRoutes");
const messagesRoutes = require("./messagesRoutes");
const userProfilePrivateRoutes = require("./userProfilePrivateRoutes");
const userProfilePublicRoutes = require("./userProfilePublicRoutes");

const router = express.Router();

router.use("/account", accountRoutes);
router.use("/admin", adminRoutes);
router.use("/item", itemRoutes);
router.use("/itemSearch", itemSearchRoutes);
router.use("/message", messagesRoutes);
router.use("/userProfilePrivate", userProfilePrivateRoutes);
router.use("/userProfilePublic", userProfilePublicRoutes);

module.exports = router;

// refer to https://medium.com/@cmpbilge/routing-with-nodejs-express-4ce79752e146 for how this routing system works.

// module.exports = {
//   accountRoutes: require("./accountRoutes.js"),
//   adminRoutes: require("./adminRoutes"),
//   itemRoutes: require("./itemRoutes"),
//   itemSearchRoutes: require("./itemSearchRoutes"),
//   messagesRoutes: require("./messagesRoutes"),
//   userProfilePrivateRoutes: require("./userProfilePrivateRoutes"),
//   userProfilePublicRoutes: require("./userProfilePublicRoutes"),
// };
