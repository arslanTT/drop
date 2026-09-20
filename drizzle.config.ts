import * as dotenv from "dotenv";

// Local dev: load .env.local. Vercel: env vars are already injected.
dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    table: "__drizzle_migration",
    schema: "public",
  },
  verbose: true,
  strict: true,
});
