const express = require("express");
const register = require("./modules/users/controllers/register");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGODB_CONNECTION, {})
  .then(() => {
    console.log("Database connected succesfully");
  })
  .catch(() => {
    console.log("Database connectin failed");
  });

  require("./models/users.model")

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "app running successfully",
  });
});
app.post("/api/register", register);

app.listen(8000, () => console.log("Server running succesfully"));
