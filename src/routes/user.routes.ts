import { Router } from "express";
import {
  changeusername,
  createUser,
  forgetpassword,
  getCurrentUser,
  login,
  logoutUser,
} from "../controllers/user.controller.js";
import { handleAuthError, verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(createUser);
userRouter.route("/login").post(login);
userRouter.route("/reset-password").post(forgetpassword);
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/me").get(verifyJWT, getCurrentUser);
userRouter.route("/change-username").patch(verifyJWT, changeusername);

userRouter.use(handleAuthError);
export { userRouter };
