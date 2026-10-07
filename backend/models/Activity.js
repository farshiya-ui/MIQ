const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "quiz",
        "mock-interview",
        "certificate",
      ],
      required: true,
    },

    language: {
      type: String,
      default: "",
    },

    score: {
      type: Number,
      default: 0,
    },

    totalQuestions: {
      type: Number,
      default: 0,
    },

    questionsAttempted: {
      type: Number,
      default: 0,
    },

    level: {
      type: String,
      default: "",
    },

    certificateId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model(
  "Activity",
  activitySchema
);

module.exports = Activity;