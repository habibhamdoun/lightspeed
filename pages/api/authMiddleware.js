const admin = require('firebase-admin');
/// AuthMiddleware (Firestore Transactions)
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Authentication required' }); 
    }
  
    const idToken = authHeader.split(' ')[1]; // Assuming Bearer token format
  
    admin.auth().verifyIdToken(idToken)
      .then(decodedToken => {
        req.user = decodedToken; // Attach the authenticated user data
        next(); // Proceed to the next middleware or route handler
      })
      .catch(error => {
        res.status(401).json({ error: 'Invalid authentication token' });
      });
    }

    // ... your existing authMiddleware code ...

module.exports = authMiddleware; 
