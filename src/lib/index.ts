import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../../src/lib/db/schema"; 
import "dotenv/config";

export const client = new pg.Pool({
  connectionString: process.env.DATABASE_URL!,
  ssl: true,
  max: 10, // Reduced for serverless (Vercel)
  min: 0, // Allow 0 connections when idle
  idleTimeoutMillis: 30000, // Close idle connections after 30s
  connectionTimeoutMillis: 10000, // 10s timeout for new connections
});

// Handle pool errors
client.on('error', (err) => {
  console.error('Unexpected database pool error:', err);
});

export const db = drizzle(client, { schema, logger: true });