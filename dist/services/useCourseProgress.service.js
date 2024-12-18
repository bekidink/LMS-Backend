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
exports.updateUserCourseProgress = exports.getCourseProgress = exports.getCoursesFromProgress = void 0;
const userCourseProgressModel_1 = __importDefault(require("../models/userCourseProgressModel"));
const courseModel_1 = __importDefault(require("../models/courseModel"));
const utils_1 = require("../utils/utils");
// Service to get enrolled courses by userId
const getCoursesFromProgress = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Find all UserCourseProgress entries for the given userId
    const enrolledCourses = yield userCourseProgressModel_1.default.find({ userId }).exec();
    const courseIds = enrolledCourses.map((item) => item.courseId);
    // Find courses based on the collected course IDs
    return yield courseModel_1.default.find({ _id: { $in: courseIds } }).exec();
});
exports.getCoursesFromProgress = getCoursesFromProgress;
// Service to get the user's progress for a specific course
const getCourseProgress = (userId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userCourseProgressModel_1.default.findOne({ userId, courseId }).exec();
});
exports.getCourseProgress = getCourseProgress;
// Service to update or create user course progress
const updateUserCourseProgress = (userId, courseId, progressData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let progress = yield userCourseProgressModel_1.default.findOne({ userId, courseId });
        if (!progress) {
            // If no progress exists, create initial progress
            progress = new userCourseProgressModel_1.default({
                userId,
                courseId,
                enrollmentDate: new Date().toISOString(),
                overallProgress: 0,
                sections: progressData.sections || [],
                lastAccessedTimestamp: new Date().toISOString(),
            });
        }
        else {
            // Merge existing progress with new progress data
            //   progress.sections = mergeSections(
            //     progress.sections,
            //     progressData.sections || []
            //   );
            progress.lastAccessedTimestamp = new Date().toISOString();
            progress.overallProgress = (0, utils_1.calculateOverallProgress)(progress.sections);
        }
        // Save the progress to the database
        yield progress.save();
        return progress;
    }
    catch (error) {
        throw new Error("Error updating user course progress: " + error.message);
    }
});
exports.updateUserCourseProgress = updateUserCourseProgress;
