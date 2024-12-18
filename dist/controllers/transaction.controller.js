"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = exports.createStripePaymentIntent = exports.listTransactions = void 0;
const transaction_service_1 = require("../services/transaction.service");
// Controller for listing transactions
const listTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    try {
        const transactions = yield (0, transaction_service_1.listTransactionsService)(userId);
        res.json({
            message: "Transactions retrieved successfully",
            data: transactions,
        });
    }
    catch (error) {
        console.error("Error retrieving transactions:", error);
        res.status(500).json({ message: error.message });
    }
});
exports.listTransactions = listTransactions;
// Controller for creating a Stripe payment intent
const createStripePaymentIntent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { amount } = req.body;
    try {
        const clientSecret = yield (0, transaction_service_1.createStripePaymentIntentService)(amount);
        res.json({
            message: "Payment intent created successfully",
            data: { clientSecret },
        });
    }
    catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ message: error.message });
    }
});
exports.createStripePaymentIntent = createStripePaymentIntent;
// Controller for creating a transaction and course enrollment
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, courseId, transactionId, amount, paymentProvider } = req.body;
    try {
        const { newTransaction, initialProgress } = yield (0, transaction_service_1.createTransactionService)(userId, courseId, transactionId, amount, paymentProvider);
        res.json({
            message: "Purchased Course successfully",
            data: {
                transaction: newTransaction,
                courseProgress: initialProgress,
            },
        });
    }
    catch (error) {
        console.error("Error creating transaction and enrollment:", error);
        res.status(500).json({ message: error.message });
    }
});
exports.createTransaction = createTransaction;
