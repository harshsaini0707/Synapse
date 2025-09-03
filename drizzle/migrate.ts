
import { migrate } from "drizzle-orm/node-postgres/migrator";
import "dotenv/config";
import {client, db} from '@/lib/index'


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

