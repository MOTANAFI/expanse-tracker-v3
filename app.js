require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./modules/users/users.routes");
const errorHandler = require("./handlers/errorHandler");
const transactionRoutes = require("./modules/transactions/transactions.routes");

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
require("./models/transactions.model");

app.use(express.json());

//Routes

app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes)

//end of all routes

app.use(errorHandler);

app.listen(8000, () => console.log("Server running succesfully"));
