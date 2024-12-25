import { Router } from "express";
import { helthcheck } from "../controllers/helthcheck.controller.js";

const heltcheckRouter = Router();

heltcheckRouter.route("/helth").get(helthcheck);

export { heltcheckRouter };
