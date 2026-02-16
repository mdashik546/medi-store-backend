import serverless from "serverless-http";
import app from "../app.js";
import { prisma } from "../lib/prisma.js";

async function main() {
  await prisma.$connect();
  console.log("Database connected");
}

main().catch((err) => {
  console.error("DB connection error", err);
});

export const handler = serverless(app);
