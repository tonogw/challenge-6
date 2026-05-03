// File ini adalah entry point aplikasi
// Gunakan file ini untuk menguji implementasi yang sudah dibuat
// Contoh yang bisa dilakukan:
//   1. Import fungsi-fungsi yang sudah dibuat
//   2. Tambahkan beberapa data buku untuk testing
//   3. Uji fungsi listBooks untuk melihat semua data
//   4. Uji fungsi searchBook dengan dan tanpa parameter
// Silakan bereksplorasi untuk memastikan semua fungsi berjalan dengan baik

console.log("                     Book Management Application - Week 6");
console.log(
  "=".repeat(80),
  // "================================================================================",
);

// Mulai pengujian di bawah ini
// import * as readline from "readline";

import { addBook, searchBook } from "./functions/bookManager";

// Clear screen
function clearScreen(): void {
  process.stdout.write("\x1Bc");
}

// Move cursor
function moveCursor(row: number, col: number): void {
  process.stdout.write(`\x1b[${row};${col}H`);
}

// Draw screen
function drawScreen(): void {
  clearScreen();

  moveCursor(1, 1);
  process.stdout.write(
    "TONOGW                 SIMPLE BOOK MANAGEMENT SYSTEM             TERMID: TS-2680",
  );

  moveCursor(2, 1);
  // process.stdout.write(
  // "================================================================================",
  console.log("=".repeat(80));

  moveCursor(4, 1);
  process.stdout.write("SEARCH BOOK BY AUTHOR NAME");

  moveCursor(5, 1);
  process.stdout.write("____________________________________________");

  moveCursor(7, 1);
  process.stdout.write(
    "AUTHOR NAME . . . . . : " + "\x1b[32m" + "____________________",
  );
  process.stdout.write("\x1b[37m");

  // moveCursor(9, 1);
  // process.stdout.write("BOOK TITLE | AUTHOR | PUBLICATION YEAR");

  moveCursor(20, 1);
  process.stdout.write("PF1=Help");

  moveCursor(20, 20);
  process.stdout.write("PF2=Main Menu");

  moveCursor(20, 42);
  process.stdout.write("PF3=Search Book");

  moveCursor(20, 67);
  process.stdout.write("ENTER=Continue");

  // Cursor position at input field
  moveCursor(7, 25);
}

// console.log(
//   "                         SIMPLE BOOK MANAGEMENT SYSTEM           TERMID: TS-2680",
// );
// console.log(
//   "================================================================================",
// );

// Seed data
addBook({
  title: "Clean Code",
  author: "Robert Martin",
  publicationYear: 2008,
});

addBook({
  title: "Clean Architecture",
  author: "Robert Martin",
  publicationYear: 2017,
});

addBook({
  title: "Domain Driven Design",
  author: "Eric Evans",
  publicationYear: 2003,
});

drawScreen();

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding("utf8");

let author = "";

process.stdin.on("data", (key: string) => {
  // F2
  if (key === "\x1b0Q") {
    currentScreen = "MENU";

    drawMainMenu();

    return;
  }

  // ENTER
  if (key === "\r") {
    clearResultArea();

    moveCursor(10, 1);

    searchBook(author);

    moveCursor(7, 25 + author.length);

    return;
  }

  // CTRL+C
  if (key === "\u0003") {
    process.exit();
  }

  // Backspace
  if (key === "\u007f") {
    if (author.length > 0) {
      author = author.slice(0, -1);

      moveCursor(7, 25);

      process.stdout.write(author + " ");

      moveCursor(7, 25 + author.length);
    }

    return;
  }

  // Normaly typing
  author += key;

  process.stdout.write("\x1b[32m" + key);
  process.stdout.write("\x1b[37m");
});

function clearResultArea(): void {
  for (let row = 10; row <= 15; row++) {
    moveCursor(row, 1);

    process.stdout.write(" ".repeat(80));
  }
}

let currentScreen = "SEARCH";

function drawMainMenu(): void {
  clearScreen();

  moveCursor(1, 1);
  process.stdout.write("MAIN MENU");

  moveCursor(4, 1);
  process.stdout.write("1. USER PROFILE");

  moveCursor(5, 1);
  process.stdout.write("2. LIST BOOK");

  moveCursor(6, 1);
  process.stdout.write("3. ADD BOOK");

  moveCursor(7, 1);
  process.stdout.write("4. EXIT");

  moveCursor(20, 1);
  process.stdout.write(
    "PF1=Help            PF2=Main Menu          PF3=Search Book        ENTER=Continue",
  );
}

// listBooks();

// console.log("\nSEARCH RESULT");
// console.log("=========================================");

// // searchBook("clean");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("\nAUTHOR NAME . . . . .: ", (author: string) => {
//   console.log("\nSEARCH RESULT");
//   console.log("=========================================");

//   searchBook(author);
// });

// console.log(" ");
// console.log(" ");
// console.log(
//   "PF1=Help            PF2=Main Menu          PF3=Search Book        ENTER=Continue",
// );
