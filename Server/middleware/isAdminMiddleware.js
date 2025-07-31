const isAdmin = (req, res, next) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  
  if (!adminEmail) {
    console.error('ADMIN_EMAIL environment variable not set');
    return res.status(500).json({ 
      status: 'error',
      message: "Server configuration error." 
    });
  }
  
  if (req.user?.email === adminEmail) {
    next();
  } else {
    return res.status(403).json({ 
      status: 'fail',
      message: "Access denied. Admin privileges required."
    });
  }
};

module.exports = { isAdmin };