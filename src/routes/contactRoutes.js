// /routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lead:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               position:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created successfully
 *       400:
 *         description: Invalid data
 */
// routes/contactRoutes.js
router.post("/", contactController.createContact);


/**
 * @swagger
 * /api/contacts/{leadId}:
 *   get:
 *     summary: Get contacts by lead ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: leadId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the lead to get associated contacts
 *     responses:
 *       200:
 *         description: Contacts retrieved successfully
 *       400:
 *         description: Invalid lead ID
 */
router.get("/:leadId", contactController.getContacts);

/**
 * @swagger
 * /api/contacts{id}:
 *   put:
 *     summary: Update a contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lead:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               position:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *       400:
 *         description: Invalid data
 */
router.put("/:id", contactController.updateContact);

/**
 * @swagger
 * /api/contacts{id}:
 *   delete:
 *     summary: Delete a contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID to be deleted
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *       400:
 *         description: Contact not found
 */
router.delete("/:id", contactController.deleteContact);

module.exports = router;
