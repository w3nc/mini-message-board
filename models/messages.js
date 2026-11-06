// Message store backed by the Postgres database.
// Every request reads from the Database, so messages survive restarts
// and every visitor sees the same board.
const { pool } = require("../db");

// Every message, oldest first (the order they were sent).
async function getAllMessages() {
  const result = await pool.query(
    "SELECT id, user_name AS user, text, added FROM messages ORDER BY added ASC, id ASC"
  );
  return result.rows;
}

async function getMessagesByUser(userName) {
  const result = await pool.query(
    "SELECT id, user_name AS user, text, added FROM messages WHERE user_name = $1 ORDER BY added ASC, id ASC",
    [userName]
  );
  return result.rows;
}

// One message by its id, or null when it does not exist.
async function getMessageById(id) {
  if (!Number.isInteger(id)) return null;
  const result = await pool.query(
    "SELECT id, user_name AS user, text, added FROM messages WHERE id = $1",
    [id]
  );
  return result.rows[0] || null;
}

// Save a new message and give back the saved row.
async function addMessage(user, text) {
  const result = await pool.query(
    "INSERT INTO messages (user_name, text) VALUES ($1, $2) RETURNING id, user_name AS user, text, added",
    [user, text]
  );
  return result.rows[0];
}

module.exports = {
  getAllMessages,
  getMessagesByUser,
  getMessageById,
  addMessage
};
