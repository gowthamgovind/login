const express = require("express");
const app = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const multer = require("multer");
const upload = multer();
const Speakeasy = require('speakeasy');
const axios = require('axios');
// User Model
const User = require("../../models/User");
const config = require("../../config/keys");
var passport = require("passport");
app.use(passport.initialize()); 
// @route   POST api/auth
// @desc    Auth user
// @access  Public
app.post("/login", upload.none(), (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ email: "User Does not exist" });

    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch)
        return res.status(400).json({ password: "Invalid credentials" });
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
        isAdmin: user.isAdmin,
      };
      jwt.sign(
        payload,
        config.jwtSecret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user });
        }
      );
    });
  });
});



app.post("/mobilelogin", upload.none(), (req, res) => {
  const { mobileNumber} = req.body;
  // Simple validation
  if (!mobileNumber) {
    return res.status(400).json({ msg: "Please Enter Mobile number" });
  }

  // Check for existing user
  User.findOne({ mobileNumber }).then(user => {
    if (!user) return res.status(404).json({ mobileNumber: "User Does not exist" });
		
	var data = {
		"token" : Speakeasy.totp({
			secret: config.speakeasySecret,
			encoding: "base32"
		}),
		"remaining" : (30 - Math.floor((new Date().getTime() / 1000 % 30)))
	}
	var messageData = "OTP for logging in is " + data.token + ".";
	var bodyFormData =  
		{ 
    api_key: config.nexmoKey,
    api_secret: config.nexmoSecret,
			to: '91'+mobileNumber,
			from: 'NEXMO',
			text: messageData,
		} 
		res.json({messageData});
	axios({
    method: 'post',
    url: 'https://rest.nexmo.com/sms/json',
    data: bodyFormData,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
		if(response.status == 200)
		{
    	res.json({msg: "SMS Sent Successfully"});
		}
		else
		{
      res.json({ msg: "SMS Sending failed" });
		}
		
    })
    .catch(function (response) {
      res.json({ msg: "SMS Sending failed" });
    });

    });
  });


app.post("/otpValidate",upload.none(),(req,res) => {
	var mobileNumber = req.body.mobileNumber;

		var valid = Speakeasy.totp.verify({
			secret: config.speakeasySecret,
			encoding: "base32",
			token: req.body.otp,
			window: 1
		});
	if( valid  )
	{
	  User.findOne({ mobileNumber }).then(user => {	
      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
        isAdmin: user.isAdmin,
      };
	  jwt.sign(
        payload,
        config.jwtSecret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
		  
          res.json({ token, user });
        }
      );
    });
	}
	else
	{
		res.json({msg: "OTP Expired.Generate a new one"})
	}
})

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })  
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  function (req, res) {
    var token = req.user.token;    
    res.redirect("https://obscure-fjord-82427.herokuapp.com/signup?token=" + token + "?email=" + req.user.email + "?name=" + req.user.name) ;
  }
);
// @route   GET api/auth/user
// @desc    Get user data
// @access  Private

app.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});
module.exports = app;
