"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const useCourseProgressController_1 = require("../controllers/useCourseProgressController");
const router = express_1.default.Router();
router.get("/:userId/enrolled-courses", useCourseProgressController_1.getUserEnrolledCourses);
router.get("/:userId/courses/:courseId", useCourseProgressController_1.getUserCourseProgress);
router.put("/:userId/courses/:courseId", useCourseProgressController_1.updateUserCourseProgress);
exports.default = router;
