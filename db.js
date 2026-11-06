// One shared database connection pool for the whole app.
require("dotenv").config();

const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn(
    "DATABASE_URL is not set. Fill it in the .env file so messages can be saved."
  );
}

const pool = new Pool({
  connectionString: connectionString,
  // Supabase and most online Postgres hosts need SSL.
  ssl: connectionString ? { rejectUnauthorized: false } : false
});

// Make the table ready on startup, and add the two starter notes once.
async function setupDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      user_name TEXT NOT NULL,
      text TEXT NOT NULL,
      added TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  const count = await pool.query("SELECT COUNT(*)::int AS total FROM messages");
  if (count.rows[0].total === 0) {
    await pool.query(
      `INSERT INTO messages (user_name, text) VALUES
        ('Amando', 'Hi there!'),
        ('Charles', 'Hello World!')`
    );
  }
}

module.exports = { pool, setupDatabase };
