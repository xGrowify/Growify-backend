import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import Apolloserver from "./lib/apolloserver";
import { expressMiddleware } from "@apollo/server/express4";

dotenv.config({ path: "./.env" });
export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = process.env.PORT || 3000;

// route imports
import { userRouter } from "./routes/user.routes";
import cookieParser from "cookie-parser";
// route decleration
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: " * ", credentials: true }));
app.use("/api/auth", userRouter);
app.use(cookieParser());

const startApolloServer = async () => {
  await Apolloserver.start();
  app.use("/graphql", expressMiddleware(Apolloserver));
};

startApolloServer();

app.listen(port, () =>
  console.log("Server is working on Port:" + port + " in " + envMode + " Mode.")
);


// hello from the other side