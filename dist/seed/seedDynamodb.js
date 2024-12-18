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
const mongoose_1 = __importDefault(require("mongoose"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const pluralize_1 = __importDefault(require("pluralize"));
// import { Transaction, Course, UserCourseProgress } from "../models";
const transactionModel_1 = __importDefault(require("../models/transactionModel"));
const courseModel_1 = __importDefault(require("../models/courseModel"));
const userCourseProgressModel_1 = __importDefault(require("../models/userCourseProgressModel"));
dotenv_1.default.config();
const isProduction = process.env.NODE_ENV === "production";
const mongoURI = process.env.MONGO_URI;
// : "mongodb+srv://bereketdinku:beki1234@cluster0.a7un02o.mongodb.net/lms";
mongoose_1.default.set("strictQuery", false);
// MongoDB connection handler
function connectToMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(mongoURI);
            console.log("Connected to MongoDB");
        }
        catch (error) {
            console.error("Error connecting to MongoDB:", error);
            process.exit(1); // Exit process if connection fails
        }
    });
}
// Create collections for models
function createCollections() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const models = [transactionModel_1.default, userCourseProgressModel_1.default, courseModel_1.default];
        for (const model of models) {
            const collectionName = model.collection.name;
            const exists = yield ((_a = mongoose_1.default.connection.db) === null || _a === void 0 ? void 0 : _a.listCollections({ name: collectionName }).hasNext());
            if (!exists) {
                yield model.createCollection();
                console.log(`Collection created: ${collectionName}`);
            }
            else {
                console.log(`Collection already exists: ${collectionName}`);
            }
        }
    });
}
// Seed data into collection
function seedData(collectionName, filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = JSON.parse(fs_1.default.readFileSync(filePath, "utf8"));
            const formattedCollectionName = pluralize_1.default.singular(collectionName.charAt(0).toUpperCase() + collectionName.slice(1));
            const model = mongoose_1.default.models[formattedCollectionName];
            if (!model) {
                throw new Error(`Model not found for collection: ${formattedCollectionName}`);
            }
            yield model.insertMany(data);
            console.log(`Successfully seeded data to collection: ${formattedCollectionName}`);
        }
        catch (error) {
            console.error(`Unable to seed data to collection: ${collectionName}`, error);
        }
    });
}
// Delete all collections
function deleteAllCollections() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const db = mongoose_1.default.connection.db;
            const collections = (_a = (yield (db === null || db === void 0 ? void 0 : db.listCollections().toArray()))) !== null && _a !== void 0 ? _a : [];
            if (collections.length === 0) {
                console.log("No collections found to delete.");
                return;
            }
            for (const collection of collections) {
                try {
                    yield (db === null || db === void 0 ? void 0 : db.dropCollection(collection.name));
                    console.log(`Collection deleted: ${collection.name}`);
                }
                catch (error) {
                    console.error(`Error deleting collection ${collection.name}:`, error);
                }
            }
            console.log("All collections deleted successfully.");
        }
        catch (error) {
            console.error("Error deleting collections:", error);
        }
    });
}
// Main seeding function
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        yield connectToMongoDB();
        yield deleteAllCollections();
        yield createCollections();
        const seedDataPath = path_1.default.join(__dirname, "./data");
        const files = fs_1.default
            .readdirSync(seedDataPath)
            .filter((file) => file.endsWith(".json"));
        for (const file of files) {
            const collectionName = path_1.default.basename(file, ".json");
            const filePath = path_1.default.join(seedDataPath, file);
            yield seedData(collectionName, filePath);
        }
        console.log("Seed script completed successfully.");
    });
}
// Execute seed script
if (require.main === module) {
    seed()
        .then(() => mongoose_1.default.disconnect())
        .catch((error) => {
        console.error("Failed to run seed script:", error);
        mongoose_1.default.disconnect();
    });
}
