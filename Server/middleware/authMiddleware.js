const admin = require('../firebase/firebaseAdmin');

const verifyFirebaseToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: 'Token is required' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    }

    catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
}

module.exports = verifyFirebaseToken;