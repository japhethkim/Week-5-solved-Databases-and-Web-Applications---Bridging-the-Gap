const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenses');
const authMiddleware   
 = require('../middleware/auth'); // Assuming you have authentication middleware

router.post('/expenses', authMiddleware, expenseController.addExpense);
router.get('/expenses', authMiddleware, expenseController.getExpenses);

module.exports = router;