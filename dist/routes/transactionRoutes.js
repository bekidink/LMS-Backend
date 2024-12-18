"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_controller_1 = require("../controllers/transaction.controller");
const router = express_1.default.Router();
router.get("/transactions", transaction_controller_1.listTransactions);
router.post("/transactions", transaction_controller_1.createTransaction);
router.post("/transactions/stripe/payment-intent", transaction_controller_1.createStripePaymentIntent);
exports.default = router;
