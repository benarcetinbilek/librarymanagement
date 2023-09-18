const pool = require("./dbIndex");
const prompt = require("prompt-sync")();

async function allBooks() {
  console.log("Displaying all books...");
  console.log("------------------------------------");

  //query
  const client = await pool.connect();
  const result = await client.query("SELECT * FROM books");
  console.table(result.rows);

  console.log("------------------------------------");
  console.log(
    "1-all books, 2-all clients, 3-current book loans, 4-new book, 5-new client, 6-new book loan, 7-book return, 8-exit"
  );
}

async function allClients() {
  console.log("Displaying all clients...");
  console.log("------------------------------------");
  //
  const client = await pool.connect();
  const result = await client.query("SELECT * FROM clients");
  console.table(result.rows);
  console.log("------------------------------------");

  console.log(
    "1-all books, 2-all clients, 3-current book loans, 4-new book, 5-new client, 6-new book loan, 7-book return, 8-exit"
  );
}

async function currentBookLoans() {
  console.log("Displaying all current book loans");
  console.log("------------------------------------");
  //
  const client = await pool.connect();
  const result = await client.query(`SELECT
        current_book_loans.client_id AS client_id,
        clients.client_name AS client,
        current_book_loans.book_id AS book_id,
        books.title AS book,
        current_book_loans.loan_date AS loan_date,
        current_book_loans.due_date AS return_date
        FROM
        current_book_loans
        INNER JOIN books ON current_book_loans.book_id = books.book_id
        INNER JOIN clients ON current_book_loans.client_id = clients.client_id;
    `);
  console.table(result.rows);
  console.log("------------------------------------");
  console.log(
    "1-all books, 2-all clients, 3-current book loans, 4-new book, 5-new client, 6-new book loan, 7-book return, 8-exit"
  );
}

async function insertBook() {
  const input = prompt("please enter new book title: ");
  //
  const client = await pool.connect();
  const result = await client.query(
    "INSERT INTO books (title, available) VALUES ($1, $2)",
    [input, true]
  );
  console.log("new book inserted");
  console.log("------------------------------------");
  console.log(
    "1-all books, 2-all clients, 3-current book loans, 4-new book, 5-new client, 6-new book loan, 7-book return, 8-exit"
  );
}

async function insertClient() {
  const clName = prompt("please enter new client name: ");
  const clEmail = prompt("please enter new client e-mail");

  //
  const client = await pool.connect();
  const result = await client.query(
    "INSERT INTO clients (client_name, email) VALUES ($1, $2)",
    [clName, clEmail]
  );
  console.log("new client inserted");
  console.log("------------------------------------");
  console.log(
    "1-all books, 2-all clients, 3-current book loans, 4-new book, 5-new client, 6-new book loan, 7-book return, 8-exit"
  );
}

async function newBookLoan() {
  const clId = prompt("please enter client id for loan: ");
  const bookId = prompt("please enter book id for loan: ");

  const currentDate = new Date();

  const dueDate = new Date(currentDate);
  dueDate.setDate(currentDate.getDate() + 7);

  //
  const client = await pool.connect();
  const findBookById = await client.query(
    "SELECT * FROM books WHERE book_id=$1",
    [bookId]
  );
  const isAvailable = findBookById.rows[0].available;

  if (isAvailable) {
    await client.query(
      "INSERT INTO current_book_loans (client_id, book_id, loan_date, due_date) VALUES ($1, $2, $3, $4)",
      [clId, bookId, currentDate, dueDate]
    );
    await client.query(
      "UPDATE books SET available = false WHERE book_id = $1",
      [bookId]
    );
    console.log("book loan completed");
  } else {
    console.log("book is not available");
  }

  console.log("------------------------------------");
  console.log(
    "1-all books, 2-all clients, 3-current book loans, 4-new book, 5-new client, 6-new book loan, 7-book return, 8-exit"
  );
}

async function bookReturn() {
  const clId = prompt("please enter client id for return: ");
  const bookId = prompt("please enter book id for return: ");

  const client = await pool.connect();

  const findLoan = await client.query(
    "SELECT * FROM current_book_loans WHERE client_id=$1 AND book_id=$2",
    [clId, bookId]
  );
  const isLoaned = findLoan.rows;
  if (isLoaned.length === 0) {
    console.log("book is already available");
  } else {
    await client.query(
      "DELETE FROM current_book_loans WHERE client_id = $1 AND book_id = $2",
      [clId, bookId]
    );
    await client.query("UPDATE books SET available = true WHERE book_id = $1", [
      bookId,
    ]);
    console.log("book returned");
  }

  console.log("------------------------------------");
  console.log(
    "1-all books, 2-all clients, 3-current book loans, 4-new book, 5-new client, 6-new book loan, 7-book return, 8-exit"
  );
}

module.exports = {
  allBooks,
  allClients,
  currentBookLoans,
  insertBook,
  insertClient,
  newBookLoan,
  bookReturn,
};
