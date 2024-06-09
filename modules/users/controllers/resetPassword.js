const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailManager = require("../../../managers/emailManager");
const resetPassword = async (req, res) => {
  const usersModel = mongoose.model("users");
  const { email, new_password, reset_code } = req.body;

  if (!email) throw "Email is required";
  if (!new_password) throw "Please provide new password";
  if (!reset_code) throw "Reset code is required!!";
  if (new_password.length < 5) throw "Password must be 5 characters long!";

  const userWithResetCode = await usersModel.findOne({
    email,
    reset_code,
  });

  if (!userWithResetCode) throw "Reset code does not match";
  const hashedPassword = await bcrypt.hash(new_password, 12);

  await usersModel.updateOne(
    {
      email,
    },
    {
      password: hashedPassword,
      reset_code: "",
    },
    {
      runValidators: true,
    }
  );

  await emailManager(
    email,
    "Your password is reset successfully!!. Please contact us if not",
    "Your password is reset successfully!!. Please contact us if not",
    "password reset succcessfully"
  );

  res.status(200).json({
    status: "success",
    message: "password reset successfull",
  });
};

module.exports = resetPassword;
