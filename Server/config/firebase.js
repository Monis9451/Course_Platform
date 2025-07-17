const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Initialize Firebase Admin SDK
const initializeFirebase = () => {
  if (!admin.apps.length) {
    let serviceAccount;
    
    // Check if we're in Vercel production environment
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      // Use environment variable for service account in production
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } else {
      // Use local file for development
      try {
        serviceAccount = require('./courseplatform.json');
      } catch (error) {
        console.error('Failed to load Firebase service account file:', error);
        throw new Error('Firebase configuration missing');
      }
    }
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id,
    });
    
    if (process.env.NODE_ENV === 'production') {
      // In production, write to log file
      fs.appendFileSync(path.join(__dirname, '..', 'app.log'), `${new Date().toISOString()} - Firebase Admin initialized successfully\n`);
    } else {
      // In development, log to console
      console.log('Firebase Admin initialized successfully');
    }
  }
  return admin;
};

// Export initialized admin instance
const firebaseAdmin = initializeFirebase();

module.exports = firebaseAdmin;
