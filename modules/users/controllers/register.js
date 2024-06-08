const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const jwtManager = require("../../../handlers/jwtManager");

const register = async (req, res) => {
  const usersModel = mongoose.model("users");
  const { email, password, confirm_password, name, balance } = req.body;

  // Validation
  if (!email) throw "Email must be provided";
  if (!password) throw "password must be provided";
  if (password.length < 5) throw "password must be at least 5 character long";
  if (!name) throw "Name is required";
  if (password !== confirm_password) throw "Password does not match";

  const getDuplicateEmail = await usersModel.findOne({
    email,
  });

  if (getDuplicateEmail) throw "This email already exist";

  const hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = await usersModel.create({
    name,
    email,
    password: hashedPassword,
    balance,
  });

  const accessToken = jwtManager(createdUser)

  res.status(201).json({
    status: "User registered successfully",
    accessToken: accessToken,
  });
};

module.exports = register;
