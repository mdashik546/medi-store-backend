import app from "./app.js";
import { prisma } from "./lib/prisma.js";
import { envVars } from "./config/env.js";

async function main() {
  try {
    await prisma.$connect();
    console.log(`database connection`);
    app.listen(envVars.PORT, () => {
      console.log(`server is running ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
