/**
 * Firebase Authentication Middleware
 * Verifies the Firebase ID token in the Authorization header
 * Adds the decoded token to the request object as req.user
 */
const firebaseAdmin = require('../config/firebase');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication required. No valid token provided.' 
      });
    }

    const token = authHeader.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication required. Token format invalid.' 
      });
    }
    
    // Verify the Firebase ID token
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    
    // Add the decoded token to the request object
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      email_verified: decodedToken.email_verified
    };
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ 
      success: false,
      message: 'Authentication failed', 
      error: error.message 
    });
  }
};

module.exports = authMiddleware;
