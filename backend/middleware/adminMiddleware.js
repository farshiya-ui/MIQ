const jwt = require("jsonwebtoken");

// =========================================================
// ADMIN AUTHENTICATION MIDDLEWARE
// =========================================================

const adminMiddleware = (req, res, next) => {
  try {
    // Get authorization header
    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message:
          "Admin authorization required.",
      });
    }

    // Check Bearer format
    if (
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid authorization format.",
      });
    }

    // Extract token
    const token =
      authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Admin token is missing.",
      });
    }

    // Verify token
    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    // Check admin role
    if (
      decoded.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Admin access required.",
      });
    }

    // Check admin token purpose
    if (
      decoded.purpose !==
      "admin-access"
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Invalid admin access token.",
      });
    }

    // Store admin information
    req.admin = {
      username:
        decoded.username,

      role:
        decoded.role,
    };

    // Continue to admin route
    next();

  } catch (error) {
    console.error(
      "Admin middleware error:",
      error
    );

    if (
      error.name ===
      "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Admin session has expired. Please login again.",
      });
    }

    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired admin token.",
    });
  }
};

module.exports =
  adminMiddleware;