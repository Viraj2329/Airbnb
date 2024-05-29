const express = require("express");
const router = express.Router();
const wrapAsync = require("../untility/wrapAsync.js");
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

//Using router.route method reduce code
//SIGNUP
router.route("/signup")
.get(userController.renderSignupForm)   //Signup GET route
.post(wrapAsync(userController.signup));   //Signup POST route


//LOGIN
router.route("/login")
.get(userController.renderLoginForm)   //Login GET Route
.post(saveRedirectUrl, passport.authenticate("local", {     //Login POST Route 
    failureRedirect: '/login', 
    failureFlash: true }),
    userController.login 
    );


router.get("/logout", userController.logout);

module.exports = router;