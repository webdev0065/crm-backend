// routes/settingsRoutes.js
const express = require('express');
const { saveSettings, updatePassword } = require('../controllers/settingsController');
const router = express.Router();

/**
 * @swagger
 * /api/settings:
 *   post:
 *     summary: Save user settings, including image
 *     description: Save personal information, agency details, password, and image.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               agencyName:
 *                 type: string
 *               email:
 *                 type: string
 *               mobile:
 *                 type: string
 *               agencyAddress:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Settings saved successfully
 *       400:
 *         description: Missing fields in request or image upload failed
 *       500:
 *         description: Server error
 */
router.post('/settings', saveSettings);

/**
 * @swagger
 * /api/update-password:
 *   put:
 *     summary: Update user password
 *     description: Update the password for the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Missing password field
 *       500:
 *         description: Server error
 */
router.put('/update-password', updatePassword);

module.exports = router;
