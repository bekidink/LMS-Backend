import UserCourseProgress from "../models/userCourseProgressModel";
import Course from "../models/courseModel";
import { calculateOverallProgress, mergeSections } from "../utils/utils";

// Service to get enrolled courses by userId
export const getCoursesFromProgress = async (userId: string) => {
  // Find all UserCourseProgress entries for the given userId
  const enrolledCourses = await UserCourseProgress.find({ userId }).exec();
  const courseIds = enrolledCourses.map((item: any) => item.courseId);

  // Find courses based on the collected course IDs
  return await Course.find({ _id: { $in: courseIds } }).exec();
};

// Service to get the user's progress for a specific course
export const getCourseProgress = async (userId: string, courseId: string) => {
  return await UserCourseProgress.findOne({ userId, courseId }).exec();
};

// Service to update or create user course progress
export const updateUserCourseProgress = async (
  userId: string,
  courseId: string,
  progressData: any
) => {
  try {
    let progress = await UserCourseProgress.findOne({ userId, courseId });

    if (!progress) {
      // If no progress exists, create initial progress
      progress = new UserCourseProgress({
        userId,
        courseId,
        enrollmentDate: new Date().toISOString(),
        overallProgress: 0,
        sections: progressData.sections || [],
        lastAccessedTimestamp: new Date().toISOString(),
      });
    } else {
      // Merge existing progress with new progress data
    //   progress.sections = mergeSections(
    //     progress.sections,
    //     progressData.sections || []
    //   );
      progress.lastAccessedTimestamp = new Date().toISOString();
      progress.overallProgress = calculateOverallProgress(progress.sections);
    }

    // Save the progress to the database
    await progress.save();
    return progress;
  } catch (error:any) {
    throw new Error("Error updating user course progress: " + error.message);
  }
};
