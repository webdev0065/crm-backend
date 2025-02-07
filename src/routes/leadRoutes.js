const express = require('express');
const { createdLead, getLeads, getLeadById, updateLead, deleteLead } = require('../controllers/leadController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * /api/leads:
 *   post:
 *     summary: Create a new lead
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Leads
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               phone:
 *                 type: string
 *                 example: "+123456789"
 *               company:
 *                 type: string
 *                 example: "ABC Corp"
 *               status:
 *                 type: string
 *                 enum: [ "New", "In Progress", "Converted" ]
 *                 example: "New"
 *               assignedTo:
 *                 type: string
 *                 example: "5fbe26a729a244f03908ac93"
 *     responses:
 *       201:
 *         description: Successfully created a lead
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', authMiddleware, createdLead);

/**
 * @swagger
 * /api/leads:
 *   get:
 *     summary: Get all leads
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Leads
 *     responses:
 *       200:
 *         description: Successfully retrieved leads
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/', authMiddleware, getLeads);

/**
 * @swagger
 * /api/leads/{id}:
 *   put:
 *     summary: Update a lead
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Leads
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *               email:
 *                 type: string
 *                 example: "jane@example.com"
 *     responses:
 *       200:
 *         description: Successfully updated the lead
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Lead not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authMiddleware, updateLead);

/**
 * @swagger
 * /api/leads/{id}:
 *   delete:
 *     summary: Delete a lead
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Leads
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the lead
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Lead not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authMiddleware, deleteLead);

module.exports = router;
