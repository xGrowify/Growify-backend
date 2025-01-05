import express from "express";
import type { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import Apolloserver from "./lib/apolloserver.js";
import { expressMiddleware } from "@apollo/server/express4";
import { userRouter } from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import { heltcheckRouter } from "./routes/helthcheck.routes.js";
import { pitchRoute } from "./routes/pitchProject.routes.js";

dotenv.config({ path: "./.env" });
const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = process.env.PORT || 3000;

const app: Application = express();

// Update CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000", // Replace with your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", userRouter);
app.use("/api/", heltcheckRouter);
app.use("/api/pitch", pitchRoute);

const startApolloServer = async () => {
  await Apolloserver.start();
  app.use("/graphql", expressMiddleware(Apolloserver));
};

startApolloServer().then(() => {
  app.listen(port, () =>
    console.log(`Server is working on Port: ${port} in ${envMode} Mode.`)
  );
});

