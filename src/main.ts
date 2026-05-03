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

// import { title } from "node:process";
// Mulai pengujian di bawah ini
// import * as readline from "readline";

import { addBook, listBooks, searchBook } from "./functions/bookManager";

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

  const layoutTitleSearch = [
    { row: 1, col: 1, text: "TONOGW" },
    { row: 1, col: 25, text: "SIMPLE BOOK MANAGEMENT SYSTEM" },
    { row: 1, col: 69, text: "TERMID: 2680" },
    { row: 2, col: 1, text: "=".repeat(80) },
    { row: 4, col: 1, text: "SEARCH BY BOOK TITLE" },
    { row: 5, col: 1, text: "_".repeat(44) },
    {
      row: 7,
      col: 1,
      text: "BOOK TITLE. . . . . . : ",
    },
    { row: 7, col: 25, text: "\x1b[32m" + "_".repeat(20) + "\x1b[37m" },
    { row: 20, col: 1, text: "PF1=Help" },
    { row: 20, col: 20, text: "PF2=Main Menu" },
    { row: 20, col: 42, text: "PF3=Search Book" },
    { row: 20, col: 67, text: "ENTER=Continue" },
    //  { row: , col: , text: "" },
  ];

  layoutTitleSearch.forEach((item) => {
    moveCursor(item.row, item.col);
    process.stdout.write(item.text);
  });

  // Cursor position at input field
  moveCursor(7, 25);
}

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

let inputTitle = "";

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

    searchBook(inputTitle);

    moveCursor(7, 25 + inputTitle.length);

    return;
  }

  // CTRL+C
  if (key === "\u0003") {
    process.exit();
  }

  // Backspace
  if (key === "\u007f") {
    if (inputTitle.length > 0) {
      inputTitle = inputTitle.slice(0, -1);

      moveCursor(7, 25);

      process.stdout.write(inputTitle + " ");

      moveCursor(7, 25 + inputTitle.length);
    }

    return;
  }

  // Normaly typing
  inputTitle += key;

  process.stdout.write("\x1b[32m" + key + "\x1b[37m");
});

function clearResultArea(): void {
  for (let row = 10; row <= 14; row++) {
    moveCursor(row, 1);

    process.stdout.write(" ".repeat(80));
  }
}

let currentScreen = "SEARCH";

function drawMainMenu(): void {
  clearScreen();

  const layoutMainMenu = [
    { row: 1, col: 1, text: "TONOGW" },
    { row: 1, col: 25, text: "SIMPLE BOOK MANAGEMENT SYSTEM" },
    { row: 1, col: 69, text: "TERMID: 2680" },
    { row: 2, col: 1, text: "=".repeat(80) },
    { row: 4, col: 1, text: "SEARCH BY BOOK TITLE" },
    { row: 5, col: 1, text: "_".repeat(44) },
    { row: 6, col: 1, text: "MAIN MENU" },
    { row: 9, col: 1, text: "1. USER PROFILE" },
    { row: 10, col: 1, text: "2. LIST BOOK" },
    { row: 11, col: 1, text: "3. ADD BOOK" },
    { row: 12, col: 1, text: "4. EXIT" },
    { row: 20, col: 1, text: "PF1=Help" },
    { row: 20, col: 20, text: "PF2=Main Menu" },
    { row: 20, col: 42, text: "PF3=Search Book" },
    { row: 20, col: 67, text: "ENTER=Continue" },
  ];

  layoutMainMenu.forEach((item) => {
    moveCursor(item.row, item.col);

    process.stdout.write(item.text);
  });

  // moveCursor(1, 1);
  // process.stdout.write("MAIN MENU");

  // moveCursor(4, 1);
  // process.stdout.write("1. USER PROFILE");

  // moveCursor(5, 1);
  // process.stdout.write("2. LIST BOOK");

  // moveCursor(6, 1);
  // process.stdout.write("3. ADD BOOK");

  // moveCursor(7, 1);
  // process.stdout.write("4. EXIT");

  // moveCursor(20, 1);
  // process.stdout.write("PF1=Help");

  // moveCursor(20, 20);
  // process.stdout.write("PF2=Main Menu");

  // moveCursor(20, 42);
  // process.stdout.write("PF3=Search Book");

  // moveCursor(20, 67);
  // process.stdout.write("ENTER=Continue");
}
