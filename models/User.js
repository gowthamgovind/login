const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    mobileNumber: {
      type: Number,
      required: true
    },
    isAdmin: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  },
  {
    collection: "login_users"
  }
);

module.exports = User = mongoose.model("User", UserSchema);
