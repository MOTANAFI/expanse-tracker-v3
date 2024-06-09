const nodemailer = require("nodemailer")
const emailManager = async (to, text, html, subject) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "59ca3db3234835",
      pass: "3220176f082e42",
    },
  });

  await transport.sendMail({
    to,
    from: "info@expenseTracker.com",
    text,
    html,
    subject,
  });
};

module.exports = emailManager;
