// File ini adalah entry point aplikasi
// Gunakan file ini untuk menguji implementasi yang sudah dibuat
// Contoh yang bisa dilakukan:
//   1. Import fungsi-fungsi yang sudah dibuat
//   2. Tambahkan beberapa data buku untuk testing
//   3. Uji fungsi listBooks untuk melihat semua data
//   4. Uji fungsi searchBook dengan dan tanpa parameter
// Silakan bereksplorasi untuk memastikan semua fungsi berjalan dengan baik

// console.log("                     Book Management Application - Week 6");
// console.log("=".repeat(80));

import { books } from "./data/books";
// import { title } from "node:process";
// Mulai pengujian di bawah ini
// import * as readline from "node:readline";

import { moveDot } from "./types";
import { clearScreen } from "./functions/bookManager";
import { drawMenu } from "./functions/bookManager";
import { drawInquiry } from "./functions/bookManager";
import { drawAdd } from "./functions/bookManager";
import { drawHelp } from "./functions/bookManager";
import { clearResultArea } from "./functions/bookManager";
// process.stdin.on("data", (key: string) => {
//   console.log(JSON.stringify(key));
// });

import { addBook, listBooks, searchBook } from "./functions/bookManager";

// const rl = readline;

// Clear screen

// Move cursor
// function moveDot(row: number, col: number): void {
//   process.stdout.write(`\x1b[${row};${col}H`);
// }

// Draw screen

drawMenu();
let currentScreen = "MENU";

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding("utf8");

let inputTitle = "";

process.stdin.on("data", (key: string) => {
  // debug(JSON.stringify(key));
  if (handleFunctionKey(key)) {
    return;
  }

  switch (currentScreen) {
    case "MENU":
      // if (currentScreen === "MENU") {
      handleMenuInput(key);
      break;

    case "INQUIRY":
      // if (currentScreen === "INQUIRY") {
      handleSearchInput(key);
      break;

    case "ADD":
      // if (currentScreen === "ADD") {
      handleListInput(key);
      break;

    case "HELP":
      // if (currentScreen === "HELP") {
      handleAddInput(key);
      break;
  }
});

function handleFunctionKey(key: string): boolean {
  // F1
  if (key === "\u001bOP") {
    currentScreen = "HELP";
    // clearScreen();
    drawHelp();
    return true;
  }

  // F2
  if (key === "\u001bOQ") {
    currentScreen = "MENU";
    // clearScreen();
    menuSelection = "";
    drawMenu();
    return true;
  }

  // F3
  if (key === "\u001bOR") {
    currentScreen = "SEARCH";
    // clearScreen();
    inputTitle = "";
    drawInquiry();
    return true;
  }

  // F4 exit || Crtl+C
  // if (key === "\u0003") {
  //   clearScreen();
  //   process.exit();

  return false;
}

function handleMenuInput(key: string): void {
  // moveDot(22, 1);
  // debug(`KEY=[${JSON.stringify(key)}]`);

  // Typing
  if ("1234".includes(key)) {
    menuSelection = key;
    moveDot(13, 43);
    process.stdout.write("\x1b[32m" + key + "\x1b[37m");

    // debug(`MENU KEY=[${key}] |  ${currentScreen} | ${menuSelection}`);

    return;
  }

  // Backspace
  // if (key === "\u007f") {
  //   menuSelection = "";
  //   moveDot(13, 43);
  //   process.stdout.write("_");
  //   return;
  // }

  // ENTER only
  if (key !== "\r") {
    return;
    console.log(currentScreen);
    console.log(menuSelection);
  }

  switch (menuSelection) {
    case "1":
      currentScreen = "INQUIRY";
      inputTitle = "";
      // clearScreen();
      drawInquiry();
      moveDot(4, 24);

      break;

    case "2":
      currentScreen = "ADD";
      // clearScreen();
      drawAdd();

      break;

    case "3":
      currentScreen = "HELP";
      // clearScreen();
      drawHelp();
      break;

    case "4":
      // currentScreen = "MENU";
      clearScreen();
      process.exit();
  }

  menuSelection = "";
}

function redrawSearchField(): void {
  moveDot(4, 24);
  process.stdout.write("\x1b[32m" + "_".repeat(40) + "\x1b[37m");

  moveDot(4, 24);
  process.stdout.write("\x1b[32m" + inputTitle + "\x1b[37m");

  moveDot(4, 24 + inputTitle.length);
}

function handleSearchInput(key: string): void {
  if (key === "\u007f") {
    if (inputTitle.length > 0) {
      inputTitle = inputTitle.slice(0, -1);

      moveDot(4, 24);
      process.stdout.write(inputTitle + " ".repeat(20));

      // moveDot(7, 14 + inputTitle.length);
    }
    return;
  }

  if (key === "\r") {
    clearResultArea();

    // moveDot(9, 1);

    // if (inputTitle.trim() === "") {
    // currentScreen = "SEARCH";
    // clearScreen();
    // drawListScreen();
    // moveDot(8, 1);
    // listBooks();

    searchBook(inputTitle);

    moveDot(4, 24 + inputTitle.length);
    // moveDot(9, 1);
    // process.stdout.write(": " + inputTitle.length);

    return;
  }

  inputTitle += key;

  // process.stdout.write("\x1b[32m" + key + "\x1b[37m");
  redrawSearchField();
}

function handleListInput(key: string): void {
  return;
}

function handleAddInput(key: string): void {
  return;
}

let menuSelection = "";

// PF1=Help

// Menu List Books
// function drawListScreen(): void {
//   clearScreen();
//   listBooks();

//   const layoutList = [
//     { row: 1, col: 1, text: "©TONOGW" },
//     { row: 1, col: 25, text: "SIMPLE BOOK MANAGEMENT SYSTEM" },
//     { row: 1, col: 69, text: "TERMID: 2680" },
//     { row: 2, col: 1, text: "=".repeat(80) },
//     { row: 4, col: 34, text: "BOOK LIST" },
//     { row: 5, col: 25, text: "_".repeat(29) },

// { row: 7, col: 25, text: " F1 = HELP " },
// { row: 8, col: 25, text: "F2 = MAIN MENU " },
// { row: 9, col: 25, text: "F3 = SEARCH books" },
// { row: 11, col: 1, text: "RECOMMENDED FONT:" },
// { row: 12, col: 1, text: "Menlo 14" },
// { row: 13, col: 1, text: "FOR MAC:" },
// { row: 14, col: 1, text: "Terminal -> Settings -> Font" },
// { row: 15, col: 1, text: "HELP" },

// Shortcut keys
//     { row: 20, col: 1, text: "PF1=Help" },
//     { row: 20, col: 20, text: "PF2=Main Menu" },
//     { row: 20, col: 42, text: "PF3=Search Book" },
//     { row: 20, col: 67, text: "ENTER=Continue" },
//   ];
//   layoutList.forEach((item) => {
//     moveDot(item.row, item.col);
//     process.stdout.write(item.text);
//   });

//   currentScreen = "LIST";
// }

// Menu Add Book

// function debug(message: string): void {
//   moveDot(21, 1);
//   process.stdout.write(message.padEnd(80));
// }
// debug(`MENU KEY=${key} | | ${currentScreen} | ${menuSelection}`);
