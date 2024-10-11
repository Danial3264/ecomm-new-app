require('dotenv').config(); // Load environment variables
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use secret key from .env file
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

// Initialize express app
const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests
app.use(bodyParser.json()); // Parse incoming requests with JSON payloads
app.use('/assets', express.static(path.join(__dirname, 'src/assets'))); // Static directory for uploaded images

// Create MySQL connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: './src/assets/images/', // Store uploaded files
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit
}).single('image');

// Get all products
app.get('/products', (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
    res.status(200).json(results);
  });
});

// Get all Categories
app.get('/categories', (req, res) => {
  const query = "SELECT * FROM categories";  // Fetch categories from the 'categories' table
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res.status(500).json({ error: 'Failed to fetch categories' });
    }
    res.status(200).json(results);
  });
});

// Get products by category
app.get('/products/category/:category_id', (req, res) => {
  const { category_id } = req.params;
  const query = "SELECT * FROM products WHERE category_id = ?"; // Fetch products with the given category_id

  db.query(query, [category_id], (err, results) => {
    if (err) {
      console.error("Error fetching products by category:", err);
      return res.status(500).json({ error: 'Failed to fetch products by category' });
    }
    res.status(200).json(results);
  });
});



// Create a new product
app.post('/create-product', (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ message: 'Error uploading file' });
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const { product_name, product_price, shipping_cost } = req.body;
    const imagePath = req.file.filename;

    const query = "INSERT INTO products (`product_name`, `product_image`, `product_price`, `shipping_cost`) VALUES (?, ?, ?, ?)";
    db.query(query, [product_name, imagePath, product_price, shipping_cost], (err, results) => {
      if (err) return res.status(500).json({ error: 'Failed to create product' });
      res.status(200).json({ message: "Product created successfully", productId: results.insertId });
    });
  });
});

// Delete a product
app.delete('/product/:id', (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM products WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to delete product' });
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  });
});

// Update product
app.put('/products/:id', (req, res) => {
  const productId = req.params.id;

  upload(req, res, (err) => {
    if (err) return res.status(500).send({ message: 'Error uploading file' });

    const { product_name, product_price, shipping_cost } = req.body;
    const imagePath = req.file ? req.file.filename : null;

    const getProductQuery = 'SELECT product_image FROM products WHERE id = ?';
    db.query(getProductQuery, [productId], (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch product' });

      const oldImage = result[0]?.product_image;

      const updateProductQuery = 'UPDATE products SET product_name = ?, product_price = ?, shipping_cost = ?, product_image = ? WHERE id = ?';
      db.query(updateProductQuery, [product_name, product_price, shipping_cost, imagePath || oldImage, productId], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to update product' });

        if (imagePath && oldImage) {
          const oldImagePath = path.join(__dirname, 'src/assets/images/', oldImage);
          fs.unlink(oldImagePath, (err) => {
            if (err) console.error('Failed to delete old image:', err);
            else console.log('Old image deleted:', oldImage);
          });
        }

        res.status(200).json({ message: 'Product updated successfully' });
      });
    });
  });
});

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;  // Ensure the amount is coming correctly from the frontend

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe accepts amounts in cents
      currency: 'usd',
    });

    res.send({
      clientSecret: paymentIntent.client_secret // Correctly return the client_secret
    });
  } catch (error) {
    console.error('Error creating PaymentIntent:', error);
    res.status(500).json({ error: 'Payment failed' });
  }
});


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
