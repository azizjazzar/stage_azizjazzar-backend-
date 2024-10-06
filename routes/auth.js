// controllers/auth.js
const express = require("express");
const router = express.Router();
const AuthController =require ("../controllers/auth")

router.route("/register").post(AuthController.register);
router.route("/test").get(AuthController.test);


module.exports = router;
