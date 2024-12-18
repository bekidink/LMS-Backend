import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Transaction Schema
const transactionSchema = new Schema(
  {
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
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
  }
);

// Create and export the Transaction model
const Transaction = model("Transaction", transactionSchema);
export default Transaction;
