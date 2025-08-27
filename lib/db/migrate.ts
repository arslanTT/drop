import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error("Database URL is not set in .env.local file");
}

async function runMigrate() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql);
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("All migrations are successfully done!");
  } catch (error) {
    console.log("All migrations are not  done!");
    console.log(error);
    process.exit(1);
  }
}

runMigrate();
