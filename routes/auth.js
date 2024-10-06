// controllers/auth.js
const express = require("express");
const router = express.Router();
const AuthController =require ("../controllers/auth")

router.route("/register").post(AuthController.register);
router.route("/update").post(AuthController.updateUserByEmail);


module.exports = router;
