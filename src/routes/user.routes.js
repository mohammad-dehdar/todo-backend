// user.routes.js
const express = require('express');
const router = express.Router();
const { protect, requireRole } = require('../middleware/auth.middleware');
const User = require('../models/user.model');

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current user's information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user's information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/me', protect, async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash');
  res.json(user);
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (requires admin role)
 *       500:
 *         description: Server error
 */
router.get('/', protect, requireRole(['admin']), async (req, res) => {
  const users = await User.find().select('-passwordHash');
  res.json(users);
});

module.exports = router;