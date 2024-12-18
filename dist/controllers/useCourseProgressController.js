"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserCourseProgress = exports.getUserCourseProgress = exports.getUserEnrolledCourses = void 0;
const express_1 = require("@clerk/express");
const userCourseService = __importStar(require("../services/useCourseProgress.service"));
const helpers_1 = require("../utils/helpers");
// Controller to get enrolled courses for a user
const getUserEnrolledCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const auth = (0, express_1.getAuth)(req);
    if (!auth || auth.userId !== userId) {
        return (0, helpers_1.handleErrorResponse)(res, "Access denied", null, 403);
    }
    try {
        const courses = yield userCourseService.getCoursesFromProgress(userId);
        res.json({
            message: "Enrolled courses retrieved successfully",
            data: courses,
        });
    }
    catch (error) {
        (0, helpers_1.handleErrorResponse)(res, "Error retrieving enrolled courses", error);
    }
});
exports.getUserEnrolledCourses = getUserEnrolledCourses;
// Controller to get the user's progress for a specific course
const getUserCourseProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, courseId } = req.params;
    try {
        const progress = yield userCourseService.getCourseProgress(userId, courseId);
        if (!progress) {
            return (0, helpers_1.handleErrorResponse)(res, "Course progress not found for this user", null, 404);
        }
        res.json({
            message: "Course progress retrieved successfully",
            data: progress,
        });
    }
    catch (error) {
        (0, helpers_1.handleErrorResponse)(res, "Error retrieving user course progress", error);
    }
});
exports.getUserCourseProgress = getUserCourseProgress;
// Controller to update the user's course progress
const updateUserCourseProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, courseId } = req.params;
    const progressData = req.body;
    try {
        const updatedProgress = yield userCourseService.updateUserCourseProgress(userId, courseId, progressData);
        res.json({
            message: "User course progress updated successfully",
            data: updatedProgress,
        });
    }
    catch (error) {
        (0, helpers_1.handleErrorResponse)(res, "Error updating user course progress", error);
    }
});
exports.updateUserCourseProgress = updateUserCourseProgress;
