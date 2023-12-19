const nodemailer = require("nodemailer");

const emailService = async (emailOptions) => {
  // Send email using nodemailer

  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emailOptions.to,
    subject: emailOptions.subject,
    text: emailOptions.text,
    html: emailOptions.html
  };

  await transporter.sendMail(mailOptions);
};

module.exports = emailService;
