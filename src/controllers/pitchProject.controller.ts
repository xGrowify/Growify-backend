import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse, ResponseCode } from "../utils/ApiResponse.js";
import { uploadoncloudinary } from "../utils/cloudinary.js";
import fs from "fs/promises"; // Use promises-based fs for better handling

const prisma = new PrismaClient();

const createPitchProject = asyncHandler(async (req, res) => {
  const { projectTitle, projectDescription, projectUrl } = req.body;
  const projectImages = req.files as Express.Multer.File[];
  const userId = req.userId;

  if (!userId) {
    throw new ApiError(
      ResponseCode.CLIENT_ERROR_UNAUTHORIZED,
      "User not authenticated"
    );
  }

  if (!projectTitle || !projectDescription || !projectUrl) {
    throw new ApiError(
      ResponseCode.CLIENT_ERROR_BAD_REQUEST,
      "Please fill all fields"
    );
  }

  if (!projectImages || projectImages.length === 0) {
    throw new ApiError(
      ResponseCode.CLIENT_ERROR_BAD_REQUEST,
      "Please upload at least one file"
    );
  }

  try {
    const uploadedFiles: string[] = [];

    for (const file of projectImages) {
      const localFilePath = file.path;
      const uploadResponse = await uploadoncloudinary(localFilePath);

      // Cleanup local file
      await fs.unlink(localFilePath);

      if (uploadResponse) {
        uploadedFiles.push(uploadResponse.secure_url);
      } else {
        throw new ApiError(
          ResponseCode.CLIENT_ERROR_BAD_REQUEST,
          "Error uploading file"
        );
      }
    }

    const newProject = await prisma.pitchProject.create({
      data: {
        projectTitle,
        projectDescription,
        projectUrl,
        projectImages: uploadedFiles, 
        authorId: userId,
      },
    });

    return res
      .status(ResponseCode.SUCCESS_OK)
      .json(
        new ApiResponse(
          ResponseCode.SUCCESS_OK,
          newProject,
          "Project created successfully"
        )
      );
  } catch (error) {
    console.error("Error creating project:", error);
    throw new ApiError(
      ResponseCode.SERVER_ERROR_INTERNAL,
      "Error creating project"
    );
  }
});

export { createPitchProject };
