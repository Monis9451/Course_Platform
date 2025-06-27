const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin SDK
const initializeFirebase = () => {
  if (!admin.apps.length) {
    const serviceAccount = require('./firebase-service-account.json.json');
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id,
    });
    
    console.log('Firebase Admin initialized successfully');
  }
  return admin;
};

// Export initialized admin instance
const firebaseAdmin = initializeFirebase();

module.exports = firebaseAdmin;
