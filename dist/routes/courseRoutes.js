"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_controllers_1 = require("../controllers/course.controllers");
const router = express_1.default.Router();
router.get("/courses", course_controllers_1.listCourses);
router.get("/courses/:courseId", course_controllers_1.getCourse);
exports.default = router;
