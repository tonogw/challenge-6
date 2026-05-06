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

import { ScreenField, moveDot, AddScreenField } from "./types";

import {
  addBook,
  listBooks,
  searchBook,
  clearScreen,
  drawMenu,
  drawInquiry,
  drawAdd,
  drawHelp,
  clearResultArea,
} from "./functions/bookManager";
import { moveCursor } from "node:readline";

// Draw screen
drawMenu();
let currentScreen = "MENU";

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding("utf8");

let inputTitle = "";

process.stdin.on("data", (key: string) => {
  if (handleFunctionKey(key)) {
    return;
  }

  switch (currentScreen) {
    case "MENU":
      handleMenuSelection(key);
      break;

    case "INQUIRY":
      handleSearchInput(key);
      break;

    case "ADD":
      handleAddInput(key);
      break;

    case "HELP":
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

    menuSelection = "";
    drawMenu();
    return true;
  }

  // F3
  if (key === "\u001bOR") {
    currentScreen = "INQUIRY";

    inputTitle = "";
    drawInquiry();
    return true;
  }

  return false;
}

function handleMenuSelection(key: string): void {
  // Typing
  if ("1234".includes(key)) {
    menuSelection = key;
    moveDot(13, 43);
    process.stdout.write("\x1b[32m" + key + "\x1b[37m");

    return;
  }

  // ENTER only
  if (key !== "\r") {
    return;
  }

  switch (menuSelection) {
    case "1":
      currentScreen = "INQUIRY";
      inputTitle = "";

      drawInquiry();
      moveDot(4, 24);

      break;

    case "2":
      currentScreen = "ADD";

      drawAdd();

      break;

    case "3":
      currentScreen = "HELP";

      drawHelp();
      break;

    case "4":
      clearScreen();
      process.exit();
  }

  menuSelection = "";
}

function redrawSearchField(): void {
  moveDot(4, 24);
  process.stdout.write("\x1b[32m" + inputTitle.padEnd(57) + "\x1b[37m");

  moveDot(4, 24 + inputTitle.length);
}

function handleSearchInput(key: string): void {
  // ENTER
  if (key === "\r") {
    clearResultArea();

    if (inputTitle.trim() === "") {
      listBooks();
    } else {
      searchBook(inputTitle);
    }
    moveDot(4, 24 + inputTitle.length);

    return;
  }

  // Backspace
  if (key === "\u007f") {
    if (inputTitle.length > 0 || inputTitle.length <= 57) {
      inputTitle = inputTitle.slice(0, -1);

      redrawSearchField();
    }

    return;
  }

  // Normal typing
  if (key.length > 1) {
    return;
  }

  if (inputTitle.length >= 57) {
    return;
  }
  inputTitle += key;

  process.stdout.write("\x1b[32m" + key + "\x1b[37m");
  redrawSearchField();
}

function handleListInput(key: string): void {
  return;
}

function handleAddInput(key: string): void {
  // ENTER
  if (key === "\u007f") {
    switch (addField) {
      case "ADD_TITLE":
        addTitle = addTitle.slice(0, -1);
        break;

      case "ADD_AUTHOR":
        addAuthor = addAuthor.slice(0, -1);
        break;

      case "ADD_YEAR":
        addYear = addYear.slice(0, -1);
        break;
    }

    refreshAddScreen();
    return;
  }

  // ENTER
  if (key === "\r") {
    switch (addField) {
      case "ADD_TITLE":
        addField = "ADD_AUTHOR";
        break;

      case "ADD_AUTHOR":
        addField = "ADD_YEAR";
        refreshAddScreen();
        break;

      case "ADD_YEAR":
        addBook({
          title: addTitle,
          author: addAuthor,
          publicationYear: Number(addYear),
        });

        addTitle = "";
        addAuthor = "";
        addYear = "";

        addField = "ADD_TITLE";
        refreshAddScreen();
        break;

      // redrawAddField();
      // return;
    }
  }

  // NORMAL TYPING
  switch (addField) {
    case "ADD_TITLE":
      addTitle += key;
      break;

    case "ADD_AUTHOR":
      addAuthor += key;
      break;

    case "ADD_YEAR":
      if ("0123456789".includes(key)) {
        addYear += key;
      }
      break;
  }

  redrawAddField();
}

let menuSelection = "";

// =================
// Add book
// =================
let addTitle = "";
let addAuthor = "";
let addYear = "";

let fieldIndex = "";

let addField: AddScreenField = "ADD_TITLE";

// if (addField === "ADD_TITLE") {
//   addField = "ADD_AUTHOR";
// } else if (addField === "ADD_AUTHOR") {
//   addField = "ADD_YEAR";
// }

// addField = "ADD_TITLE";

function redrawAddField(): void {
  moveDot(7, 24);
  process.stdout.write("\x1b[32m" + addTitle.padEnd(40) + "\x1b[37m");

  moveDot(8, 24);
  process.stdout.write("\x1b[32m" + addAuthor.padEnd(40) + "\x1b[37m");

  moveDot(9, 24);
  process.stdout.write("\x1b[32m" + addYear.padEnd(4) + "\x1b[37m");

  moveCursorToActiveField();
}

function refreshAddScreen(): void {
  drawAdd();
  redrawAddField();
}

function moveCursorToActiveField(): void {
  switch (addField) {
    case "ADD_TITLE":
      moveDot(7, 24 + addTitle.length);
      break;

    case "ADD_AUTHOR":
      moveDot(8, 24 + addAuthor.length);
      break;

    case "ADD_YEAR":
      moveDot(9, 24 + addYear.length);
      break;
  }
}
