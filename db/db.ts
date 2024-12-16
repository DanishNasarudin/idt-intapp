import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

// const connection = await mysql.createPool({
//   uri: process.env.DATABASE_URL!,
// });

// const db = drizzle({ client: connection, schema, mode: "default" });

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle({ client: sql });

export default db;
