"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
// Comment Schema
const commentSchema = new Schema({
    commentId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    timestamp: {
        type: String,
        required: true,
    },
});
// Chapter Schema
const chapterSchema = new Schema({
    chapterId: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["Text", "Quiz", "Video"],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    comments: [commentSchema],
    video: {
        type: String,
    },
});
// Section Schema
const sectionSchema = new Schema({
    sectionId: {
        type: String,
        required: true,
    },
    sectionTitle: {
        type: String,
        required: true,
    },
    sectionDescription: {
        type: String,
    },
    chapters: [chapterSchema],
});
// Enrollment Schema
const enrollmentSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
});
// Course Schema
const courseSchema = new Schema({
    courseId: {
        type: String,
        required: true,
        unique: true,
    },
    teacherId: {
        type: String,
        required: true,
    },
    teacherName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
    },
    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        required: true,
    },
    status: {
        type: String,
        enum: ["Draft", "Published"],
        required: true,
    },
    sections: [sectionSchema],
    enrollments: [enrollmentSchema],
}, {
    timestamps: true,
});
// Create and export the Course model
const Course = model("Course", courseSchema);
exports.default = Course;
