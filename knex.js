// server/src/knex.js
import knex from "knex";
import config from "./knexfile.js";
export const db = knex(config);

// Quick test right away
db.raw("select 1")
  .then(() => console.log("✅ PostgreSQL connection OK"))
  .catch((err) => {
    console.error("❌ Error connecting to PostgreSQL:", err.message);
    process.exit(1); // exit if connection fails
  });
