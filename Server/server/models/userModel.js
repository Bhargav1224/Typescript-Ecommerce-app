const mongoose = require("mongoose");
// const roleModel = require("./roleModel");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // role: {
  //   type: Schema.Types.ObjectId,
  //   ref: "roles",
  // },
  accessToken: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
