const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

// Basic Route
app.get("/", (req, res) => {
  res.send("Node.js and MySQL Project");
});

// CRUD Operations for a 'users' table

// Get User by ID without Redis Caching
app.get("/user/:id", (req, res) => {
  const userId = req.params.id;

  // Query MySQL
  db.query("SELECT * FROM users WHERE id = ?", [userId], (err, rows) => {
    if (err) throw err;
    if (rows.length > 0) {
      res.json({ source: "database", data: rows[0] });
    } else {
      res.status(404).send("User not found");
    }
  });
});

// Add New User
app.post("/user", (req, res) => {
  const { name, email } = req.body;
  db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId, name, email });
  });
});

// Update User
app.put("/user/:id", (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;

  db.query(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [name, email, userId],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "User updated" });
    }
  );
});

// Delete User
app.delete("/user/:id", (req, res) => {
  const userId = req.params.id;

  db.query("DELETE FROM users WHERE id = ?", [userId], (err, result) => {
    if (err) throw err;
    res.json({ message: "User deleted" });
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
