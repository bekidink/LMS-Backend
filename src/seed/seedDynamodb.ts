import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import pluralize from "pluralize";
// import { Transaction, Course, UserCourseProgress } from "../models";
import Transaction from "../models/transactionModel"
import Course from "../models/courseModel"
import UserCourseProgress from "../models/userCourseProgressModel"
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const mongoURI =  process.env.MONGO_URI
  // : "mongodb+srv://bereketdinku:beki1234@cluster0.a7un02o.mongodb.net/lms";

mongoose.set("strictQuery", false);

// MongoDB connection handler
async function connectToMongoDB(): Promise<void> {
  try {
    await mongoose.connect(mongoURI!);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process if connection fails
  }
}

// Create collections for models
async function createCollections(): Promise<void> {
  const models = [Transaction, UserCourseProgress, Course];
  for (const model of models) {
    const collectionName = model.collection.name;
    const exists = await mongoose.connection.db
      ?.listCollections({ name: collectionName })
      .hasNext();

    if (!exists) {
      await model.createCollection();
      console.log(`Collection created: ${collectionName}`);
    } else {
      console.log(`Collection already exists: ${collectionName}`);
    }
  }
}

// Seed data into collection
async function seedData(
  collectionName: string,
  filePath: string
): Promise<void> {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const formattedCollectionName = pluralize.singular(
      collectionName.charAt(0).toUpperCase() + collectionName.slice(1)
    );
    const model = mongoose.models[formattedCollectionName];

    if (!model) {
      throw new Error(
        `Model not found for collection: ${formattedCollectionName}`
      );
    }

    await model.insertMany(data);
    console.log(
      `Successfully seeded data to collection: ${formattedCollectionName}`
    );
  } catch (error) {
    console.error(
      `Unable to seed data to collection: ${collectionName}`,
      error
    );
  }
}

// Delete all collections
async function deleteAllCollections(): Promise<void> {
  try {
    const db = mongoose.connection.db;
    const collections = (await db?.listCollections().toArray()) ?? [];

    if (collections.length === 0) {
      console.log("No collections found to delete.");
      return;
    }

    for (const collection of collections) {
      try {
        await db?.dropCollection(collection.name);
        console.log(`Collection deleted: ${collection.name}`);
      } catch (error) {
        console.error(`Error deleting collection ${collection.name}:`, error);
      }
    }
    console.log("All collections deleted successfully.");
  } catch (error) {
    console.error("Error deleting collections:", error);
  }
}

// Main seeding function
async function seed() {
  await connectToMongoDB();
  await deleteAllCollections();
  await createCollections();

  const seedDataPath = path.join(__dirname, "./data");
  const files = fs
    .readdirSync(seedDataPath)
    .filter((file) => file.endsWith(".json"));

  for (const file of files) {
    const collectionName = path.basename(file, ".json");
    const filePath = path.join(seedDataPath, file);
    await seedData(collectionName, filePath);
  }

  console.log("Seed script completed successfully.");
}

// Execute seed script
if (require.main === module) {
  seed()
    .then(() => mongoose.disconnect())
    .catch((error) => {
      console.error("Failed to run seed script:", error);
      mongoose.disconnect();
    });
}
