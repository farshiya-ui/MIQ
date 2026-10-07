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

const PORT = process.env.PORT || 5000;

// =========================================================
// MIDDLEWARE
// =========================================================

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));

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

app.use("/api/auth", authRoutes);

// =========================================================
// PROFILE ROUTES
// =========================================================

app.use("/api/profile", profileRoutes);

// =========================================================
// ACTIVITY ROUTES
// =========================================================

app.use("/api/activity", activityRoutes);

// =========================================================
// ADMIN ROUTES
// =========================================================

app.use("/api/admin", adminRoutes);

// =========================================================
// MOCK INTERVIEW ROUTES
// =========================================================

app.use("/api/mock-interviews", mockInterviewRoutes);

// =========================================================
// START SERVER
// =========================================================

const server = app.listen(
  PORT,
  "0.0.0.0",
  () => {
    console.log(
      `MIQ Backend running on port ${PORT}`
    );
  }
);

// =========================================================
// SERVER ERROR
// =========================================================

server.on("error", (error) => {
  console.error("SERVER START ERROR");
  console.error(error);
});

// =========================================================
// CONNECT MONGODB
// =========================================================

connectDB();