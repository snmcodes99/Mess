const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    required: true,
    unique: true
  },
  email: String,
  role: {
    type: String,
    default: "user"
  }
})

module.exports = mongoose.model("User", userSchema)
