// controllers/settingsController.js
const multer = require('multer');
const path = require('path');
const Settings = require('../models/settings');

// Setup multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store images in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with a timestamp to prevent overwriting
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
}).single('image'); // 'image' is the name attribute of the file input

// Save settings (POST request) with image upload
const saveSettings = async (req, res) => {
  try {
    // Handle image upload
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: 'Image upload failed', message: err.message });
      }

      const { fullName, agencyName, email, mobile, agencyAddress, password } = req.body;
      const image = req.file ? req.file.path : null; // If image is uploaded, use the path; otherwise, null

      // Validation for required fields (excluding password)
      if (!fullName || !agencyName || !email || !mobile || !agencyAddress) {
        return res.status(400).json({ error: 'All fields except password are required' });
      }

      // Create a settings object with the provided fields
      const newSettings = new Settings({
        fullName,
        agencyName,
        email,
        mobile,
        agencyAddress,
        password: password || null,
        image,
      });

      // Save settings to the database
      await newSettings.save();
      return res.status(200).json({ message: 'Settings saved successfully', data: newSettings });
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to save settings', message: error.message });
  }
};

// Update password (PUT request)
const updatePassword = async (req, res) => {
  try {
    const { password } = req.body;

    // Validation for password field
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const updatedSettings = await Settings.findOneAndUpdate({}, { password }, { new: true });
    return res.status(200).json({ message: 'Password updated successfully', data: updatedSettings });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update password', message: error.message });
  }
};

module.exports = { saveSettings, updatePassword };
