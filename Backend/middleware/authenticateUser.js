import pkg from 'jsonwebtoken';
const { verify } = pkg;

const authenticateUser = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (bearerHeader) {
    const token = bearerHeader.split(" ")[1];
    verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid token" });

      req.user = decoded; // <- Here's your user info from the token
      next();
    });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default authenticateUser
