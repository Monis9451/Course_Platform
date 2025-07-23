exports.isAdmin = (req, res, next) => {
  if (req.user?.email === "mianmonishussain786@gmail.com") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
};