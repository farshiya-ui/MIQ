const express = require("express");
const crypto = require("crypto");

const router = express.Router();

const MockInterview = require("../models/MockInterview");
const authMiddleware = require("../middleware/authMiddleware");

// ======================================================
// GENERATE UNIQUE MOCK INTERVIEW CERTIFICATE ID
// ======================================================

const generateCertificateId = () => {
  const randomPart = crypto
    .randomBytes(4)
    .toString("hex")
    .toUpperCase();

  const timestampPart =
    Date.now().toString(36).toUpperCase();

  return `MIQ-MOCK-${timestampPart}-${randomPart}`;
};

// ======================================================
// START MOCK INTERVIEW
// ======================================================

router.post(
  "/start",
  authMiddleware,
  async (req, res) => {
    try {
      const {
        name,
        college,
        branch,
        year,
        collegeId,
        language,
        questions,
        capturedImage,
      } = req.body;

      // --------------------------------------------------
      // VALIDATION
      // --------------------------------------------------

      if (
        !name ||
        !college ||
        !branch ||
        !year ||
        !collegeId ||
        !language ||
        !Array.isArray(questions) ||
        questions.length !== 10
      ) {
        return res.status(400).json({
          success: false,
          message:
            "All candidate details and 10 questions are required.",
        });
      }

      // --------------------------------------------------
      // CREATE NEW MOCK ATTEMPT
      // --------------------------------------------------

      const mockInterview =
        await MockInterview.create({
          user: req.user._id,

          name: name.trim(),

          college: college.trim(),

          branch: branch.trim(),

          year: year.trim(),

          collegeId: collegeId.trim(),

          language: language.trim(),

          questions: questions.map(
            (question) => ({
              question,
              answer: "",
            })
          ),

          capturedImage:
            capturedImage || "",

          score: 0,

          percentage: 0,

          totalQuestions: 10,

          questionsAttempted: 0,

          performance: "",

          certificateIssued: false,

          certificateId: "",

          certificateIssuedAt: null,

          status: "started",

          startedAt: new Date(),
        });

      // --------------------------------------------------
      // RESPONSE
      // --------------------------------------------------

      return res.status(201).json({
        success: true,

        message:
          "Mock interview started successfully.",

        interview: mockInterview,
      });
    } catch (error) {
      console.error(
        "Start Mock Interview Error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Failed to start mock interview.",
      });
    }
  }
);

// ======================================================
// GET LOGGED-IN USER'S COMPLETED MOCK INTERVIEWS
// IMPORTANT:
// This route must come BEFORE /:id
// ======================================================

router.get(
  "/my",
  authMiddleware,
  async (req, res) => {
    try {
      const interviews =
        await MockInterview.find({
          user: req.user._id,

          status: "completed",
        })
          .populate(
            "user",
            "username email profile"
          )
          .sort({
            createdAt: -1,
          });

      return res.json({
        success: true,

        count:
          interviews.length,

        interviews,
      });
    } catch (error) {
      console.error(
        "Get My Mock Interviews Error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Failed to load your mock interview records.",
      });
    }
  }
);

// ======================================================
// SUBMIT MOCK INTERVIEW
// ======================================================

router.post(
  "/:id/submit",
  authMiddleware,
  async (req, res) => {
    try {
      const {
        answers,
        score,
        percentage,
        performance,
      } = req.body;

      // --------------------------------------------------
      // FIND ONLY THIS USER'S INTERVIEW
      // --------------------------------------------------

      const mockInterview =
        await MockInterview.findOne({
          _id: req.params.id,

          user: req.user._id,
        });

      if (!mockInterview) {
        return res.status(404).json({
          success: false,

          message:
            "Mock interview not found.",
        });
      }

      // --------------------------------------------------
      // PREVENT DOUBLE SUBMISSION
      // --------------------------------------------------

      if (
        mockInterview.status ===
        "completed"
      ) {
        return res.status(400).json({
          success: false,

          message:
            "This mock interview has already been submitted.",
        });
      }

      // --------------------------------------------------
      // SAVE ANSWERS
      // --------------------------------------------------

      if (Array.isArray(answers)) {
        mockInterview.questions =
          mockInterview.questions.map(
            (item, index) => ({
              question:
                item.question,

              answer:
                typeof answers[index] ===
                "string"
                  ? answers[index]
                  : "",
            })
          );
      }

      // --------------------------------------------------
      // COUNT ATTEMPTED QUESTIONS
      // --------------------------------------------------

      mockInterview.questionsAttempted =
        Array.isArray(answers)
          ? answers.filter(
              (answer) =>
                typeof answer ===
                  "string" &&
                answer.trim() !== ""
            ).length
          : 0;

      // --------------------------------------------------
      // SCORE
      // --------------------------------------------------

      mockInterview.score =
        typeof score === "number"
          ? Math.max(
              0,
              Math.min(100, score)
            )
          : 0;

      // --------------------------------------------------
      // PERCENTAGE
      // --------------------------------------------------

      mockInterview.percentage =
        typeof percentage === "number"
          ? Math.max(
              0,
              Math.min(100, percentage)
            )
          : mockInterview.score;

      // --------------------------------------------------
      // PERFORMANCE
      // --------------------------------------------------

      mockInterview.performance =
        typeof performance === "string"
          ? performance.trim()
          : "";

      // --------------------------------------------------
      // STATUS
      // --------------------------------------------------

      mockInterview.status =
        "completed";

      mockInterview.completedAt =
        new Date();

      // ==================================================
      // GENERATE CERTIFICATE
      // ==================================================

      if (
        !mockInterview.certificateIssued
      ) {
        mockInterview.certificateIssued =
          true;

        mockInterview.certificateId =
          generateCertificateId();

        mockInterview.certificateIssuedAt =
          new Date();
      }

      // --------------------------------------------------
      // SAVE COMPLETED INTERVIEW
      // --------------------------------------------------

      await mockInterview.save();

      // --------------------------------------------------
      // RESPONSE
      // --------------------------------------------------

      return res.json({
        success: true,

        message:
          "Mock interview submitted successfully.",

        certificateIssued:
          mockInterview.certificateIssued,

        certificateId:
          mockInterview.certificateId,

        interview: mockInterview,
      });
    } catch (error) {
      console.error(
        "Submit Mock Interview Error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Failed to submit mock interview.",
      });
    }
  }
);

// ======================================================
// GET ONE MOCK INTERVIEW
// ======================================================

router.get(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      // --------------------------------------------------
      // ONLY OWNER CAN VIEW
      // --------------------------------------------------

      const mockInterview =
        await MockInterview.findOne({
          _id: req.params.id,

          user: req.user._id,
        }).populate(
          "user",
          "username email profile"
        );

      if (!mockInterview) {
        return res.status(404).json({
          success: false,

          message:
            "Mock interview not found.",
        });
      }

      return res.json({
        success: true,

        interview: mockInterview,
      });
    } catch (error) {
      console.error(
        "Get Mock Interview Error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Failed to get mock interview.",
      });
    }
  }
);

// ======================================================
// GET LOGGED-IN USER'S ALL MOCK INTERVIEWS
// ======================================================

router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const interviews =
        await MockInterview.find({
          user: req.user._id,
        })
          .populate(
            "user",
            "username email profile"
          )
          .sort({
            createdAt: -1,
          });

      return res.json({
        success: true,

        count:
          interviews.length,

        interviews,
      });
    } catch (error) {
      console.error(
        "Get User Mock Interviews Error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Failed to get mock interviews.",
      });
    }
  }
);

// ======================================================
// EXPORT
// ======================================================

module.exports = router;