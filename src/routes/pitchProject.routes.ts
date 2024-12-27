import { Router } from "express";
import { createPitchProject } from "../controllers/pitchProject.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { handleAuthError, verifyJWT } from "../middlewares/auth.middleware.js";

const pitchRoute = Router();

pitchRoute
  .route("/create")
  .post(verifyJWT,upload.array("images", 5), createPitchProject);
  pitchRoute.use(handleAuthError);

export { pitchRoute };
