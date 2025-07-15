const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Initialize Firebase Admin SDK
const initializeFirebase = () => {
  if (!admin.apps.length) {
    const serviceAccount = require('./courseplatform.json');
    
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
