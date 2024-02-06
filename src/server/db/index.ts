import { Client } from "@planetscale/database";
import { drizzle as planetscaleDrizzle } from "drizzle-orm/planetscale-serverless";
import { drizzle as defaultDrizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

import { env } from "@/env";
import * as schema from "./schema";

// export const db = planetscaleDrizzle(
//   new Client({
//     url: env.DATABASE_URL,
//   }).connection(),
//   { schema },
// );

const connection = await mysql.createConnection({
  host: "localhost",
  user: "tester",
  password: "tester",
  database: "time_me",
});

export const db = defaultDrizzle(connection, { schema, mode: "default" });
