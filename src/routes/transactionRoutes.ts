import express from "express";
import {
  createStripePaymentIntent,
  createTransaction,
  listTransactions,
} from "../controllers/transaction.controller";

const router = express.Router();

router.get("/transactions", listTransactions);
router.post("/transactions", createTransaction);
router.post("/transactions/stripe/payment-intent", createStripePaymentIntent);

export default router;
