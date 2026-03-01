import { Pool } from "pg";

export const pgPool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});
