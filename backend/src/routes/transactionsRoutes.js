const express = require('express');
const router = express.Router();
const { authRequired } = require('../middleware/auth');
const transactionsController = require('../controllers/transactionsController');

// POST /transactions 
// create purchase or adjustment transactions
router.post('/', authRequired, transactionsController.createTransaction);

// GET /transactions 
// list transactions (manager or higher)
router.get('/', authRequired, transactionsController.getTransactions);

// GET /transactions/:transactionId 
// fetch single transaction
router.get('/:transactionId', authRequired, transactionsController.getTransactionById);

// PATCH /transactions/:transactionId/suspicious 
// toggle suspicious flag
router.patch(
  '/:transactionId/suspicious',
  authRequired,
  transactionsController.updateTransactionSuspicious
);

// PATCH /transactions/:transactionId/processed 
// process redemption
router.patch(
  '/:transactionId/processed',
  authRequired,
  transactionsController.processTransaction
);

// GET /transactions/stats
// get cashier stats
router.get('/stats', authRequired, transactionsController.getTransactionStats);

module.exports = router;
