import Course from "../models/courseModel";

// Service to list courses with optional category filter
export const listCoursesService = async (category?: string) => {
  try {
    if (category && category !== "all") {
      // Filter courses by category if provided
      return await Course.find({ category });
    } else {
      // Retrieve all courses if no category filter is provided
      return await Course.find();
    }
  } catch (error:any) {
    throw new Error(`Error retrieving courses: ${error.message}`);
  }
};

// Service to get a course by its ID
export const getCourseService = async (courseId: string) => {
  try {
    const course = await Course.findOne({courseId});
    if (!course) {
      throw new Error("Course not found");
    }
    return course;
  } catch (error:any) {
    throw new Error(`Error retrieving course: ${error.message}`);
  }
};
