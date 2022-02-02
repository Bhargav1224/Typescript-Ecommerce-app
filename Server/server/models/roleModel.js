const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  roleName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  attributes: {
    type: Array,
    default: [],
    trim: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Role = mongoose.model("roles", RoleSchema);

module.exports = Role;
