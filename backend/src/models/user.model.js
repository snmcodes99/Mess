const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    required: true,
    unique: true,
  },
  email: String,
  name: String,
  picture: String,
  email_verified: Boolean,
  lastLogin: Date,
  role: {
    type: String,
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);
