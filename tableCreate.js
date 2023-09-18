const pool = require("./dbIndex");

async function CreateTable() {
  try {
    const client = await pool.connect();

    await client.query(`CREATE TABLE IF NOT EXISTS books (
          book_id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          available BOOLEAN DEFAULT TRUE
      )`);

    await client.query(`CREATE TABLE IF NOT EXISTS clients (
          client_id SERIAL PRIMARY KEY, 
          client_name VARCHAR(255) NOT NULL, 
          email VARCHAR(255) UNIQUE NOT NULL
      )`);

    await client.query(`CREATE TABLE IF NOT EXISTS current_book_loans (
          loan_id SERIAL PRIMARY KEY,
          client_id INT REFERENCES clients(client_id),
          book_id INT REFERENCES books(book_id),
          loan_date DATE NOT NULL,
          due_date DATE NOT NULL
      )`);

    client.release();

    console.log("Tables created successfully.");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

module.exports = CreateTable;
