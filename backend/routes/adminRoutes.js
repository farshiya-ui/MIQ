const express = require("express");

const User = require("../models/User");
const Activity = require("../models/Activity");
const MockInterview = require("../models/MockInterview");

const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

/* =========================================================
   ADMIN TEST
========================================================= */

router.get(
  "/test",
  adminMiddleware,
  async (req, res) => {
    try {
      res.json({
        success: true,
        message: "Admin route is working.",
        admin: req.admin,
      });
    } catch (error) {
      console.error("Admin test error:", error);

      res.status(500).json({
        success: false,
        message: "Admin route test failed.",
      });
    }
  }
);

/* =========================================================
   ADMIN DASHBOARD
========================================================= */

router.get(
  "/dashboard",
  adminMiddleware,
  async (req, res) => {
    try {
      const totalParticipants =
        await User.countDocuments({
          role: "user",
        });

      const googleParticipants =
        await User.countDocuments({
          role: "user",
          authProvider: "google",
        });

      const emailParticipants =
        await User.countDocuments({
          role: "user",
          authProvider: "local",
        });

      const activities =
        await Activity.find({}).sort({
          createdAt: -1,
        });

      /* ---------------------------------------------
         VALID QUIZ ACTIVITIES
      --------------------------------------------- */

      const quizActivities =
        activities.filter((activity) => {
          if (
            activity.type !== "quiz" &&
            activity.activityType !== "quiz"
          ) {
            return false;
          }

          const score = Number(
            activity.score || 0
          );

          const total = Number(
            activity.totalQuestions || 0
          );

          return (
            total > 0 &&
            score >= 0 &&
            score <= total
          );
        });

      const totalQuizAttempts =
        quizActivities.length;

      /* ---------------------------------------------
         QUESTIONS ATTEMPTED
      --------------------------------------------- */

      let totalQuestionsAttempted = 0;

      quizActivities.forEach((activity) => {
        if (
          typeof activity.questionsAttempted ===
          "number"
        ) {
          totalQuestionsAttempted +=
            activity.questionsAttempted;
        } else if (
          typeof activity.questionCount ===
          "number"
        ) {
          totalQuestionsAttempted +=
            activity.questionCount;
        } else if (
          typeof activity.totalQuestions ===
          "number"
        ) {
          totalQuestionsAttempted +=
            activity.totalQuestions;
        }
      });

      /* ---------------------------------------------
         MOCK INTERVIEWS
      --------------------------------------------- */

      const mockInterviewActivities =
        activities.filter(
          (activity) =>
            activity.type ===
              "mock-interview" ||
            activity.type ===
              "mockInterview" ||
            activity.activityType ===
              "mock-interview" ||
            activity.activityType ===
              "mockInterview"
        );

      const totalMockInterviews =
        mockInterviewActivities.length;

      /* ---------------------------------------------
         COMPLETED LEVELS
      --------------------------------------------- */

      const levelActivities =
        activities.filter(
          (activity) =>
            activity.level
        );

      const completedLevels =
        levelActivities.length;

      /* ---------------------------------------------
         CERTIFICATES
      --------------------------------------------- */

      const certificateActivities =
        activities.filter(
          (activity) =>
            activity.certificate === true ||
            activity.type === "certificate" ||
            activity.activityType ===
              "certificate"
        );

      const totalCertificates =
        certificateActivities.length;

      /* ---------------------------------------------
         ACTIVE PARTICIPANTS
      --------------------------------------------- */

      const thirtyMinutesAgo =
        new Date(
          Date.now() -
            30 * 60 * 1000
        );

      const activeParticipants =
        await User.countDocuments({
          role: "user",
          updatedAt: {
            $gte: thirtyMinutesAgo,
          },
        });

      /* ---------------------------------------------
         RECENT PARTICIPANTS
      --------------------------------------------- */

      const recentParticipants =
        await User.find({
          role: "user",
        })
          .select(
            "username email profile authProvider createdAt updatedAt"
          )
          .sort({
            createdAt: -1,
          })
          .limit(10);

      res.json({
        success: true,

        admin: req.admin,

        statistics: {
          totalParticipants,
          activeParticipants,
          totalQuizAttempts,
          totalQuestionsAttempted,
          totalMockInterviews,
          totalCertificates,
          completedLevels,
        },

        authentication: {
          emailParticipants,
          googleParticipants,
        },

        recentParticipants:
          recentParticipants.map(
            (user) => ({
              id: user._id,

              username:
                user.username,

              email:
                user.email,

              college:
                user.profile
                  ?.collegeName || "",

              branch:
                user.profile
                  ?.branch || "",

              year:
                user.profile
                  ?.year || "",

              authType:
                user.authProvider,

              role:
                user.role,

              accountCreated:
                user.createdAt,

              lastUpdated:
                user.updatedAt,
            })
          ),
      });
    } catch (error) {
      console.error(
        "Admin dashboard error:",
        error
      );

      res.status(500).json({
        success: false,

        message:
          "Unable to load admin dashboard.",
      });
    }
  }
);

/* =========================================================
   PARTICIPANTS
========================================================= */

router.get(
  "/participants",
  adminMiddleware,
  async (req, res) => {
    try {
      const participants =
        await User.find({
          role: "user",
        })
          .select(
            "username email profile authProvider role createdAt updatedAt"
          )
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,

        count:
          participants.length,

        participants:
          participants.map(
            (user) => ({
              id:
                user._id,

              username:
                user.username,

              email:
                user.email,

              college:
                user.profile
                  ?.collegeName || "",

              branch:
                user.profile
                  ?.branch || "",

              year:
                user.profile
                  ?.year || "",

              authType:
                user.authProvider,

              role:
                user.role,

              accountStatus:
                "Active",

              accountCreated:
                user.createdAt,

              lastActive:
                user.updatedAt,
            })
          ),
      });
    } catch (error) {
      console.error(
        "Participants error:",
        error
      );

      res.status(500).json({
        success: false,

        message:
          "Unable to load participants.",
      });
    }
  }
);

/* =========================================================
   PARTICIPANT DETAILS
========================================================= */

router.get(
  "/participants/:id",
  adminMiddleware,
  async (req, res) => {
    try {
      const participant =
        await User.findOne({
          _id: req.params.id,
          role: "user",
        }).select(
          "-password -resetPasswordToken -resetPasswordExpires"
        );

      if (!participant) {
        return res.status(404).json({
          success: false,

          message:
            "Participant not found.",
        });
      }

      const allParticipantActivities =
        await Activity.find({
          user: participant._id,
        }).sort({
          createdAt: -1,
        });

      /* ---------------------------------------------
         VALID PARTICIPANT ACTIVITY
      --------------------------------------------- */

      const participantActivities =
        allParticipantActivities.filter(
          (activity) => {
            if (
              activity.type === "quiz"
            ) {
              const score = Number(
                activity.score || 0
              );

              const total = Number(
                activity.totalQuestions || 0
              );

              return (
                total > 0 &&
                score >= 0 &&
                score <= total
              );
            }

            if (
              activity.type ===
              "certificate"
            ) {
              return true;
            }

            if (
              activity.type ===
              "mock-interview"
            ) {
              return true;
            }

            return false;
          }
        );

      /* ---------------------------------------------
         QUIZ RESULTS
      --------------------------------------------- */

      const quizResults =
        participantActivities.filter(
          (activity) =>
            activity.type === "quiz"
        );

      /* ---------------------------------------------
         MOCK INTERVIEW RESULTS
      --------------------------------------------- */

      const mockInterviewResults =
        participantActivities.filter(
          (activity) =>
            activity.type ===
            "mock-interview"
        );

      /* ---------------------------------------------
         CERTIFICATES
      --------------------------------------------- */

      const rawCertificates =
        participantActivities.filter(
          (activity) =>
            activity.type ===
            "certificate"
        );

      const certificates =
        rawCertificates.map(
          (certificate) => {
            const certificateLanguage =
              String(
                certificate.language || ""
              )
                .trim()
                .toLowerCase();

            const languageQuizResults =
              quizResults.filter(
                (quiz) => {
                  const quizLanguage =
                    String(
                      quiz.language || ""
                    )
                      .trim()
                      .toLowerCase();

                  return (
                    quizLanguage ===
                    certificateLanguage
                  );
                }
              );

            const finalQuiz =
              languageQuizResults
                .filter(
                  (quiz) =>
                    Number(
                      quiz.totalQuestions || 0
                    ) === 25
                )
                .sort(
                  (a, b) =>
                    new Date(
                      b.createdAt
                    ) -
                    new Date(
                      a.createdAt
                    )
                )[0];

            return {
              ...certificate.toObject(),

              score:
                finalQuiz
                  ? Number(
                      finalQuiz.score || 0
                    )
                  : Number(
                      certificate.score || 0
                    ),

              totalQuestions: 25,

              verifiedScore:
                Boolean(finalQuiz),

              sourceQuizId:
                finalQuiz
                  ? finalQuiz._id
                  : null,

              sourceQuizDate:
                finalQuiz
                  ? finalQuiz.createdAt
                  : null,
            };
          }
        );

      res.json({
        success: true,

        participant: {
          id:
            participant._id,

          username:
            participant.username,

          email:
            participant.email,

          college:
            participant.profile
              ?.collegeName || "",

          branch:
            participant.profile
              ?.branch || "",

          year:
            participant.profile
              ?.year || "",

          authType:
            participant.authProvider,

          role:
            participant.role,

          accountStatus:
            "Active",

          accountCreated:
            participant.createdAt,

          lastActive:
            participant.updatedAt,
        },

        activity:
          participantActivities,

        quizResults,

        mockInterviewResults,

        certificates,
      });
    } catch (error) {
      console.error(
        "Participant details error:",
        error
      );

      res.status(500).json({
        success: false,

        message:
          "Unable to load participant details.",
      });
    }
  }
);

/* =========================================================
   ADMIN ACTIVITY
========================================================= */

router.get(
  "/activity",
  adminMiddleware,
  async (req, res) => {
    try {
      const activity =
        await Activity.find({}).sort({
          createdAt: -1,
        });

      res.json({
        success: true,

        activity,
      });
    } catch (error) {
      console.error(
        "Admin activity error:",
        error
      );

      res.status(500).json({
        success: false,

        message:
          "Unable to load activity.",
      });
    }
  }
);

/* =========================================================
   ADMIN QUIZ RESULTS
========================================================= */

router.get(
  "/quiz-results",
  adminMiddleware,
  async (req, res) => {
    try {
      const allQuizResults =
        await Activity.find({
          $or: [
            {
              type: "quiz",
            },
            {
              activityType: "quiz",
            },
          ],
        })
          .populate(
            "user",
            "username email profile authProvider"
          )
          .sort({
            createdAt: -1,
          });

      const quizResults =
        allQuizResults.filter(
          (activity) => {
            const score = Number(
              activity.score || 0
            );

            const total = Number(
              activity.totalQuestions || 0
            );

            return (
              total > 0 &&
              score >= 0 &&
              score <= total
            );
          }
        );

      res.json({
        success: true,

        quizResults:
          quizResults.map(
            (activity) => ({
              ...activity.toObject(),

              participant: activity.user
                ? {
                    id:
                      activity.user._id,

                    username:
                      activity.user.username,

                    email:
                      activity.user.email,

                    college:
                      activity.user.profile
                        ?.collegeName || "",

                    branch:
                      activity.user.profile
                        ?.branch || "",

                    year:
                      activity.user.profile
                        ?.year || "",

                    authType:
                      activity.user
                        .authProvider,
                  }
                : null,
            })
          ),
      });
    } catch (error) {
      console.error(
        "Admin quiz results error:",
        error
      );

      res.status(500).json({
        success: false,

        message:
          "Unable to load quiz results.",
      });
    }
  }
);

/* =========================================================
   ADMIN MOCK INTERVIEWS
========================================================= */

router.get(
  "/mock-interviews",
  adminMiddleware,
  async (req, res) => {
    try {
      const mockInterviews =
        await MockInterview.find({})
          .populate(
            "user",
            "username email profile authProvider"
          )
          .sort({
            createdAt: -1,
          });

      const mockInterviewResults =
        mockInterviews.map(
          (interview) => {
            const interviewObject =
              interview.toObject();

            const user =
              interview.user;

            return {
              id:
                interview._id,

              /* ---------------------------------------
                 CANDIDATE DETAILS
              --------------------------------------- */

              name:
                interview.name ||
                user?.username ||
                "",

              username:
                user?.username ||
                interview.name ||
                "",

              email:
                user?.email ||
                "",

              college:
                interview.college ||
                user?.profile
                  ?.collegeName ||
                "",

              branch:
                interview.branch ||
                user?.profile
                  ?.branch ||
                "",

              year:
                interview.year ||
                user?.profile
                  ?.year ||
                "",

              collegeId:
                interview.collegeId ||
                "",

              /* ---------------------------------------
                 AUTHENTICATION
              --------------------------------------- */

              authType:
                user?.authProvider ||
                "",

              userId:
                user?._id ||
                interview.user ||
                null,

              /* ---------------------------------------
                 INTERVIEW DETAILS
              --------------------------------------- */

              language:
                interview.language ||
                "",

              score:
                Number(
                  interview.score || 0
                ),

              percentage:
                Number(
                  interview.percentage || 0
                ),

              performance:
                interview.performance ||
                "",

              questionsAttempted:
                Number(
                  interview.questionsAttempted ||
                    0
                ),

              totalQuestions:
                Number(
                  interview.totalQuestions ||
                    10
                ),

              status:
                interview.status ||
                "started",

              /* ---------------------------------------
                 CERTIFICATE
              --------------------------------------- */

              certificateIssued:
                Boolean(
                  interview.certificateIssued
                ),

              certificateId:
                interview.certificateId ||
                "",

              certificateIssuedAt:
                interview.certificateIssuedAt ||
                null,

              /* ---------------------------------------
                 CANDIDATE VERIFICATION PHOTO
              --------------------------------------- */

              capturedImage:
                interview.capturedImage ||
                "",

              /* ---------------------------------------
                 QUESTIONS
              --------------------------------------- */

              questions:
                interview.questions || [],

              /* ---------------------------------------
                 DATES
              --------------------------------------- */

              startedAt:
                interview.startedAt ||
                null,

              completedAt:
                interview.completedAt ||
                null,

              createdAt:
                interview.createdAt ||
                null,

              updatedAt:
                interview.updatedAt ||
                null,

              /* ---------------------------------------
                 COMPLETE RAW INTERVIEW
                 Useful for admin details page
              --------------------------------------- */

              interview:
                interviewObject,
            };
          }
        );

      res.json({
        success: true,

        count:
          mockInterviewResults.length,

        mockInterviewResults,
      });
    } catch (error) {
      console.error(
        "Admin mock interview error:",
        error
      );

      res.status(500).json({
        success: false,

        message:
          "Unable to load mock interview results.",
      });
    }
  }
);

/* =========================================================
   ADMIN CERTIFICATES
========================================================= */

router.get(
  "/certificates",
  adminMiddleware,
  async (req, res) => {
    try {
      const certificates =
        await Activity.find({
          $or: [
            {
              certificate: true,
            },
            {
              type:
                "certificate",
            },
            {
              activityType:
                "certificate",
            },
          ],
        })
          .populate(
            "user",
            "username email profile authProvider"
          )
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,

        certificates,
      });
    } catch (error) {
      console.error(
        "Admin certificates error:",
        error
      );

      res.status(500).json({
        success: false,

        message:
          "Unable to load certificates.",
      });
    }
  }
);

module.exports = router;