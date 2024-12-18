import { Response, Request } from "express";
import {
  listCoursesService,
  getCourseService,
} from "../services/course.service";

// Controller for listing courses
export const listCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { category } = req.query;

  try {
    const courses = await listCoursesService(category as string); // Call service to fetch courses
    res.json({ message: "Courses retrieved successfully", data: courses });
  } catch (error:any) {
    console.error("Error retrieving courses:", error);
    res.status(500).json({ message: error.message });
  }
};

// Controller for getting a single course by ID
export const getCourse = async (req: Request, res: Response): Promise<void> => {
  const { courseId } = req.params;

  try {
    const course = await getCourseService(courseId); // Call service to fetch a single course
    res.json({ message: "Course retrieved successfully", data: course });
  } catch (error:any) {
    console.error("Error retrieving course:", error);
    res.status(500).json({ message: error.message });
  }
};
