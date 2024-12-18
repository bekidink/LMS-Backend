import { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import * as userCourseService from "../services/useCourseProgress.service";
import { handleErrorResponse } from "../utils/helpers";

// Controller to get enrolled courses for a user
export const getUserEnrolledCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  const auth = getAuth(req);

  if (!auth || auth.userId !== userId) {
    return handleErrorResponse(res, "Access denied", null, 403);
  }

  try {
    const courses = await userCourseService.getCoursesFromProgress(userId);
    res.json({
      message: "Enrolled courses retrieved successfully",
      data: courses,
    });
  } catch (error) {
    handleErrorResponse(res, "Error retrieving enrolled courses", error);
  }
};

// Controller to get the user's progress for a specific course
export const getUserCourseProgress = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, courseId } = req.params;

  try {
    const progress = await userCourseService.getCourseProgress(
      userId,
      courseId
    );
    if (!progress) {
      return handleErrorResponse(
        res,
        "Course progress not found for this user",
        null,
        404
      );
    }
    res.json({
      message: "Course progress retrieved successfully",
      data: progress,
    });
  } catch (error) {
    handleErrorResponse(res, "Error retrieving user course progress", error);
  }
};

// Controller to update the user's course progress
export const updateUserCourseProgress = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, courseId } = req.params;
  const progressData = req.body;

  try {
    const updatedProgress = await userCourseService.updateUserCourseProgress(
      userId,
      courseId,
      progressData
    );
    res.json({
      message: "User course progress updated successfully",
      data: updatedProgress,
    });
  } catch (error) {
    handleErrorResponse(res, "Error updating user course progress", error);
  }
};
