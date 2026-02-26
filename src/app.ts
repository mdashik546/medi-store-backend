import { auth } from "./lib/auth.js";
import express, { type Application, type Response } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { notFound } from "./middleware/not-found.js";
import { envVars } from "./config/env.js";
import { indexRoutes } from "./routes/index.js";

const app: Application = express();
app.use(express.json());

app.use(
  cors({
    origin: [envVars.FRONTEND_PUBLIC_URL, "http://localhost:3000"],
    credentials: true,
  }),
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api", indexRoutes);
app.use(notFound);

export default app;
