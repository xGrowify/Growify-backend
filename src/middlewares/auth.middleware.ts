import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import { ResponseCode } from "../utils/ApiResponse";
const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const generateToken = (userId: string): string => {
  if (!userId) {
    throw new Error("User ID is required to generate a token");
  }
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "7d" });
};

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new ApiError(401, "Authentication token missing.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    req.userId = decoded.userId;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(
        401,
        "Access token expired. Please refresh your tokens."
      );
    }
    throw new ApiError(401, "Invalid authentication token.");
  }
});
export const handleAuthError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Auth error:", err);
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ message: err.message });
  } else if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    res.status(500).json({ message: ResponseCode.SERVER_ERROR_INTERNAL });
  }
};
