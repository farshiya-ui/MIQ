const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const sendPasswordResetEmail = async (
  email,
  resetUrl
) => {
  await transporter.sendMail({
    from: `"MIQ Mock Interview" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "MIQ Password Reset",

    html: `
      <div style="
        font-family: Arial, sans-serif;
        background: #f4f8fc;
        padding: 40px 20px;
      ">

        <div style="
          max-width: 600px;
          margin: auto;
          background: white;
          border-radius: 14px;
          padding: 40px;
          border: 2px solid #0b2a4a;
        ">

          <h1 style="
            color: #0b2a4a;
            text-align: center;
            margin-bottom: 10px;
          ">
            MIQ
          </h1>

          <p style="
            text-align: center;
            color: #4b6b88;
            font-size: 14px;
          ">
            Mock Interview Simulator & Question Bank
          </p>

          <hr style="
            border: none;
            border-top: 1px solid #d9e5ef;
            margin: 25px 0;
          " />

          <h2 style="color: #111827;">
            Reset Your Password
          </h2>

          <p style="
            color: #374151;
            font-size: 15px;
            line-height: 1.6;
          ">
            We received a request to reset your MIQ
            account password.
          </p>

          <p style="
            color: #374151;
            font-size: 15px;
            line-height: 1.6;
          ">
            Click the button below to create a new password.
          </p>

          <div style="
            text-align: center;
            margin: 30px 0;
          ">

            <a
              href="${resetUrl}"
              style="
                display: inline-block;
                background: #0b2a4a;
                color: white;
                text-decoration: none;
                padding: 13px 28px;
                border-radius: 8px;
                font-weight: bold;
              "
            >
              Reset Password
            </a>

          </div>

          <p style="
            color: #6b7280;
            font-size: 13px;
            line-height: 1.5;
          ">
            This password reset link will expire in
            15 minutes.
          </p>

          <p style="
            color: #6b7280;
            font-size: 13px;
            line-height: 1.5;
          ">
            If you did not request a password reset,
            you can safely ignore this email.
          </p>

          <hr style="
            border: none;
            border-top: 1px solid #d9e5ef;
            margin: 25px 0;
          " />

          <p style="
            text-align: center;
            color: #6b7280;
            font-size: 12px;
          ">
            © MIQ Mock Interview Simulator & Question Bank
          </p>

        </div>

      </div>
    `,
  });
};

module.exports = {
  sendPasswordResetEmail,
};