import express from 'express';

import { getTransactions, addTransaction, deleteTransaction } from '../controllers/transactions.js';

const router = express.Router();

router
   .route('/')
   .get(getTransactions)
   .post(addTransaction);

router
    .route('/:id')
    .delete(deleteTransaction);
export default router;