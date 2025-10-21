const express = require('express');
const router = express.Router();
const db = require('./db');

// Ensure table exists
db.query(`
  CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2)
  )
`, (err) => {
  if (err) throw err;
  console.log('Table checked/created');
});

// GET all
router.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// GET by id
router.get('/products/:id', (req, res) => {
  db.query('SELECT * FROM products WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
});

// POST
router.post('/products', (req, res) => {
  const { name, description, price } = req.body;
  db.query('INSERT INTO products (name, description, price) VALUES (?, ?, ?)', 
    [name, description, price], 
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId, name, description, price });
  });
});

// PUT
router.put('/products/:id', (req, res) => {
  const { name, description, price } = req.body;
  db.query(
    'UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?',
    [name, description, price, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.sendStatus(204);
    }
  );
});

// DELETE
router.delete('/products/:id', (req, res) => {
  db.query('DELETE FROM products WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.sendStatus(204);
  });
});

module.exports = router;
