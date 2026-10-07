const express = require("express");
const jwt = require("jsonwebtoken");

const Activity = require("../models/Activity");

const router = express.Router();


// =========================================================
// AUTHENTICATION HELPER
// =========================================================

const getUserIdFromToken = (req) => {
  const authHeader = req.headers.authorization;

  if (
    !authHeader ||
    !authHeader.startsWith("Bearer ")
  ) {
    return null;
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
  );

  return decoded.userId;
};


// =========================================================
// SAVE ACTIVITY
// =========================================================

router.post("/", async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required.",
      });
    }

    const {
      type,
      language,
      score,
      totalQuestions,
      questionsAttempted,
      level,
      certificateId,
    } = req.body;

    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Activity type is required.",
      });
    }

    const safeScore = Math.min(
      Math.max(Number(score) || 0, 0),
      25
    );

    const safeTotalQuestions =
      Math.max(Number(totalQuestions) || 0, 0);

    const safeQuestionsAttempted =
      Math.max(Number(questionsAttempted) || 0, 0);

    const activity = await Activity.create({
      user: userId,
      type,
      language: language || "",
      score: safeScore,
      totalQuestions: safeTotalQuestions,
      questionsAttempted:
        safeQuestionsAttempted,
      level: level || "",
      certificateId: certificateId || "",
    });

    res.status(201).json({
      success: true,
      message: "Activity saved successfully.",
      activity,
    });

  } catch (error) {
    console.error(
      "Save activity error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while saving activity.",
    });
  }
});


// =========================================================
// DELETE OLD INVALID CERTIFICATES
// =========================================================

router.delete(
  "/cleanup-invalid-certificates",
  async (req, res) => {
    try {
      const userId =
        getUserIdFromToken(req);

      if (!userId) {
        return res.status(401).json({
          success: false,
          message:
            "Authentication token is required.",
        });
      }

      const result =
        await Activity.deleteMany({
          user: userId,
          type: "certificate",
          score: { $gt: 25 },
        });

      res.json({
        success: true,
        message:
          "Invalid certificate records removed successfully.",
        deletedCount:
          result.deletedCount,
      });

    } catch (error) {
      console.error(
        "Cleanup certificate error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Server error while cleaning invalid certificates.",
      });
    }
  }
);


// =========================================================
// GET USER ACTIVITY
// =========================================================

router.get("/", async (req, res) => {
  try {
    const userId =
      getUserIdFromToken(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication token is required.",
      });
    }

    const activities =
      await Activity.find({
        user: userId,
      }).sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      activities,
    });

  } catch (error) {
    console.error(
      "Get activity error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while loading activity.",
    });
  }
});


// =========================================================
// DASHBOARD SUMMARY
// =========================================================

router.get("/summary", async (req, res) => {
  try {
    const userId =
      getUserIdFromToken(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication token is required.",
      });
    }

    const activities =
      await Activity.find({
        user: userId,
      }).sort({
        createdAt: -1,
      });


    // =====================================================
    // QUIZ ACTIVITIES
    // =====================================================

    const quizActivities =
      activities.filter(
        (activity) =>
          activity.type === "quiz"
      );


    // =====================================================
    // VALID COMPLETED LEVELS
    // =====================================================

    const completedQuizActivities =
      quizActivities.filter((activity) => {
        const level =
          String(activity.level || "")
            .toLowerCase()
            .trim();

        return [
          "beginner",
          "intermediate",
          "advanced",
        ].includes(level);
      });


    // =====================================================
    // QUESTIONS ATTEMPTED
    // =====================================================

    const questionsAttempted =
      completedQuizActivities.reduce(
        (total, activity) => {
          return (
            total +
            (
              Number(
                activity.questionsAttempted
              ) || 0
            )
          );
        },
        0
      );


    // =====================================================
    // UNIQUE LANGUAGES
    // =====================================================

    const uniqueLanguages = [
      ...new Set(
        completedQuizActivities
          .map(
            (activity) =>
              String(
                activity.language || ""
              ).trim()
          )
          .filter(
            (language) => language
          )
      ),
    ];


    // =====================================================
    // QUIZZES COMPLETED
    // =====================================================
    //
    // One completed quiz means all 3 levels of a
    // particular language have been completed.
    //
    // Example:
    //
    // HTML
    // Beginner      ✓
    // Intermediate  ✓
    // Advanced      ✓
    //
    // = 1 completed quiz
    //
    // =====================================================

    const quizzesCompleted =
      uniqueLanguages.filter(
        (language) => {
          const languageActivities =
            completedQuizActivities.filter(
              (activity) =>
                String(
                  activity.language || ""
                ).trim() === language
            );

          const levels =
            new Set(
              languageActivities.map(
                (activity) =>
                  String(
                    activity.level || ""
                  )
                    .toLowerCase()
                    .trim()
              )
            );

          return (
            levels.has("beginner") &&
            levels.has("intermediate") &&
            levels.has("advanced")
          );
        }
      ).length;


    // =====================================================
    // LEVEL PROGRESS
    // =====================================================

    const levelProgress = {};


    uniqueLanguages.forEach(
      (language) => {
        const languageActivities =
          completedQuizActivities.filter(
            (activity) =>
              String(
                activity.language || ""
              ).trim() === language
          );


        const levels = {
          beginner: false,
          intermediate: false,
          advanced: false,
        };


        languageActivities.forEach(
          (activity) => {
            const level =
              String(
                activity.level || ""
              )
                .toLowerCase()
                .trim();


            if (
              level === "beginner"
            ) {
              levels.beginner = true;
            }


            if (
              level ===
              "intermediate"
            ) {
              levels.intermediate =
                true;
            }


            if (
              level === "advanced"
            ) {
              levels.advanced = true;
            }
          }
        );


        levelProgress[language] =
          levels;
      }
    );


    // =====================================================
    // TOTAL COMPLETED LEVELS
    // =====================================================

    let completedLevels = 0;


    Object.values(
      levelProgress
    ).forEach((levels) => {

      if (levels.beginner) {
        completedLevels++;
      }

      if (levels.intermediate) {
        completedLevels++;
      }

      if (levels.advanced) {
        completedLevels++;
      }

    });


    // =====================================================
    // MOCK INTERVIEWS
    // =====================================================

    const mockInterviewActivities =
      activities.filter(
        (activity) =>
          activity.type ===
          "mock-interview"
      );


    const mockInterviews =
      mockInterviewActivities.length;


    // =====================================================
    // CERTIFICATES
    // =====================================================

    const certificateActivities =
      activities.filter(
        (activity) =>
          activity.type ===
          "certificate"
      );


    const uniqueCertificateLanguages =
      [
        ...new Set(
          certificateActivities
            .map(
              (activity) =>
                String(
                  activity.language || ""
                ).trim()
            )
            .filter(
              (language) =>
                language
            )
        ),
      ];


    const certificates =
      uniqueCertificateLanguages.length;


    // =====================================================
    // FINAL RESPONSE
    // =====================================================

    res.json({
      success: true,

      summary: {
        questionsAttempted,

        quizzesCompleted,

        mockInterviews,

        certificates,

        completedLevels,

        levelProgress,
      },
    });

  } catch (error) {
    console.error(
      "Get activity summary error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while loading activity summary.",
    });
  }
});


module.exports = router;