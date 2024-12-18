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
exports.getCourseService = exports.listCoursesService = void 0;
const courseModel_1 = __importDefault(require("../models/courseModel"));
// Service to list courses with optional category filter
const listCoursesService = (category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (category && category !== "all") {
            // Filter courses by category if provided
            return yield courseModel_1.default.find({ category });
        }
        else {
            // Retrieve all courses if no category filter is provided
            return yield courseModel_1.default.find();
        }
    }
    catch (error) {
        throw new Error(`Error retrieving courses: ${error.message}`);
    }
});
exports.listCoursesService = listCoursesService;
// Service to get a course by its ID
const getCourseService = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield courseModel_1.default.findOne({ courseId });
        if (!course) {
            throw new Error("Course not found");
        }
        return course;
    }
    catch (error) {
        throw new Error(`Error retrieving course: ${error.message}`);
    }
});
exports.getCourseService = getCourseService;
