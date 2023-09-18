const insertData = require("./fakeDataInput");
const CreateTable = require("./tableCreate");
const prompt = require("prompt-sync")();
const {
  allBooks,
  allClients,
  currentBookLoans,
  insertBook,
  insertClient,
  newBookLoan,
  bookReturn,
} = require("./queries");
const pool = require("./dbIndex");

async function main() {
  let input;
  let exit = false;

  const client = await pool.connect();
  const isFakeDataExist = await client.query("SELECT * FROM books");

  if (isFakeDataExist.rows.length === 0) {
    await CreateTable();
    await insertData();
    console.log("fake data entered");
  } else {
    console.log("fake data alread entered");
  }

  console.log("welcome to library management");
  console.log(
    "1-all books, 2-all clients, 3-current book loans, 4-new book, 5-new client, 6-new book loan, 7-book return, 8-exit"
  );
  input = parseInt(prompt("Choose by number: "));

  while (!exit) {
    switch (input) {
      case 1:
        await allBooks();
        input = parseInt(prompt("Choose by number: "));
        break;
      case 2:
        await allClients();
        input = parseInt(prompt("Choose by number: "));
        break;
      case 3:
        await currentBookLoans();
        input = parseInt(prompt("Choose by number: "));
        break;
      case 4:
        await insertBook();
        input = parseInt(prompt("Choose by number: "));
        break;
      case 5:
        await insertClient();
        input = parseInt(prompt("Choose by number: "));
        break;
      case 6:
        await newBookLoan(1);
        input = parseInt(prompt("Choose by number: "));
        break;
      case 7:
        await bookReturn();
        input = parseInt(prompt("Choose by number: "));
        break;
      case 8:
        exit = true;
        console.log("Exiting program.");
        return;
      default:
        console.log("Invalid choice. Please enter a valid number (1-8).");
    }
  }
}

main();
