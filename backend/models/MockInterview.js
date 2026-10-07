const mongoose = require("mongoose");

const mockInterviewSchema = new mongoose.Schema(
  {
    /* =====================================================
       USER
    ===================================================== */

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    /* =====================================================
       CANDIDATE DETAILS
    ===================================================== */

    name: {
      type: String,
      required: true,
      trim: true,
    },

    college: {
      type: String,
      required: true,
      trim: true,
    },

    branch: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: String,
      required: true,
      trim: true,
    },

    collegeId: {
      type: String,
      required: true,
      trim: true,
    },

    /* =====================================================
       INTERVIEW LANGUAGE
    ===================================================== */

    language: {
      type: String,
      required: true,
      trim: true,
    },

    /* =====================================================
       QUESTIONS + ANSWERS
    ===================================================== */

    questions: [
      {
        question: {
          type: String,
          required: true,
        },

        answer: {
          type: String,
          default: "",
        },
      },
    ],

    /* =====================================================
       RESULT
    ===================================================== */

    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    percentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    totalQuestions: {
      type: Number,
      default: 10,
    },

    questionsAttempted: {
      type: Number,
      default: 0,
    },

    performance: {
      type: String,
      default: "",
      trim: true,
    },

    /* =====================================================
       CAMERA VERIFICATION
    ===================================================== */

    capturedImage: {
      type: String,
      default: "",
    },

    /* =====================================================
       CERTIFICATE
    ===================================================== */

    certificateIssued: {
      type: Boolean,
      default: false,
    },

    certificateId: {
      type: String,
      default: "",
      trim: true,
    },

    certificateIssuedAt: {
      type: Date,
      default: null,
    },

    /* =====================================================
       INTERVIEW STATUS
    ===================================================== */

    status: {
      type: String,
      enum: [
        "started",
        "completed",
        "cancelled",
      ],
      default: "started",
    },

    /* =====================================================
       TIMESTAMPS
    ===================================================== */

    startedAt: {
      type: Date,
      default: Date.now,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "MockInterview",
  mockInterviewSchema
);