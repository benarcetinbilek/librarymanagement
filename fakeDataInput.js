const pool = require("./dbIndex");

const booksData = [
  ["The Great Gatsby", true],
  ["To Kill a Mockingbird", true],
  ["1984", true],
  ["Pride and Prejudice", true],
  ["The Catcher in the Rye", true],
  ["The Hobbit", false],
  ["Brave New World", false],
  ["The Lord of the Rings", false],
  ["Moby-Dick", false],
  ["War and Peace", true],
];

const clientsData = [
  ["John Smith", "john.smith@example.com"],
  ["Jane Doe", "jane.doe@example.com"],
  ["Alice Johnson", "alice.johnson@example.com"],
  ["Bob Wilson", "bob.wilson@example.com"],
  ["Eva Brown", "eva.brown@example.com"],
];

const loansData = [
  [1, 6, "2023-09-18", "2023-10-02"],
  [2, 7, "2023-09-18", "2023-10-02"],
  [3, 8, "2023-09-18", "2023-10-02"],
  [4, 9, "2023-09-18", "2023-10-02"],
];

async function insertData() {
  try {
    const client = await pool.connect();

    for (const book of booksData) {
      await client.query(
        "INSERT INTO books (title, available) VALUES ($1, $2)",
        [book[0], book[1]]
      );
    }

    for (const clients of clientsData) {
      await client.query(
        "INSERT INTO clients (client_name, email) VALUES ($1, $2)",
        [clients[0], clients[1]]
      );
    }

    for (const loan of loansData) {
      await client.query(
        "INSERT INTO current_book_loans (client_id, book_id, loan_date, due_date) VALUES ($1, $2, $3, $4)",
        [loan[0], loan[1], loan[2], loan[3]]
      );
    }

    console.log("Data inserted successfully");
  } catch (err) {
    console.error("Error inserting data:", err);
  }
}

module.exports = insertData;
