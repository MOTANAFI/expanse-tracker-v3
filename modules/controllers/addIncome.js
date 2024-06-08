const mongoose = require("mongoose");
const validator = require("validator");
const addIncome = async (req, res) => {
  const usersModel = mongoose.model("users");
  const transactionsModel = mongoose.model("transactions");

  const { amount, remarks } = req.body;

  if (!amount) throw "Amount is required";
  if (!remarks) throw "Remarks is required";
  if (remarks.length < 5)
    throw "Remarks must be at least a five character long!!";

  if (!validator.isNumeric(amount.toString()))
    throw "Amount must be a valid number";

  await transactionsModel.create({
    user_id: req.user._id,
    amount,
    remarks,
    transaction_type: "income",
  });

  await usersModel.updateOne(
    {
      _id: req.user._id,
    },
    {
      $inc: {
        balance: amount,
      },
    },
    {
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success",
    message: "Income added successfully",
  });
};

module.exports = addIncome;
