import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
  PORT: string;
  FRONTEND_PUBLIC_URL: string;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  APP_USER: string;
  APP_PASS: string;
  DATABASE_URL: string;
}

const loadEnvVariable = (): EnvConfig => {
  const requiredEnvVars = [
    "PORT",
    "FRONTEND_PUBLIC_URL",
    "BETTER_AUTH_SECRET",
    "BETTER_AUTH_URL",
    "APP_USER",
    "APP_PASS",
    "DATABASE_URL",
  ];

  for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
      throw new Error(
        `Environment variable ${varName} is required but not defined.`,
      );
    }
  }

  return {
    PORT: process.env.PORT as string,
    FRONTEND_PUBLIC_URL: process.env.FRONTEND_PUBLIC_URL as string,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET as string,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL as string,
    APP_USER: process.env.APP_USER as string,
    APP_PASS: process.env.APP_PASS as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
  };
};
export const envVars = loadEnvVariable();
