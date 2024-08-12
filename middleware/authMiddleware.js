const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).send("Token is required");
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).send("Unauthorized");
      }

      req.userId = decoded.userId;
      next();
    });
  } catch (err) {
    return res.status(500).send("Verification failed");
  }
};

module.exports = { verifyToken };
