require('dotenv').config();

const express = require('express');
const app = express();
const fs = require('fs');
const authMiddleware = require('./authMiddleware');

app.use(express.json());
const port = 3002;

const admin = require('firebase-admin');

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const serviceAccount = require('./serviceaccountcred.json');
// const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Helper Functions

/// Get Date Identifiers
function getWeekIdentifier(date) {
  // Logic to calculate week number in the format 'YYYY-WNN'
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 4 - (date.getDay() || 7));
  const weekStart = new Date(Date.UTC(date.getFullYear(), 0, 1));
  const weekNumber = Math.ceil(((date - weekStart) / 86400000 + 1) / 7);
  return date.getFullYear() + '-W' + weekNumber;
}

function getDateIdentifiers(date = new Date()) {
  const today = date.toISOString().substring(0, 10); // YYYY-MM-DD
  const currentWeek = getWeekIdentifier(date);
  const currentMonth = date.toISOString().substring(0, 7); // YYYY-MM
  return { today, currentWeek, currentMonth };
}

/// Main Update Function
// Main Update Function
async function updateAnalyticsAfterOrder(orderData) {
  const storeStatsRef = db
    .collection('storeAnalytics')
    .doc('rWTX2cfNrktfoi1d143m');
  const { today, currentWeek, currentMonth } = getDateIdentifiers();

  try {
    await storeStatsRef.update({
      totalRevenue: admin.firestore.FieldValue.increment(orderData.totalPrice),
      numOrders: admin.firestore.FieldValue.increment(1),
      [`dailySales.${today}`]: {
        revenue: admin.firestore.FieldValue.increment(orderData.totalPrice),
        numOrders: admin.firestore.FieldValue.increment(1),
      },
      [`weeklySales.${currentWeek}`]: {
        revenue: admin.firestore.FieldValue.increment(orderData.totalPrice),
        numOrders: admin.firestore.FieldValue.increment(1),
      },
      [`monthlySales.${currentMonth}`]: {
        revenue: admin.firestore.FieldValue.increment(orderData.totalPrice),
        numOrders: admin.firestore.FieldValue.increment(1),
      },
    });

    // Fetch and update topSellingProducts
    const existingTopProducts =
      (await storeStatsRef.get()).data().topSellingProducts || [];

    // Update product counts and add new products to existingTopProducts array
    orderData.orderItems.forEach((item) => {
      const existingProduct = existingTopProducts.find(
        (p) => p.productId === item.productId,
      );
      if (existingProduct) {
        existingProduct.salesCount += item.quantity;
      } else {
        existingTopProducts.push({
          productId: item.productId,
          name: item.name, // Assuming you have the name in orderData
          salesCount: item.quantity,
        });
      }
    });

    // Sort and limit to top 5
    existingTopProducts.sort((a, b) => b.salesCount - a.salesCount); // Descending sort
    const updatedTopProducts = existingTopProducts.slice(0, 5);

    // Second update
    await storeStatsRef.update({
      topSellingProducts: updatedTopProducts,
    });
  } catch (error) {
    console.error('Error updating analytics:', error);
  }
}

/// Validating URL
function isValidUrl(urlString) {
  try {
    new URL(urlString);
    return true;
  } catch (err) {
    return false;
  }
}

// EndPoints

// Add document to Firestore (General)
app.post('/api/addDocument', async (req, res) => {
  try {
    const collectionName = req.body.collection;
    const filePath = req.body.filePath;

    if (!collectionName || !filePath) {
      return res.status(400).json({ error: 'Missing collection or file path' });
    }

    const rawData = fs.readFileSync(filePath);
    const documentData = JSON.parse(rawData);

    const newDocRef = await db.collection(collectionName).add(documentData);

    res
      .status(201)
      .json({ message: 'Document added', documentId: newDocRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Product to Database EndPoint
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = req.body;

    // -----  Input Validation  -------
    // Name Validation
    if (typeof newProduct.name !== 'string' || newProduct.name.trim() === '') {
      return res
        .status(400)
        .json({ error: 'Product name is required and must be a string' });
    }
    if (newProduct.name.length < 3 || newProduct.name.length > 100) {
      return res
        .status(400)
        .json({
          error: 'Product name must be between 3 and 100 characters long',
        });
    }

    // Price Validation
    if (typeof newProduct.price !== 'number' || newProduct.price <= 0) {
      return res
        .status(400)
        .json({ error: 'Price is required and must be a positive number' });
    }

    // Description Validation (Optional)
    if (newProduct.description && typeof newProduct.description !== 'string') {
      return res.status(400).json({ error: 'Description must be a string' });
    }
    // Add a maximum length check for description if desired

    // imageUrl Validation
    if (newProduct.imageUrl && !isValidUrl(newProduct.imageUrl)) {
      // You'll need a `isValidUrl` function
      return res.status(400).json({ error: 'Image URL must be a valid URL' });
    }

    // Additional Images Array Validation
    if (updates.imageUrls) {
      if (!Array.isArray(updates.imageUrls)) {
        return res.status(400).json({ error: 'imageUrls must be an array' });
      }
      updates.imageUrls.forEach((imageUrl) => {
        if (!isValidUrl(imageUrl)) {
          return res.status(400).json({ error: 'Invalid image URL' });
        }
      });
    }

    // Stock Validation
    if (
      newProduct.stock &&
      (typeof newProduct.stock !== 'number' || newProduct.stock < 0)
    ) {
      return res
        .status(400)
        .json({ error: 'Stock must be a non-negative integer' });
    }
    // Variants Validation
    if (!newProduct.variants || typeof newProduct.variants !== 'object') {
      return res.status(400).json({ error: 'Variants are required' });
    }

    // Validate individual colors, sizes, and quantities
    Object.entries(newProduct.variants.color).forEach(([color, sizes]) => {
      if (typeof color !== 'string' || color.trim() === '') {
        return res.status(400).json({ error: 'Invalid color' });
      }
      Object.entries(sizes).forEach(([size, quantity]) => {
        if (typeof size !== 'string' || !['S', 'M', 'L'].includes(size)) {
          return res.status(400).json({ error: 'Invalid size' });
        }
        if (typeof quantity !== 'number' || quantity < 0) {
          return res.status(400).json({ error: 'Invalid quantity' });
        }
      });
    });
    // -----  If Validation Passes -------
    const productRef = await db.collection('products').add(newProduct);
    res
      .status(201)
      .json({ message: 'Product added', productId: productRef.id });
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
        return res
          .status(400)
          .json({ error: 'Invalid minPrice: must be a non-negative number' });
      }
      productsQuery = productsQuery.where('price', '>=', minPrice);
    }

    if (req.query.maxPrice) {
      const maxPrice = Number(req.query.maxPrice);
      if (isNaN(maxPrice) || maxPrice < 0) {
        return res
          .status(400)
          .json({ error: 'Invalid maxPrice: must be a non-negative number' });
      }
      productsQuery = productsQuery.where('price', '<=', maxPrice);
    }
    if (req.query.type) {
      productsQuery = productsQuery.where('type', '==', req.query.type);
    }
    if (req.query.color) {
      productsQuery = productsQuery.where(
        'variants.color',
        'array-contains',
        req.query.color,
      );
    }
    if (req.query.size) {
      productsQuery = productsQuery.where(
        `variants.color`,
        'array-contains-any',
        Object.entries(req.query.size).map(([color, size]) => ({
          color,
          size,
        })),
      );
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

    //-----Input Validation-----
    // Name Validation
    if (typeof newProduct.name !== 'string' || newProduct.name.trim() === '') {
      return res
        .status(400)
        .json({ error: 'Product name is required and must be a string' });
    }
    if (newProduct.name.length < 3 || newProduct.name.length > 100) {
      return res
        .status(400)
        .json({
          error: 'Product name must be between 3 and 100 characters long',
        });
    }

    // Price Validation
    if (typeof newProduct.price !== 'number' || newProduct.price <= 0) {
      return res
        .status(400)
        .json({ error: 'Price is required and must be a positive number' });
    }

    // Description Validation (Optional)
    if (newProduct.description && typeof newProduct.description !== 'string') {
      return res.status(400).json({ error: 'Description must be a string' });
    }

    // imageUrl Validation
    if (newProduct.imageUrl && !isValidUrl(newProduct.imageUrl)) {
      // You'll need a `isValidUrl` function
      return res.status(400).json({ error: 'Image URL must be a valid URL' });
    }

    // Additional Images Array Validation
    if (updates.imageUrls) {
      if (!Array.isArray(updates.imageUrls)) {
        return res.status(400).json({ error: 'imageUrls must be an array' });
      }
      updates.imageUrls.forEach((imageUrl) => {
        if (!isValidUrl(imageUrl)) {
          return res.status(400).json({ error: 'Invalid image URL' });
        }
      });
    }

    // Stock Validation
    if (
      newProduct.stock &&
      (typeof newProduct.stock !== 'number' || newProduct.stock < 0)
    ) {
      return res
        .status(400)
        .json({ error: 'Stock must be a non-negative integer' });
    }
    // Variants Validation
    if (!newProduct.variants || typeof newProduct.variants !== 'object') {
      return res.status(400).json({ error: 'Variants are required' });
    }

    // Validate individual colors, sizes, and quantities
    Object.entries(newProduct.variants.color).forEach(([color, sizes]) => {
      if (typeof color !== 'string' || color.trim() === '') {
        return res.status(400).json({ error: 'Invalid color' });
      }
      Object.entries(sizes).forEach(([size, quantity]) => {
        if (typeof size !== 'string' || !['S', 'M', 'L'].includes(size)) {
          return res.status(400).json({ error: 'Invalid size' });
        }
        if (typeof quantity !== 'number' || quantity < 0) {
          return res.status(400).json({ error: 'Invalid quantity' });
        }
      });
    });

    // Update the product in Firestore
    const productRef = db.collection('products').doc(productId);
    await productRef.update(updates);

    // Retrieve updated product (optional)
    const updatedDoc = await productRef.get();
    if (!updatedDoc.exists) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res
      .status(200)
      .json({ message: 'Product updated', product: updatedDoc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieving User's Shopping Cart
app.get('/api/cart', authMiddleware, async (req, res) => {
  try {
    const userCart = await db
      .collection('carts')
      .where('userId', '==', req.user.uid)
      .get();

    if (userCart.empty) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Note: userCart.docs will likely have only one document
    const cartData = userCart.docs[0].data();
    res.json(cartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Creating a New Cart
app.post('/api/cart', authMiddleware, async (req, res) => {
  try {
    const existingCart = await db
      .collection('carts')
      .where('userId', '==', req.user.uid)
      .limit(1)
      .get();

    if (!existingCart.empty) {
      return res
        .status(400)
        .json({ error: 'Cart already exists for this user' }); // Or update the existing cart
    }

    const newCart = await db.collection('carts').add({
      userId: req.user.uid,
      items: [], // Start with an empty items array
    });

    res.status(201).json({ message: 'Cart created', cartId: newCart.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Adding Item to Cart
app.post('/api/cart/items', authMiddleware, async (req, res) => {
  try {
    const { productId, quantity, color, size } = req.body; // Include color and size

    if (
      !productId ||
      typeof quantity !== 'number' ||
      quantity <= 0 ||
      !color ||
      !size
    ) {
      return res.status(400).json({ error: 'Invalid product data' });
    }

    const cartRef = db
      .collection('carts')
      .where('userId', '==', req.user.uid)
      .limit(1);
    const cartSnapshot = await cartRef.get();

    if (cartSnapshot.empty) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const cartDoc = cartSnapshot.docs[0];
    const cartData = cartDoc.data();

    const existingItemIndex = cartData.items.findIndex(
      (item) => item.productId === productId,
    );

    if (existingItemIndex !== -1) {
      // Update existing item quantity (You might want more complex logic here)
      cartData.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cartData.items.push({ productId, quantity });
    }

    await cartDoc.ref.update(cartData);

    res.json({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Updating Item Quantity in Cart
app.patch('/api/cart/items/:productId', authMiddleware, async (req, res) => {
  try {
    const productId = req.params.productId;
    const { quantity, color, size } = req.body; // Include color and size

    if (typeof quantity !== 'number' || quantity <= 0 || !color || !size) {
      return res.status(400).json({ error: 'Invalid update data' });
    }

    const cartRef = db
      .collection('carts')
      .where('userId', '==', req.user.uid)
      .limit(1);
    const cartSnapshot = await cartRef.get();

    if (cartSnapshot.empty) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const cartDoc = cartSnapshot.docs[0];
    const cartData = cartDoc.data();

    const itemIndex = cartData.items.findIndex(
      (item) =>
        item.productId === productId &&
        item.color === color &&
        item.size === size,
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    cartData.items[itemIndex].quantity = quantity;
    await cartDoc.ref.update(cartData);

    res.json({ message: 'Item quantity updated in cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Removing an Item from Cart
app.delete('/api/cart/items/:productId', authMiddleware, async (req, res) => {
  try {
    const productId = req.params.productId;
    const { color, size } = req.body; // Include color and size

    if (!color || !size) {
      return res.status(400).json({ error: 'Color and size are required' });
    }

    const cartRef = db
      .collection('carts')
      .where('userId', '==', req.user.uid)
      .limit(1);
    const cartSnapshot = await cartRef.get();

    if (cartSnapshot.empty) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const cartDoc = cartSnapshot.docs[0];
    const cartData = cartDoc.data();

    const itemIndex = cartData.items.findIndex(
      (item) =>
        item.productId === productId &&
        item.color === color &&
        item.size === size,
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    cartData.items.splice(itemIndex, 1);
    await cartDoc.ref.update(cartData);

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint: Checkout
app.post('/api/checkout', authMiddleware, async (req, res) => {
  try {
    await db.runTransaction(async (transaction) => {
      // 1. Retrieve User's Cart
      const cartRef = db
        .collection('carts')
        .where('userId', '==', req.user.uid)
        .limit(1);
      const cartSnapshot = await transaction.get(cartRef);
      const cartData = cartSnapshot.docs[0].data();

      // 2. Price Calculation
      let totalPrice = 0;
      const orderItems = [];

      for (const item of cartData.items) {
        const productSnapshot = await transaction.get(
          db.collection('products').doc(item.productId),
        );
        const productData = productSnapshot.data();

        if (!productData) {
          throw new Error(`Product not found: ${item.productId}`);
        }

        const itemPrice = productData.price * item.quantity;
        totalPrice += itemPrice;

        orderItems.push({
          productId: item.productId,
          name: productData.name, // Snapshot product details
          price: productData.price,
          quantity: item.quantity,
        });
      }
      // Stock Availability Check
      const stockPromises = cartItems.map(async (item) => {
        const productDoc = await db
          .collection('products')
          .doc(item.productId)
          .get();
        if (!productDoc.exists) {
          throw new Error(`Product not found: ${item.productId}`);
        }

        const productData = productDoc.data();
        const selectedVariant =
          productData.variants.color[item.color]?.[item.size];
        if (!selectedVariant || selectedVariant < item.quantity) {
          throw new Error(
            `Insufficient stock for product ${item.productId} (color: ${item.color}, size: ${item.size})`,
          );
        }
      });

      await Promise.all(stockPromises);

      // ... (Create order)

      // Stock Reduction
      const stockUpdatePromises = cartItems.map(async (item) => {
        const productRef = db.collection('products').doc(item.productId);
        await productRef.update({
          [`variants.color.${item.color}.${item.size}`]:
            admin.firestore.FieldValue.increment(-item.quantity),
        });
      });

      await Promise.all(stockUpdatePromises); // Ensure all stock updates succeed

      // 3. Create Order
      const newOrder = await transaction.add('orders', {
        userId: req.user.uid,
        cartId: cartSnapshot.docs[0].id,
        shippingAddress: req.body.shippingAddress, // Assuming the data is received
        billingAddress: req.body.billingAddress,
        status: 'pending',
        totalPrice,
        orderItems,
        status: 'pending',
        timestamp: admin.firestore.Timestamp.now(),
      });

      transaction.update(cartSnapshot.docs[0].ref, { status: 'inactive' });
    });
    updateAnalyticsAfterOrder(newOrder);
    res.status(201).json({ message: 'Order Placed', orderId: newOrder.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint: Retrieve Orders of User (With Status Filtering)
app.get('/api/orders', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.uid;
    const status = req.query.status;

    let ordersQuery = db.collection('orders').where('userId', '==', userId);

    // Apply status filter if provided
    if (status) {
      ordersQuery = ordersQuery.where('status', '==', status);
    }

    ordersQuery = ordersQuery.orderBy('timestamp', 'desc'); // Sort by timestamp

    const ordersSnapshot = await ordersQuery.get();

    const orders = ordersSnapshot.docs.map((doc) => ({
      orderId: doc.id,
      ...doc.data(),
    }));

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
