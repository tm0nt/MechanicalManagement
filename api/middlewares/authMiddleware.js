const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Token de autenticação ausente." });
  }

  try {
    const decoded = jwt.verify(token, "secretpassword");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido." });
  }
};

module.exports = authMiddleware;
