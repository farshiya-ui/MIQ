const jwt = require("jsonwebtoken");
const User = require("../models/User");

// =========================================================
// AUTHENTICATION MIDDLEWARE
// =========================================================

const authMiddleware = async (req, res, next) => {
  try {
    // -----------------------------------------------------
    // GET AUTHORIZATION HEADER
    // -----------------------------------------------------

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required.",
      });
    }

    // -----------------------------------------------------
    // CHECK BEARER FORMAT
    // -----------------------------------------------------

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format.",
      });
    }

    // -----------------------------------------------------
    // GET TOKEN
    // -----------------------------------------------------

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is missing.",
      });
    }

    // -----------------------------------------------------
    // VERIFY JWT
    // -----------------------------------------------------

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // -----------------------------------------------------
    // CHECK USER ID
    // -----------------------------------------------------

    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    // -----------------------------------------------------
    // FIND USER
    // -----------------------------------------------------

    const user = await User.findById(
      decoded.userId
    ).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account not found.",
      });
    }

    // -----------------------------------------------------
    // ATTACH USER TO REQUEST
    // -----------------------------------------------------

    req.user = user;

    // -----------------------------------------------------
    // CONTINUE
    // -----------------------------------------------------

    next();

  } catch (error) {
    console.error(
      "Authentication middleware error:",
      error
    );

    if (
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    if (
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Authentication token has expired.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Authentication failed.",
    });
  }
};

module.exports = authMiddleware;