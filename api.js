require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json()); 
const port = 3002; 

const admin = require('firebase-admin');

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const serviceAccount = require('./serviceaccountcred.json'); 
// const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount) 
});


const db = admin.firestore(); 

// Helper Functions
function isValidUrl(urlString) {
    try {
      new URL(urlString);
      return true; 
    } catch (err) {
      return false;  
    }
  }


// Add Product to Database EndPoint
app.post('/api/products', async (req, res) => {
    try {
      const newProduct = req.body;
  
      // -----  Input Validation  ------- 
      // Name Validation
      if (typeof newProduct.name !== 'string' || newProduct.name.trim() === '') {
        return res.status(400).json({ error: 'Product name is required and must be a string' });
      }
      if (newProduct.name.length < 3 || newProduct.name.length > 100) {
         return res.status(400).json({ error: 'Product name must be between 3 and 100 characters long' });
      }
  
      // Price Validation
      if (typeof newProduct.price !== 'number' || newProduct.price <= 0) {
        return res.status(400).json({ error: 'Price is required and must be a positive number' });
      }
  
      // Description Validation (Optional)
      if (newProduct.description && typeof newProduct.description !== 'string') {
        return res.status(400).json({ error: 'Description must be a string' });
      }
      // Add a maximum length check for description if desired
  
      // imageUrl Validation (Optional)
      if (newProduct.imageUrl && !isValidUrl(newProduct.imageUrl)) { // You'll need a `isValidUrl` function
        return res.status(400).json({ error: 'Image URL must be a valid URL' });
      }
  
      // Stock Validation (Optional)
      if (newProduct.stock && (typeof newProduct.stock !== 'number' || newProduct.stock < 0)) { 
        return res.status(400).json({ error: 'Stock must be a non-negative integer' });
      }
  
      // -----  If Validation Passes -------
      const productRef = await db.collection('products').add(newProduct);
      res.status(201).json({ message: 'Product added', productId: productRef.id });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
// Retrieve Products from Firestore
app.get('/api/products', async (req, res) => {
  try {
    let productsQuery = db.collection('products');

    // Filtering Logic (with Validation)
    if (req.query.minPrice) {
      const minPrice = Number(req.query.minPrice);
      if (isNaN(minPrice) || minPrice < 0) {
        return res.status(400).json({ error: 'Invalid minPrice: must be a non-negative number' });
      }
      productsQuery = productsQuery.where('price', '>=', minPrice);
    }

    if (req.query.maxPrice) {
      const maxPrice = Number(req.query.maxPrice);
      if (isNaN(maxPrice) || maxPrice < 0) {
        return res.status(400).json({ error: 'Invalid maxPrice: must be a non-negative number' });
      }
      productsQuery = productsQuery.where('price', '<=', maxPrice);
    }

    // Sorting Logic (with Validation)
    const allowedSortByFields = ['name', 'price']; // Define allowed fields 
    if (req.query.sortBy && allowedSortByFields.includes(req.query.sortBy)) {
      const sortOrder = req.query.sortOrder === 'asc' ? 'asc' : 'desc'; // Ensure valid values
      productsQuery = productsQuery.orderBy(req.query.sortBy, sortOrder);
    }

    // Retrieve results (rest of the code remains the same)
    const productsSnapshot = await productsQuery.get();
    // ... rest of the code for mapping and sending the response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Delete Product Endpoint
app.delete('/api/products/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    // Ensure the product exists before deletion (optional)
    const productDoc = await db.collection('products').doc(productId).get();
    if (!productDoc.exists) {
        return res.status(404).json({ error: 'Product not found' });
    }

    // Delete the product
    await db.collection('products').doc(productId).delete();

    res.status(200).json({ message: 'Product deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Update Product Endpoint
app.patch('/api/products/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const updates = req.body;

    // Input Validation (Adapt this to your specific requirements)
    if (updates.name && typeof updates.name !== 'string') {
      return res.status(400).json({ error: 'Product name must be a string' });
    }
    if (updates.price && typeof updates.price !== 'number') {
      return res.status(400).json({ error: 'Price must be a number' });
    }
    // ... add validation for other updatable fields

    // Update the product in Firestore
    const productRef = db.collection('products').doc(productId);
    await productRef.update(updates);

    // Retrieve updated product (optional) 
    const updatedDoc = await productRef.get();
    if (!updatedDoc.exists) {
        return res.status(404).json({ error: 'Product not found' }); 
    }

    res.status(200).json({ message: 'Product updated', product: updatedDoc.data() });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
