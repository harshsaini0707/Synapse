import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";
import * as schema from "../src/lib/db/schema"; 
import "dotenv/config";

const client = new pg.Pool({
  connectionString: process.env.DATABASE_URL!,
  max: 50,
  min:2
});

const db = drizzle(client, { schema  , logger : true});

async function runMigrations() {
  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migrations applied successfully to Neon!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await client.end();
  }
}

runMigrations();

