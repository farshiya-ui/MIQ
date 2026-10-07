const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");

const router = express.Router();

// =========================================================
// GOOGLE OAUTH CLIENT
// =========================================================

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:5000/api/auth/google/callback"
);

// =========================================================
// CREATE JWT
// =========================================================

const createToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// =========================================================
// AUTH TEST
// =========================================================

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth routes are loaded correctly.",
  });
});

// =========================================================
// SIGNUP
// =========================================================

router.post("/signup", async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      collegeName,
      branch,
      year,
    } = req.body;

    // -----------------------------------------------------
    // CHECK REQUIRED FIELDS
    // -----------------------------------------------------

    if (
      !username ||
      !email ||
      !password ||
      !collegeName ||
      !branch ||
      !year
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields.",
      });
    }

    // -----------------------------------------------------
    // CLEAN INPUT
    // -----------------------------------------------------

    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanCollege = collegeName.trim();
    const cleanBranch = branch.trim();
    const cleanYear = year.trim();

    // -----------------------------------------------------
    // USERNAME VALIDATION
    // -----------------------------------------------------

    if (cleanUsername.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Username must be at least 3 characters.",
      });
    }

    // -----------------------------------------------------
    // PASSWORD VALIDATION
    // -----------------------------------------------------

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    // -----------------------------------------------------
    // CHECK EXISTING EMAIL
    // -----------------------------------------------------

    const existingEmail = await User.findOne({
      email: cleanEmail,
    });

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered.",
      });
    }

    // -----------------------------------------------------
    // CHECK EXISTING USERNAME
    // -----------------------------------------------------

    const existingUsername = await User.findOne({
      username: cleanUsername,
    });

    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: "Username is already taken.",
      });
    }

    // -----------------------------------------------------
    // HASH PASSWORD
    // -----------------------------------------------------

    const hashedPassword = await bcrypt.hash(
      password,
      12
    );

    // -----------------------------------------------------
    // CREATE USER
    // -----------------------------------------------------

    const user = await User.create({
      username: cleanUsername,
      email: cleanEmail,
      password: hashedPassword,
      authProvider: "local",
      role: "user",

      profile: {
        collegeName: cleanCollege,
        branch: cleanBranch,
        year: cleanYear,
      },
    });

    // -----------------------------------------------------
    // CREATE JWT
    // -----------------------------------------------------

    const token = createToken(user);

    // -----------------------------------------------------
    // SUCCESS RESPONSE
    // -----------------------------------------------------

    res.status(201).json({
      success: true,
      message: "Account created successfully.",
      token,

      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,

        collegeName:
          user.profile?.collegeName || "",

        branch:
          user.profile?.branch || "",

        year:
          user.profile?.year || "",
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    res.status(500).json({
      success: false,
      message: "Server error during signup.",
    });
  }
});

// =========================================================
// LOGIN
// =========================================================

router.post("/login", async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    // -----------------------------------------------------
    // CHECK REQUIRED FIELDS
    // -----------------------------------------------------

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // -----------------------------------------------------
    // CLEAN EMAIL
    // -----------------------------------------------------

    const cleanEmail =
      email.trim().toLowerCase();

    // -----------------------------------------------------
    // FIND USER
    // -----------------------------------------------------

    const user = await User.findOne({
      email: cleanEmail,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // -----------------------------------------------------
    // GOOGLE ACCOUNT CHECK
    // -----------------------------------------------------

    if (
      user.authProvider === "google" &&
      !user.password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "This account uses Google login. Please continue with Google.",
      });
    }

    // -----------------------------------------------------
    // PASSWORD CHECK
    // -----------------------------------------------------

    if (!user.password) {
      return res.status(401).json({
        success: false,
        message:
          "Password login is not available for this account.",
      });
    }

    // -----------------------------------------------------
    // COMPARE PASSWORD
    // -----------------------------------------------------

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // -----------------------------------------------------
    // CREATE TOKEN
    // -----------------------------------------------------

    const token =
      createToken(user);

    // -----------------------------------------------------
    // SUCCESS
    // -----------------------------------------------------

    res.json({
      success: true,
      message: "Login successful.",
      token,

      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,

        collegeName:
          user.profile?.collegeName || "",

        branch:
          user.profile?.branch || "",

        year:
          user.profile?.year || "",
      },
    });
  } catch (error) {
    console.error(
      "Login error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error during login.",
    });
  }
});

// =========================================================
// GOOGLE LOGIN - START
// =========================================================

router.get(
  "/google",
  (req, res) => {
    try {
      const authUrl =
        googleClient.generateAuthUrl({
          access_type: "offline",

          scope: [
            "openid",
            "email",
            "profile",
          ],

          prompt:
            "select_account",
        });

      res.redirect(authUrl);
    } catch (error) {
      console.error(
        "Google login start error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to start Google login.",
      });
    }
  }
);

// =========================================================
// GOOGLE LOGIN - CALLBACK
// =========================================================

router.get(
  "/google/callback",
  async (req, res) => {
    try {
      const {
        code,
      } = req.query;

      // ---------------------------------------------------
      // CHECK CODE
      // ---------------------------------------------------

      if (!code) {
        return res.status(400).send(
          "Google authorization code is missing."
        );
      }

      // ---------------------------------------------------
      // GET GOOGLE TOKENS
      // ---------------------------------------------------

      const {
        tokens,
      } =
        await googleClient.getToken(
          code
        );

      if (!tokens.id_token) {
        return res.status(401).send(
          "Google ID token was not received."
        );
      }

      // ---------------------------------------------------
      // VERIFY GOOGLE TOKEN
      // ---------------------------------------------------

      const ticket =
        await googleClient.verifyIdToken({
          idToken:
            tokens.id_token,

          audience:
            process.env.GOOGLE_CLIENT_ID,
        });

      const payload =
        ticket.getPayload();

      if (!payload) {
        return res.status(401).send(
          "Unable to verify Google account."
        );
      }

      // ---------------------------------------------------
      // GOOGLE USER DATA
      // ---------------------------------------------------

      const {
        sub: googleId,
        email,
        name,
        email_verified,
      } = payload;

      if (
        !email ||
        !email_verified
      ) {
        return res.status(400).send(
          "Google email could not be verified."
        );
      }

      const cleanEmail =
        email
          .toLowerCase()
          .trim();

      // ---------------------------------------------------
      // FIND EXISTING USER
      // ---------------------------------------------------

      let user =
        await User.findOne({
          email: cleanEmail,
        });

      // ===================================================
      // EXISTING USER
      // ===================================================

      if (user) {
        user.googleId =
          googleId;

        if (!user.authProvider) {
          user.authProvider =
            "google";
        }

        await user.save();
      }

      // ===================================================
      // NEW GOOGLE USER
      // ===================================================

      else {
        let username =
          name?.trim() ||
          cleanEmail.split("@")[0];

        username =
          username.replace(
            /\s+/g,
            ""
          );

        const usernameExists =
          await User.findOne({
            username,
          });

        if (usernameExists) {
          username =
            `${username}${Math.floor(
              Math.random() * 10000
            )}`;
        }

        user =
          await User.create({
            username,
            email: cleanEmail,
            password: null,
            googleId,
            authProvider: "google",
            role: "user",
          });
      }

      // ---------------------------------------------------
      // CREATE JWT
      // ---------------------------------------------------

      const token =
        createToken(user);

      // ---------------------------------------------------
      // FRONTEND URL
      // ---------------------------------------------------

      const frontendUrl =
        process.env.FRONTEND_URL ||
        "http://localhost:5173";

      // ---------------------------------------------------
      // REDIRECT
      // ---------------------------------------------------

      res.redirect(
        `${frontendUrl}/google-success?token=${encodeURIComponent(
          token
        )}`
      );
    } catch (error) {
      console.error(
        "Google callback error:",
        error
      );

      const frontendUrl =
        process.env.FRONTEND_URL ||
        "http://localhost:5173";

      res.redirect(
        `${frontendUrl}/login?googleError=true`
      );
    }
  }
);

// =========================================================
// WEBSITE PASSWORD RESET
// STEP 1 — VERIFY ACCOUNT
// =========================================================

router.post(
  "/verify-reset",
  async (req, res) => {
    try {
      const {
        username,
        email,
        collegeName,
        branch,
        year,
      } = req.body;

      // ---------------------------------------------------
      // CHECK REQUIRED FIELDS
      // ---------------------------------------------------

      if (
        !username ||
        !email ||
        !collegeName ||
        !branch ||
        !year
      ) {
        return res.status(400).json({
          success: false,
          message:
            "All account verification details are required.",
        });
      }

      // ---------------------------------------------------
      // CLEAN INPUT
      // ---------------------------------------------------

      const cleanUsername =
        username.trim();

      const cleanEmail =
        email
          .trim()
          .toLowerCase();

      const cleanCollege =
        collegeName.trim();

      const cleanBranch =
        branch.trim();

      const cleanYear =
        year.trim();

      // ---------------------------------------------------
      // FIND USER
      // ---------------------------------------------------

      const user =
        await User.findOne({
          username:
            cleanUsername,

          email:
            cleanEmail,
        });

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "Username and email do not match any account.",
        });
      }

      // ---------------------------------------------------
      // GET SAVED PROFILE DETAILS
      // ---------------------------------------------------

      const savedCollege =
        user.profile?.collegeName?.trim() ||
        "";

      const savedBranch =
        user.profile?.branch?.trim() ||
        "";

      const savedYear =
        user.profile?.year?.trim() ||
        "";

      // ---------------------------------------------------
      // VERIFY PROFILE DETAILS
      // ---------------------------------------------------

      if (
        savedCollege.toLowerCase() !==
          cleanCollege.toLowerCase() ||
        savedBranch.toLowerCase() !==
          cleanBranch.toLowerCase() ||
        savedYear.toLowerCase() !==
          cleanYear.toLowerCase()
      ) {
        return res.status(401).json({
          success: false,
          message:
            "Account details could not be verified.",
        });
      }

      // ---------------------------------------------------
      // CREATE RESET TOKEN
      // ---------------------------------------------------

      const resetToken =
        jwt.sign(
          {
            userId:
              user._id,

            purpose:
              "password-reset",
          },

          process.env.JWT_SECRET,

          {
            expiresIn:
              "10m",
          }
        );

      // ---------------------------------------------------
      // SUCCESS
      // ---------------------------------------------------

      res.json({
        success: true,

        message:
          "Account verified successfully.",

        resetToken,

        user: {
          id: user._id,
          username:
            user.username,
          email:
            user.email,
        },
      });
    } catch (error) {
      console.error(
        "Reset verification error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Server error during account verification.",
      });
    }
  }
);

// =========================================================
// WEBSITE PASSWORD RESET
// STEP 2 — UPDATE PASSWORD
// =========================================================

router.post(
  "/reset-password",
  async (req, res) => {
    try {
      const {
        resetToken,
        password,
      } = req.body;

      // ---------------------------------------------------
      // CHECK REQUIRED FIELDS
      // ---------------------------------------------------

      if (
        !resetToken ||
        !password
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Reset token and new password are required.",
        });
      }

      // ---------------------------------------------------
      // PASSWORD LENGTH
      // ---------------------------------------------------

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message:
            "Password must be at least 6 characters.",
        });
      }

      // ---------------------------------------------------
      // VERIFY RESET TOKEN
      // ---------------------------------------------------

      let decoded;

      try {
        decoded =
          jwt.verify(
            resetToken,
            process.env.JWT_SECRET
          );
      } catch (tokenError) {
        return res.status(401).json({
          success: false,
          message:
            "Reset session is invalid or has expired. Please start again.",
        });
      }

      // ---------------------------------------------------
      // CHECK TOKEN PURPOSE
      // ---------------------------------------------------

      if (
        !decoded ||
        decoded.purpose !==
          "password-reset"
      ) {
        return res.status(401).json({
          success: false,
          message:
            "Invalid password reset session.",
        });
      }

      // ---------------------------------------------------
      // FIND USER
      // ---------------------------------------------------

      const user =
        await User.findById(
          decoded.userId
        );

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User account could not be found.",
        });
      }

      // ---------------------------------------------------
      // HASH NEW PASSWORD
      // ---------------------------------------------------

      const hashedPassword =
        await bcrypt.hash(
          password,
          12
        );

      // ---------------------------------------------------
      // UPDATE PASSWORD
      // ---------------------------------------------------

      user.password =
        hashedPassword;

      // ---------------------------------------------------
      // CHANGE AUTH PROVIDER IF NECESSARY
      // ---------------------------------------------------

      if (
        user.authProvider ===
        "google"
      ) {
        user.authProvider =
          "local";
      }

      await user.save();

      // ---------------------------------------------------
      // SUCCESS
      // ---------------------------------------------------

      res.json({
        success: true,
        message:
          "Password reset successfully. You can now login.",
      });
    } catch (error) {
      console.error(
        "Reset password error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Server error while resetting password.",
      });
    }
  }
);

// =========================================================
// ADMIN LOGIN
// =========================================================

router.post(
  "/admin-login",
  async (req, res) => {
    try {
      const {
        username,
        password,
      } = req.body;

      // ---------------------------------------------------
      // CHECK REQUIRED FIELDS
      // ---------------------------------------------------

      if (
        !username ||
        !password
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Admin username and password are required.",
        });
      }

      // ---------------------------------------------------
      // GET ADMIN CREDENTIALS FROM .ENV
      // ---------------------------------------------------

      const adminUsername =
        process.env.ADMIN_USERNAME;

      const adminPassword =
        process.env.ADMIN_PASSWORD;

      if (
        !adminUsername ||
        !adminPassword
      ) {
        return res.status(500).json({
          success: false,
          message:
            "Admin credentials are not configured.",
        });
      }

      // ---------------------------------------------------
      // VERIFY ADMIN CREDENTIALS
      // ---------------------------------------------------

      if (
        username.trim() !==
          adminUsername ||
        password !==
          adminPassword
      ) {
        return res.status(401).json({
          success: false,
          message:
            "Invalid admin credentials.",
        });
      }

      // ---------------------------------------------------
      // CREATE ADMIN TOKEN
      // ---------------------------------------------------

      const adminToken =
        jwt.sign(
          {
            username:
              adminUsername,

            role:
              "admin",

            purpose:
              "admin-access",
          },

          process.env.JWT_SECRET,

          {
            expiresIn:
              "2h",
          }
        );

      // ---------------------------------------------------
      // SUCCESS RESPONSE
      // ---------------------------------------------------

      return res.status(200).json({
        success: true,

        message:
          "Admin login successful.",

        token:
          adminToken,

        admin: {
          username:
            adminUsername,

          role:
            "admin",
        },
      });
    } catch (error) {
      console.error(
        "Admin login error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Server error during admin login.",
      });
    }
  }
);

// =========================================================
// EXPORT ROUTER
// =========================================================

module.exports = router;