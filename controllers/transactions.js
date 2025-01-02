import Transaction from '../models/Transactions.js';
import mongoose from 'mongoose'; // Import mongoose
/*
@desc Gets all transactions 
@route GET /api/v1/transactions
@access Public (authentication later, for now public)
*/
export const getTransactions = async (req, res, next) => {
    try {
      const transactions = await Transaction.find();
  
      return res.status(200).json({
        success: true,
        count: transactions.length,
        data: transactions,
      });
    } catch (err) {
      console.error(err.stack.red); // Log the full error stack for debugging
      return res.status(500).json({
        success: false,
        error: 'Server Error', // Generic message for user, log details for debugging
      });
    }
  };

/*
@desc Add transactions 
@route POST /api/v1/transactions
@access Public (authentication later, for now public)
*/
export const addTransaction = async (req, res, next) => {
    try {
      const { text, amount } = req.body;
  
      const transaction = await Transaction.create({ text, amount }); // Destructuring for cleaner object creation
  
      return res.status(201).json({
        success: true,
        data: transaction,
      });
    } catch (err) {
      console.error(err.stack.red); // Log the full error stack for debugging
      if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((val) => val.message);
        return res.status(400).json({
          success: false,
          error: messages,
        });
      } else {
        return res.status(500).json({
          success: false,
          error: 'Server Error', // Generic message for user, log details for debugging
        });
      }
    }
  };

/*
@desc Delete transactions 
@route DELETE /api/v1/transactions/:id
@access Public (authentication later, for now public)
*/
export const deleteTransaction = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) { // Validate the ID
            return res.status(400).json({ success: false, error: 'Invalid transaction ID' });
        }

        const transaction = await Transaction.findById(req.params.id);

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