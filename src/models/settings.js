// models/settingsModel.js
const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  agencyName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  agencyAddress: { type: String, required: true },
  password: { type: String, required: false },
  image: { type: String, required: false }, // Added image field
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
