import Transaction from '../models/Transactions.js';
import mongoose from 'mongoose';

/*
@desc Gets all transactions for a user
@route GET /api/v1/transactions
@access Private
*/
export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.uid });

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    console.error(err.stack.red);
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

/*
@desc Add transaction for a user
@route POST /api/v1/transactions
@access Private
*/
export const addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;
    const userId = req.user.uid;

    const transaction = await Transaction.create({ text, amount, userId });

    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    console.error(err.stack.red);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
};

/*
@desc Delete transaction for a user
@route DELETE /api/v1/transactions/:id
@access Private
*/
export const deleteTransaction = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, error: 'Invalid transaction ID' });
    }

    const transaction = await Transaction.findOne({ _id: req.params.id, userId: req.user.uid });

    if (!transaction) {
      return res.status(404).json({ success: false, error: 'No transaction found' });
    }

    await transaction.deleteOne();

    return res.status(200).json({ success: true, data: {} });
  } catch (err) {
    console.error(err.stack.red);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};