require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./modules/users/users.routes");
const errorHandler = require("./handlers/errorHandler");

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

// Model initialization

require("./models/users.model");
require("./models/transactions.module");

app.use(express.json());

app.use("/api/users", userRoutes);

//end of all routes

app.use(errorHandler);

app.listen(8000, () => console.log("Server running succesfully"));
