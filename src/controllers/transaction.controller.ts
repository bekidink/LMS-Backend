import { Response, Request } from "express";
import {
  listTransactionsService,
  createStripePaymentIntentService,
  createTransactionService,
} from "../services/transaction.service";

// Controller for listing transactions
export const listTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.query;

  try {
    const transactions = await listTransactionsService(userId as string);
    res.json({
      message: "Transactions retrieved successfully",
      data: transactions,
    });
  } catch (error:any) {
    console.error("Error retrieving transactions:", error);
    res.status(500).json({ message: error.message });
  }
};

// Controller for creating a Stripe payment intent
export const createStripePaymentIntent = async (
  req: Request,
  res: Response
): Promise<void> => {
  let { amount } = req.body;

  try {
    const clientSecret = await createStripePaymentIntentService(amount);
    res.json({
      message: "Payment intent created successfully",
      data: { clientSecret },
    });
  } catch (error:any) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ message: error.message });
  }
};

// Controller for creating a transaction and course enrollment
export const createTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, courseId, transactionId, amount, paymentProvider } = req.body;

  try {
    const { newTransaction, initialProgress } = await createTransactionService(
      userId,
      courseId,
      transactionId,
      amount,
      paymentProvider
    );

    res.json({
      message: "Purchased Course successfully",
      data: {
        transaction: newTransaction,
        courseProgress: initialProgress,
      },
    });
  } catch (error:any) {
    console.error("Error creating transaction and enrollment:", error);
    res.status(500).json({ message: error.message });
  }
};
