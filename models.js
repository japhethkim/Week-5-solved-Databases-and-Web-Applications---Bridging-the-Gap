const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: require('./config').host,
  user: require('./config').user,
  password: require('./config').password,
  database: require('./config').database
});

// User Model
const User = {
  async create(username, hashedPassword) {
    const [rows] = await pool.execute('INSERT INTO Users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    return rows.insertId;
  },
  // ... other user related functions (login, etc.)
};

// Expense Model
const Expense = {
  async add(userId, amount, date, category) {
    const [rows] = await pool.execute('INSERT INTO Expenses (user_id, amount, date, category) VALUES (?, ?, ?, ?)', [userId, amount, date, category]);
    return rows.insertId;
  },
  async getByUserId(userId) {
    const [rows] = await pool.execute('SELECT * FROM Expenses WHERE user_id = ?', [userId]);
    return rows;
  },
  // ... other expense related functions (edit, delete)
};

module.exports = { User, Expense };