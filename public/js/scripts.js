const resetToken = require("../services/service")
const crypto = require("crypto");
const bcrypt = require("bcrypt");

document.getElementById("token").value = resetToken;