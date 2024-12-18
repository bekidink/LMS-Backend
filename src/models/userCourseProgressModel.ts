import mongoose from "mongoose";

const { Schema, model } = mongoose;

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
const userCourseProgressSchema = new Schema(
  {
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
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt`
  }
);

// Create and export the UserCourseProgress model
export const UserCourseProgress = model(
  "UserCourseProgress",
  userCourseProgressSchema
);
export interface ChapterProgress extends Document {
  chapterId: string;
  completed: boolean;
}
export interface SectionProgress extends Document {
  sectionId: string;
  chapters: { chapterId: string; completed: boolean }[];
}
export default UserCourseProgress;
