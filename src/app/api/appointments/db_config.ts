import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./db_handler";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Must be set in .env
});

export const db = drizzle(pool, { schema });
