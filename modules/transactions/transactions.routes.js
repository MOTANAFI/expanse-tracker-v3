const express = require("express");
const addIncome = require("../controllers/addIncome");
const auth = require("../../middleware/auth");
const addExpense = require("../controllers/addExpense");

const transactionRoutes = express.Router();

transactionRoutes.use(auth);

transactionRoutes.post("/addIncome", addIncome);
transactionRoutes.post("/addExpense", addExpense);

module.exports = transactionRoutes;
