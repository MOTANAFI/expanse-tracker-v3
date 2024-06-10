require("express-async-errors");
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const userRoutes = require("./modules/users/users.routes");
const errorHandler = require("./handlers/errorHandler");
const transactionRoutes = require("./modules/transactions/transactions.routes");

require("dotenv").config();

const app = express();
app.use(cors())

mongoose
  .connect(process.env.MONGODB_CONNECTION, {})
  .then(() => {
    console.log("Database connected succesfully");
  })
  .catch(() => {
    console.log("Database connection failed");
  });

// Model initialization

require("./models/users.model");
require("./models/transactions.model");

app.use(express.json());

//Routes

app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

//end of all routes

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: "Not Found!!!"
  })
})

app.use(errorHandler);

app.listen(8000, () => console.log("Server running succesfully"));
