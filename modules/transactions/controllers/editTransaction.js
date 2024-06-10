
const mongoose = require("mongoose");
const validator = require("validator");

const editTransaction = async (req, res) => {
  const transactionModel = mongoose.model("transactions");
  const usersModel = mongoose.model("users");

  const { transaction_id, remarks, amount, transaction_type } = req.body;

  if (!transaction_id) throw "transaction id is required";

  if (transaction_type !== "income" && transaction_type !== "expense")
    throw "Transaction type must be either income or expense";

  if (!validator.isMongoId(transaction_id.toString()))
    throw "please provide a valid id";

  const getTransaction = await transactionModel.findOne({ _id: transaction_id });

  if (!getTransaction) throw "Transaction not found!!";

  const oldAmount = getTransaction.amount;
  const oldTransactionType = getTransaction.transaction_type;

  if (typeof amount !== 'number' || isNaN(amount)) {
    return res.status(400).json({ status: "failed", error: "Transaction amount is invalid" });
  }

  // Revert the old transaction impact
  if (oldTransactionType === "income") {
    await usersModel.updateOne(
      { _id: getTransaction.user_id },
      { $inc: { balance: oldAmount * -1 } },
      { runValidators: true }
    );
  } else {
    await usersModel.updateOne(
      { _id: getTransaction.user_id },
      { $inc: { balance: oldAmount } },
      { runValidators: true }
    );
  }

  // Update the transaction
  await transactionModel.updateOne(
    { _id: transaction_id },
    { remarks, transaction_type, amount },
    { runValidators: true }
  );

  // Apply the new transaction impact
  if (transaction_type === "income") {
    await usersModel.updateOne(
      { _id: getTransaction.user_id },
      { $inc: { balance: amount } },
      { runValidators: true }
    );
  } else {
    await usersModel.updateOne(
      { _id: getTransaction.user_id },
      { $inc: { balance: amount * -1 } },
      { runValidators: true }
    );
  }

  res.status(200).json({
    status: "success",
    message: "Edited successfully",
  });
};

module.exports = editTransaction;















// const mongoose = require("mongoose");
// const validator = require("validator");
// const editTransaction = async (req, res) => {
//   const transactionModel = mongoose.model("transactions");

//   const { transaction_id, remarks, amount, transaction_type } = req.body;

//   if (!transaction_id) throw "transaction id is required";

//   if (!transaction_type !== "income" && transaction_type !== "expense")
//     throw "Transacion type must be either income or expesne";

//   if (!validator.isMongoId(transaction_id.toString()))
//     throw "please provide a valid id";

//   const getTransaction = await transactionModel.findOne({
//     _id: transaction_id,
//   });

//   if (!getTransaction) throw "Transaction not found!!";

//   await transactionModel.updateOne(
//     {
//       _id: transaction_id,
//     },
//     {
//       remarks,
//       transaction_type,
//       amount,
//     },
//     {
//       runValidators: true,
//     }
//   );

//   res.status(200).json({
//     status: "success",
//     message: "edited successfully",
//   });
// };

// module.exports = editTransaction;
