const express = require("express");
const app = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const upload = multer();
const config = require("../../config/keys");
const User = require("../../models/User");

app.post("/signup", upload.none(), (req, res) => {  
  const { name, email, password, mobileNumber, isAdmin } = req.body;
  if (!name) {
    return res.status(400).json({ msg: "Please enter name" });
  }
  if (!email) {
    return res.status(400).json({ msg: "Please enter email" });
  }
  if (!password) {
    return res.status(400).json({ msg: "Please enter password" });
  }
  if (!mobileNumber) {
    return res.status(400).json({ msg: "Please enter mobile number" });
  }
  if (mobileNumber.length < 10) {
    return res.status(400).json({ msg: "Please enter valid mobile number" });
  }
  if (!isAdmin) {
    return res.status(400).json({ msg: "Please select" });
  }

  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });
    
    const newUser = new User({
      name,
      email,
      password,
      mobileNumber,
      isAdmin
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            {
              id: user.id,
              name: user.name,
              email: user.email,
              mobileNumber: user.mobileNumber,
              isAdmin: user.isAdmin, 
            },
            config.jwtSecret,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  mobileNumber: user.mobileNumber,
                  isAdmin: user.isAdmin,
                }
              });
            }
          );
        });
      });
    });
  });
});

app.get("/getusers", (req, res) => {
  User.find(function(err, users) {
    if (err) {
      res.json(err);
    } else {
      res.json(users);
    }
  });
});

module.exports = app;
