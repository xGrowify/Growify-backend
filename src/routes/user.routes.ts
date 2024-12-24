import { Router } from "express";
import {
  createUser,
  getCurrentUser,
  login,
  logoutUser,
} from "../controllers/user.controller";
import { handleAuthError, verifyJWT } from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.route("/register").post(createUser);
userRouter.route("/login").post(login);
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/me").get(verifyJWT, getCurrentUser);

userRouter.use(handleAuthError);
export { userRouter };
