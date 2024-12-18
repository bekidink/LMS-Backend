import express from "express"
import { getCourse, listCourses } from "../controllers/course.controllers"
const router=express.Router()
router.get("/courses", listCourses);
router.get("/courses/:courseId", getCourse);
export default router