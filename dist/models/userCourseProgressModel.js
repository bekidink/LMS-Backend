"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCourseProgress = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
// Chapter Progress Schema
const chapterProgressSchema = new Schema({
    chapterId: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
    },
});
// Section Progress Schema
const sectionProgressSchema = new Schema({
    sectionId: {
        type: String,
        required: true,
    },
    chapters: [chapterProgressSchema], // Array of chapter progress
});
// User Course Progress Schema
const userCourseProgressSchema = new Schema({
    userId: {
        type: String,
        required: true,
        index: true, // Similar to hashKey for query optimization
    },
    courseId: {
        type: String,
        required: true,
        unique: true, // Ensures uniqueness, equivalent to rangeKey
    },
    enrollmentDate: {
        type: String,
        required: true,
    },
    overallProgress: {
        type: Number,
        required: true,
    },
    sections: [sectionProgressSchema], // Array of section progress
    lastAccessedTimestamp: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Adds `createdAt` and `updatedAt`
});
// Create and export the UserCourseProgress model
exports.UserCourseProgress = model("UserCourseProgress", userCourseProgressSchema);
exports.default = exports.UserCourseProgress;
