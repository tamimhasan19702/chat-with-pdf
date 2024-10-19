/** @format */
import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Check if DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/db/schema.ts",
  url: process.env.DATABASE_URL,
});
