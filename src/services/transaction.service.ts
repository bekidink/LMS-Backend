import Stripe from "stripe";
import Course from "../models/courseModel";
import Transaction from "../models/transactionModel";
import UserCourseProgress from "../models/userCourseProgressModel";
import dotenv from "dotenv";

dotenv.config();



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Service to list transactions, optionally filtered by userId
export const listTransactionsService = async (userId?: string) => {
  try {
    const query = userId ? { userId } : {};
    return await Transaction.find(query).exec();
  } catch (error:any) {
    throw new Error(`Error retrieving transactions: ${error.message}`);
  }
};

// Service to create a Stripe PaymentIntent
export const createStripePaymentIntentService = async (amount: number) => {
  if (!amount || amount <= 0) {
    amount = 50; // default value
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    return paymentIntent.client_secret;
  } catch (error:any) {
    throw new Error(`Error creating Stripe payment intent: ${error.message}`);
  }
};

// Service to create a transaction and associated course progress
export const createTransactionService = async (
  userId: string,
  courseId: string,
  transactionId: string,
  amount: number,
  paymentProvider: string
) => {
  try {
    // 1. Get course information
    const course = await Course.findById(courseId);

    if (!course) {
      throw new Error("Course not found");
    }

    // 2. Create transaction record using Mongoose
    const newTransaction = new Transaction({
      dateTime: new Date().toISOString(),
      userId,
      courseId,
      transactionId,
      amount,
      paymentProvider,
    });
    await newTransaction.save();

    // 3. Create initial course progress record
    const initialProgress = new UserCourseProgress({
      userId,
      courseId,
      enrollmentDate: new Date().toISOString(),
      overallProgress: 0,
      sections: course.sections.map((section: any) => ({
        sectionId: section.sectionId,
        chapters: section.chapters.map((chapter: any) => ({
          chapterId: chapter.chapterId,
          completed: false,
        })),
      })),
      lastAccessedTimestamp: new Date().toISOString(),
    });
    await initialProgress.save();

    // 4. Add the user to the course's enrollments using Mongoose
    course.enrollments.push({ userId });
    await course.save();

    return { newTransaction, initialProgress };
  } catch (error:any) {
    throw new Error(
      `Error creating transaction and enrollment: ${error.message}`
    );
  }
};
