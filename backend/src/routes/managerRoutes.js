const express = require('express');
const router = express.Router();
const { authRequired, requireRole } = require('../middleware/auth');
const { getDashboardStats } = require('../controllers/managerController');

// GET /manager/stats
// Get dashboard statistics (requires manager or higher clearance)
router.get('/stats', authRequired, requireRole(['manager', 'superuser']), getDashboardStats);

module.exports = router;
