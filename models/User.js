const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVendor: { type: Boolean, required: true, default: false },
  companyName: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
});

module.exports = mongoose.model('User', UserSchema);
