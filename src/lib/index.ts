import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../../src/lib/db/schema"; 
import "dotenv/config";

export const client = new pg.Pool({
  connectionString: process.env.DATABASE_URL!,
  ssl:true,
  max: 50,
  min:2
});

export const db = drizzle(client, { schema  , logger : true});