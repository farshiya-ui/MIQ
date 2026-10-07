const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// =========================================================
// DATABASE
// =========================================================

const connectDB = require("./config/db");

// =========================================================
// ROUTES
// =========================================================

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const activityRoutes = require("./routes/activityRoutes");
const adminRoutes = require("./routes/adminRoutes");
const mockInterviewRoutes = require("./routes/mockInterviewRoutes");

// =========================================================
// APP
// =========================================================

const app = express();

const PORT = 5000;

// =========================================================
// MIDDLEWARE
// =========================================================

app.use(cors());

app.use(express.json());

// =========================================================
// TEST ROUTE
// =========================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MIQ Backend is running successfully",
  });
});

// =========================================================
// AUTH ROUTES
// =========================================================

app.use(
  "/api/auth",
  authRoutes
);

// =========================================================
// PROFILE ROUTES
// =========================================================

app.use(
  "/api/profile",
  profileRoutes
);

// =========================================================
// ACTIVITY ROUTES
// =========================================================

app.use(
  "/api/activity",
  activityRoutes
);

// =========================================================
// ADMIN ROUTES
// =========================================================

app.use(
  "/api/admin",
  adminRoutes
);

// =========================================================
// MOCK INTERVIEW ROUTES
// =========================================================

app.use(
  "/api/mock-interviews",
  mockInterviewRoutes
);

// =========================================================
// START SERVER
// =========================================================

const server = app.listen(
  PORT,
  "127.0.0.1",
  () => {
    console.log(
      `MIQ Backend running on http://127.0.0.1:${PORT}`
    );
  }
);

// =========================================================
// SERVER ERROR
// =========================================================

server.on(
  "error",
  (error) => {
    console.error(
      "SERVER START ERROR"
    );

    console.error(error);
  }
);

// =========================================================
// CONNECT MONGODB
// =========================================================

connectDB();