const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: Number, default: 0 },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
