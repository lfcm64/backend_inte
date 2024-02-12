import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "../schemas/student.schema";
import dotenv from "dotenv";

dotenv.config()

const client = new Client({
  connectionString: process.env.MIGRATION_DATABASE_URL,
});

client.connect();

export const db = drizzle(client);