"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
// Transaction Schema
const transactionSchema = new Schema({
    userId: {
        type: String,
        required: true,
        index: true, // Mongoose uses `index` for optimized queries
    },
    transactionId: {
        type: String,
        required: true,
        unique: true, // Equivalent to `rangeKey` for uniqueness
    },
    dateTime: {
        type: String,
        required: true,
    },
    courseId: {
        type: String,
        required: true,
        index: true, // Global index in DynamoDB translates to `index` for queries in Mongoose
    },
    paymentProvider: {
        type: String,
        enum: ["stripe"],
        required: true,
    },
    amount: {
        type: Number,
    },
}, {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
});
// Create and export the Transaction model
const Transaction = model("Transaction", transactionSchema);
exports.default = Transaction;
