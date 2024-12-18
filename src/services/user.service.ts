import { clerkClient } from "../index";

// Service to update the user metadata
export const updateUserMetadata = async (userId: string, userData: any) => {
  try {
    // Update user metadata using Clerk's updateUserMetadata method
    const updatedUser = await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        userType: userData.publicMetadata.userType,
        settings: userData.publicMetadata.settings,
      },
    });

    return updatedUser;
  } catch (error:any) {
    throw new Error("Error updating user metadata: " + error.message);
  }
};
