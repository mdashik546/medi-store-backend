import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
export const prisma = global.prisma ||
    new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production")
    global.prisma = prisma;
