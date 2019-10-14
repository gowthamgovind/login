const express = require("express");
const app = express.Router();
const multer = require("multer");
const path = require("path");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    //cb(null, path.join(__dirname, 'public/documents/'+req.body.user+'/'+req.body.name+'/'));
    cb(null, path.join(__dirname, "../../public/documents/"));
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });

const Users = require("../../models/User");





app.get("/dashboard", (req, res) => {
  Techs.find(function(err, techss) {
	res.json("Welcome");
  });
});



module.exports = app;
