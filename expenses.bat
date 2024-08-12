const Expense = require('../models').Expense;

const addExpense = async (req, res) => {
  const { userId, amount, date, category } = req.body;
  try {
    const expenseId = await Expense.create(userId, amount, date, category);
    res.status(201).json({ message: 'Expense added successfully', expenseId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding expense' });
  }
};

const getExpenses = async (req, res) => {
  const userId = req.user.id; // Assuming you have user authentication in place
  try {
    const expenses = await Expense.getByUserId(userId);
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching expenses' });
  }
};

module.exports = { addExpense, getExpenses };