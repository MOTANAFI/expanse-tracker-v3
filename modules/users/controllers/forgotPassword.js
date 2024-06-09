const mongoose = require("mongoose");
const nodemailer = require("nodemailer")
const forgotPassword = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email } = req.body;

  if (!email) throw "Email is required";

  const getUser = await usersModel.findOne({ email });

  if(!getUser) throw "This email does not exist in the system"

  const resetCode = Math.floor(10000 + Math.random() * 90000)

  await usersModel.updateOne({
    email
  }, {
    reset_code: resetCode
  }, {
    runValidators: true
  })

  // sending reset email using nodemailer

  
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "59ca3db3234835",
      pass: "3220176f082e42"
    }
  });

  await transport.sendMail({
    to: email,
    from: "info@expenseTracker.com",
    text: `Your password reset code is ${resetCode}`,
    html: `Your password reset code <h2>${resetCode}</h2>`,
    subject: "Reset your password"
  })

  res.status(200).json({
    status: `Reset code sent to ${email} successfully`,
  });
};

module.exports = forgotPassword;
