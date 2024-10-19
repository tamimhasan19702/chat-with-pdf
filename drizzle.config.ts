/** @format */
import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
import { URL } from "url";

// Load environment variables from .env file
dotenv.config();

// Check if DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

// Parse the DATABASE_URL
const dbUrl = new URL(process.env.DATABASE_URL);
const host = dbUrl.hostname;
const database = dbUrl.pathname.slice(1); // Remove leading '/'
const user = dbUrl.username;
const password = dbUrl.password;
const port = Number(dbUrl.port) || 5432; // Default PostgreSQL port

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/db/schema.ts",
  dbCredentials: {
    host,
    database,
    user,
    password,
    port,
  },
});
