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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourse = exports.listCourses = void 0;
const course_service_1 = require("../services/course.service");
// Controller for listing courses
const listCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.query;
    try {
        const courses = yield (0, course_service_1.listCoursesService)(category); // Call service to fetch courses
        res.json({ message: "Courses retrieved successfully", data: courses });
    }
    catch (error) {
        console.error("Error retrieving courses:", error);
        res.status(500).json({ message: error.message });
    }
});
exports.listCourses = listCourses;
// Controller for getting a single course by ID
const getCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    try {
        const course = yield (0, course_service_1.getCourseService)(courseId); // Call service to fetch a single course
        res.json({ message: "Course retrieved successfully", data: course });
    }
    catch (error) {
        console.error("Error retrieving course:", error);
        res.status(500).json({ message: error.message });
    }
});
exports.getCourse = getCourse;
