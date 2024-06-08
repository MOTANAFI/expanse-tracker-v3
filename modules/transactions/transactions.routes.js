const express = require("express");
const addIncome = require("../controllers/addIncome");
const auth = require("../../middleware/auth");

const transactionRoutes = express.Router();

transactionRoutes.use(auth);

transactionRoutes.post("/addIncome", addIncome);

module.exports = transactionRoutes;
