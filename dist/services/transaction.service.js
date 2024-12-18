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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransactionService = exports.createStripePaymentIntentService = exports.listTransactionsService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const courseModel_1 = __importDefault(require("../models/courseModel"));
const transactionModel_1 = __importDefault(require("../models/transactionModel"));
const userCourseProgressModel_1 = __importDefault(require("../models/userCourseProgressModel"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
// Service to list transactions, optionally filtered by userId
const listTransactionsService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = userId ? { userId } : {};
        return yield transactionModel_1.default.find(query).exec();
    }
    catch (error) {
        throw new Error(`Error retrieving transactions: ${error.message}`);
    }
});
exports.listTransactionsService = listTransactionsService;
// Service to create a Stripe PaymentIntent
const createStripePaymentIntentService = (amount) => __awaiter(void 0, void 0, void 0, function* () {
    if (!amount || amount <= 0) {
        amount = 50; // default value
    }
    try {
        const paymentIntent = yield stripe.paymentIntents.create({
            amount,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: "never",
            },
        });
        return paymentIntent.client_secret;
    }
    catch (error) {
        throw new Error(`Error creating Stripe payment intent: ${error.message}`);
    }
});
exports.createStripePaymentIntentService = createStripePaymentIntentService;
// Service to create a transaction and associated course progress
const createTransactionService = (userId, courseId, transactionId, amount, paymentProvider) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Get course information
        const course = yield courseModel_1.default.findById(courseId);
        if (!course) {
            throw new Error("Course not found");
        }
        // 2. Create transaction record using Mongoose
        const newTransaction = new transactionModel_1.default({
            dateTime: new Date().toISOString(),
            userId,
            courseId,
            transactionId,
            amount,
            paymentProvider,
        });
        yield newTransaction.save();
        // 3. Create initial course progress record
        const initialProgress = new userCourseProgressModel_1.default({
            userId,
            courseId,
            enrollmentDate: new Date().toISOString(),
            overallProgress: 0,
            sections: course.sections.map((section) => ({
                sectionId: section.sectionId,
                chapters: section.chapters.map((chapter) => ({
                    chapterId: chapter.chapterId,
                    completed: false,
                })),
            })),
            lastAccessedTimestamp: new Date().toISOString(),
        });
        yield initialProgress.save();
        // 4. Add the user to the course's enrollments using Mongoose
        course.enrollments.push({ userId });
        yield course.save();
        return { newTransaction, initialProgress };
    }
    catch (error) {
        throw new Error(`Error creating transaction and enrollment: ${error.message}`);
    }
});
exports.createTransactionService = createTransactionService;
