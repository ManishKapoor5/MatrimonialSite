// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// // Cache for blacklisted tokens
// const tokenBlacklist = new Map();

// // Helper to clean up expired tokens from the blacklist
// const cleanupBlacklist = () => {
//   const now = Date.now();
//   for (const [token, expiry] of tokenBlacklist.entries()) {
//     if (now > expiry) {
//       tokenBlacklist.delete(token);
//     }
//   }
// };

// // Run cleanup periodically
// setInterval(cleanupBlacklist, 60 * 60 * 1000); // Clean every hour

// // Protect routes
// export const protect = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     // Set token from Bearer token in header
//     token = req.headers.authorization.split(" ")[1];
//   }

//   // Make sure token exists
//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Not authorized to access this route" });
//   }

//   // Check if token is blacklisted
//   if (
//     process.env.TOKEN_BLACKLIST_ENABLED === "true" &&
//     tokenBlacklist.has(token)
//   ) {
//     return res
//       .status(401)
//       .json({ message: "Token has been invalidated, please login again" });
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

//     // Get user from the token
//     req.user = await User.findById(decoded.id);

//     if (!req.user) {
//       return res
//         .status(401)
//         .json({ message: "Not authorized to access this route" });
//     }

//     // Check if user is active
//     if (!req.user.isActive) {
//       return res
//         .status(403)
//         .json({ message: "Your account has been deactivated" });
//     }

//     // Set the original token on the request for potential blacklisting on logout
//     req.token = token;

//     next();
//   } catch (err) {
//     return res
//       .status(401)
//       .json({ message: "Not authorized to access this route" });
//   }
// };

// // Grant access to specific roles
// export const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({
//         message: `User role '${req.user.role}' is not authorized to access this route`,
//       });
//     }
//     next();
//   };
// };

// // Add token to blacklist (for logout)
// export const blacklistToken = (token) => {
//   if (process.env.TOKEN_BLACKLIST_ENABLED === "true") {
//     try {
//       // Get token expiration
//       const decoded = jwt.decode(token);
//       if (decoded && decoded.exp) {
//         // Store token in blacklist until its expiration
//         const expiryMs = decoded.exp * 1000;
//         tokenBlacklist.set(token, expiryMs);

//         // Auto-remove from blacklist after token expires
//         const ttl = Math.max(0, expiryMs - Date.now());
//         setTimeout(() => {
//           tokenBlacklist.delete(token);
//         }, ttl);

//         return true;
//       }
//     } catch (error) {
//       console.error("Error blacklisting token:", error);
//     }
//   }
//   return false;
// };

// // Rate limiter middleware for login routes
// export const loginRateLimiter = () => {
//   const MAX_REQUESTS = 5;
//   const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
//   const ipMap = new Map();

//   return (req, res, next) => {
//     const ip = req.ip || req.connection.remoteAddress;

//     if (!ipMap.has(ip)) {
//       ipMap.set(ip, {
//         count: 1,
//         resetAt: Date.now() + WINDOW_MS,
//       });
//     } else {
//       const data = ipMap.get(ip);

//       // Reset if time window has expired
//       if (Date.now() > data.resetAt) {
//         data.count = 1;
//         data.resetAt = Date.now() + WINDOW_MS;
//       } else {
//         data.count += 1;
//       }

//       if (data.count > MAX_REQUESTS) {
//         return res.status(429).json({
//           message: "Too many login attempts. Please try again later.",
//         });
//       }
//     }

//     next();
//   };
// };

import jwt from "jsonwebtoken";
import User from "../models/User.js";

// In-memory cache for blacklisted tokens
const tokenBlacklist = new Map();

// Auto-clean expired tokens
const cleanupBlacklist = () => {
  const now = Date.now();
  for (const [token, expiry] of tokenBlacklist.entries()) {
    if (now > expiry) tokenBlacklist.delete(token);
  }
};
setInterval(cleanupBlacklist, 60 * 60 * 1000); // Clean every hour

// Middleware: Protect routes using JWT
export const protect = async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  // Check blacklist
  if (process.env.TOKEN_BLACKLIST_ENABLED === "true" && tokenBlacklist.has(token)) {
    return res.status(401).json({ message: "Token has been invalidated. Please login again." });
  }

  try {
    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

    // Fetch user
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found or token invalid." });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Your account has been deactivated." });
    }

    req.user = { id: user._id, role: user.role, email: user.email }; // Keep only essential info
    req.token = token;

    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

// Middleware: Role-based access
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `User role '${req.user.role}' is not authorized to access this route.`,
      });
    }
    next();
  };
};

// Utility: Blacklist a token on logout
export const blacklistToken = (token) => {
  if (process.env.TOKEN_BLACKLIST_ENABLED === "true") {
    try {
      const decoded = jwt.decode(token);
      if (decoded && decoded.exp) {
        const expiryMs = decoded.exp * 1000;
        tokenBlacklist.set(token, expiryMs);

        // Auto-remove after expiry
        const ttl = Math.max(0, expiryMs - Date.now());
        setTimeout(() => tokenBlacklist.delete(token), ttl);
        return true;
      }
    } catch (error) {
      console.error("Error blacklisting token:", error);
    }
  }
  return false;
};

// Middleware: Rate limiting login attempts
export const loginRateLimiter = () => {
  const MAX_REQUESTS = 5;
  const WINDOW_MS = 15 * 60 * 1000;
  const ipMap = new Map();

  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;

    if (!ipMap.has(ip)) {
      ipMap.set(ip, { count: 1, resetAt: Date.now() + WINDOW_MS });
    } else {
      const data = ipMap.get(ip);

      if (Date.now() > data.resetAt) {
        data.count = 1;
        data.resetAt = Date.now() + WINDOW_MS;
      } else {
        data.count += 1;
      }

      if (data.count > MAX_REQUESTS) {
        return res.status(429).json({
          message: "Too many login attempts. Please try again later.",
        });
      }
    }

    next();
  };
};
