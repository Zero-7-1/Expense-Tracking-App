import express from 'express';
import { getTransactions, addTransaction, deleteTransaction } from '../controllers/transactions.js';
import { verifyToken } from '../auth.js';

const router = express.Router();

router.use(verifyToken);

router.route('/')
  .get(getTransactions)
  .post(addTransaction);

router.route('/:id')
  .delete(deleteTransaction);

export default router;