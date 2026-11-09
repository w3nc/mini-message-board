#! /usr/bin/env node

const { Client } = require("pg");
const path = require("node:path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

// The table plus two starter messages.
const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR ( 255 ) NOT NULL,
  text TEXT NOT NULL,
  added TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO messages (user_name, text)
VALUES
  ('Amando', 'Hi there!'),
  ('Charles', 'Hello World!');
`;

async function main() {
  // Pass the address on the command line, or leave it out and use .env.
  const connectionString = process.argv[2] || process.env.DATABASE_URL;

  if (!connectionString) {
    console.error("Missing database url.");
    console.error("Usage: node db/populatedb.js <database-url>");
    process.exit(1);
  }

  console.log("seeding...");

  const client = new Client({
    connectionString,
    ssl: connectionString.startsWith("postgresql://localhost") ||
      connectionString.includes("@localhost") ||
      connectionString.includes("127.0.0.1")
      ? false
      : { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("done");
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();
