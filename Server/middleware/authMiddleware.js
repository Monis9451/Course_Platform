const admin = require('../firebase/firebaseAdmin');

const verifyFirebaseToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            status: 'fail',
            message: 'Authorization token is required' 
        });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    }

    catch (error) {
        console.error('Token verification error:', error.message);
        return res.status(401).json({ 
            status: 'fail',
            message: 'Invalid or expired token' 
        });
    }
}

module.exports = verifyFirebaseToken;