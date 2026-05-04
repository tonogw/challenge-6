// File ini adalah entry point aplikasi
// Gunakan file ini untuk menguji implementasi yang sudah dibuat
// Contoh yang bisa dilakukan:
//   1. Import fungsi-fungsi yang sudah dibuat
//   2. Tambahkan beberapa data buku untuk testing
//   3. Uji fungsi listBooks untuk melihat semua data
//   4. Uji fungsi searchBook dengan dan tanpa parameter
// Silakan bereksplorasi untuk memastikan semua fungsi berjalan dengan baik

console.log("                     Book Management Application - Week 6");
console.log("=".repeat(80));

import { books } from "./data/books";
// import { title } from "node:process";
// Mulai pengujian di bawah ini
import * as readline from "node:readline";

// process.stdin.on("data", (key: string) => {
//   console.log(JSON.stringify(key));
// });

import { addBook, listBooks, searchBook } from "./functions/bookManager";

const rl = readline;

// Clear screen
function clearScreen(): void {
  process.stdout.write("\x1Bc");
}

// Move cursor
// function moveCursor(row: number, col: number): void {
//   process.stdout.write(`\x1b[${row};${col}H`);
// }

// Draw screen
function drawSearch(): void {
  clearScreen();

  const layoutTitleSearch = [
    { row: 1, col: 1, text: "©TONOGW" },
    { row: 1, col: 25, text: "SIMPLE BOOK MANAGEMENT SYSTEM" },
    { row: 1, col: 69, text: "TERMID: 2680" },
    { row: 2, col: 1, text: "=".repeat(80) },
    { row: 4, col: 1, text: "SEARCH BOOK BY TITLE" },
    { row: 5, col: 1, text: "_".repeat(44) },
    {
      row: 7,
      col: 1,
      text: "BOOK TITLE. . . . . . : ",
    },
    { row: 7, col: 25, text: "\x1b[32m" + "_".repeat(40) + "\x1b[37m" },

    // Shortcut keys
    { row: 20, col: 1, text: "PF1=Help" },
    { row: 20, col: 20, text: "PF2=Main Menu" },
    { row: 20, col: 42, text: "PF3=Search Book" },
    { row: 20, col: 67, text: "ENTER=Continue" },
    //  { row: , col: , text: "" },
  ];

  layoutTitleSearch.forEach((item) => {
    rl.cursorTo(process.stdout, item.col, item.row);
    process.stdout.write(item.text);
  });

  // Cursor position at input field
  rl.cursorTo(process.stdout, 25, 7);
}

drawMainMenu();

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding("utf8");

let inputTitle = "";

process.stdin.on("data", (key: string) => {
  // F1
  if (key === "\u001bOP") {
    currentScreen = "HELP";
    drawHelp();
    return;
  }

  // F2
  if (key === "\u001bOQ") {
    currentScreen = "MENU";
    drawMainMenu();
    return;
  }

  // F3 =|| "s" -> temporary due to Mac keyboad: searh in terminal
  if (key === "\u001bOR" || key.toLowerCase() === "s") {
    currentScreen = "SEARCH";
    inputTitle = "";
    drawSearch();
    return;
  }

  // ENTER
  if (key === "\r") {
    // clearResultArea();
    // rl.cursorTo(process.stdout,10, 1);
    // searchBook(inputTitle);
    // rl.cursorTo(process.stdout,7, 25 + inputTitle.length);
    if (currentScreen === "MENU") {
      if (menuSelection === "1") {
        currentScreen = "SEARCH";
        inputTitle = "";
        drawSearch();
        return;
      }
      if (menuSelection === "2") {
        currentScreen = "LIST";
        drawListScreen();
        return;
      }
      if (menuSelection === "3") {
        currentScreen = "ADD";
        drawSearch();
        return;
      }
      if (menuSelection === "4") {
        process.exit();
      }
    }
    return;
    console.log(currentScreen);
    console.log(menuSelection);
  }

  // CTRL+C
  if (key === "\u0003") {
    process.exit();
  }

  // Backspace
  if (key === "\u007f") {
    if (inputTitle.length > 0) {
      inputTitle = inputTitle.slice(0, -1);
      rl.cursorTo(process.stdout, 25, 7);
      process.stdout.write(inputTitle + " ");
      rl.cursorTo(process.stdout, 25, 7 + inputTitle.length);
    }

    return;
  }

  // Normaly typing
  // inputTitle += key;
  // process.stdout.write("\x1b[32m" + key + "\x1b[37m");

  if (currentScreen === "MENU") {
    handleMenuInput(key);
    return;
  }

  if (currentScreen === "SEARCH") {
    handleSearchInput(key);
    return;
  }

  if (currentScreen === "ADD") {
    handleAddInput(key);
    return;
  }

  function handleMenuInput(key: string): void {
    if ("1234".includes(key)) {
      menuSelection = key;
      rl.cursorTo(process.stdout, 43, 13);
      process.stdout.write("\x1b[32m" + key + "\x1b[37m");
    }
    return;
  }

  function handleSearchInput(key: string): void {
    if (key === "\r") {
      // if (inputTitle.length > 0) {
      clearResultArea();
      // inputTitle = inputTitle.slice(0, -1);
      //
      rl.cursorTo(process.stdout, 1, 10);
      if (inputTitle.trim() === "") {
        listBooks();
      } else {
        searchBook(inputTitle);
      }
      rl.cursorTo(process.stdout, 25, 7 + inputTitle.length);
      return;
    }

    // if (key === "\r") {
    //   clearResultArea();
    //   rl.cursorTo(process.stdout,10, 1);
    //   searchBook(inputTitle);
    //   return;
    // }
    inputTitle += key;
    process.stdout.write("\x1b[32m" + key + "\x1b[37m");
  }

  function handleAddInput(key: string): void {}

  if (key === "\u007f") {
    menuSelection = "";
    rl.cursorTo(process.stdout, 43, 13);
    process.stdout.write("_");
    rl.cursorTo(process.stdout, 43, 13);
    return;
  }

  // Selection MENU
  if (key === "\r") {
    if (menuSelection === "1") {
      currentScreen = "SEARCH";
      inputTitle = "";
      drawSearch();

      return;
    }
    if (menuSelection === "2") {
      currentScreen = "LIST";
      menuSelection = "";
      drawListScreen();

      return;
    }

    if (menuSelection === "3") {
      currentScreen = "ADD";
      menuSelection = "";
      drawAddScreen();
    }

    if (menuSelection === "4") {
      clearScreen();
      process.exit();
    }
  }
});

function clearResultArea(): void {
  for (let row = 10; row <= 14; row++) {
    rl.cursorTo(process.stdout, 1, row);

    process.stdout.write(" ".repeat(80));
  }
}

let currentScreen = "MENU";

function drawMainMenu(): void {
  clearScreen();

  const layoutMainMenu = [
    { row: 1, col: 1, text: "©TONOGW" },
    { row: 1, col: 25, text: "SIMPLE BOOK MANAGEMENT SYSTEM" },
    { row: 1, col: 69, text: "TERMID: 2680" },
    { row: 2, col: 1, text: "=".repeat(80) },
    { row: 4, col: 36, text: "MAIN MENU" },
    { row: 5, col: 25, text: "_".repeat(29) },

    { row: 7, col: 25, text: "1. SEARCH BOOK" },
    { row: 8, col: 25, text: "2. LIST BOOK" },
    { row: 9, col: 25, text: "3. ADD BOOK" },
    { row: 10, col: 25, text: "4. EXIT" },
    {
      row: 13,
      col: 25,
      text: "SELECTION . . . : " + "\x1b[32m" + "_" + "\x1b[37m",
    },
    // Shortcut keys
    { row: 20, col: 1, text: "PF1=Help" },
    { row: 20, col: 20, text: "PF2=Main Menu" },
    { row: 20, col: 42, text: "PF3=Search Book" },
    { row: 20, col: 67, text: "ENTER=Continue" },
  ];

  layoutMainMenu.forEach((item) => {
    rl.cursorTo(process.stdout, item.col, item.row);

    process.stdout.write(item.text);
  });
  rl.cursorTo(process.stdout, 43, 13);
}

let menuSelection = "";

// PF1=Help
function drawHelp(): void {
  clearScreen();

  const layoutHelp = [
    { row: 1, col: 1, text: "©TONOGW" },
    { row: 1, col: 25, text: "SIMPLE BOOK MANAGEMENT SYSTEM" },
    { row: 1, col: 69, text: "TERMID: 2680" },
    { row: 2, col: 1, text: "=".repeat(80) },
    { row: 4, col: 38, text: "HELP" },
    { row: 5, col: 25, text: "_".repeat(29) },

    { row: 7, col: 25, text: " F1 = HELP " },
    { row: 8, col: 25, text: "F2 = MAIN MENU " },
    { row: 9, col: 25, text: "F3 = SEARCH books" },
    { row: 11, col: 1, text: " RECOMMENDED FONT:" },
    { row: 12, col: 1, text: "Menlo 14" },
    { row: 13, col: 1, text: "FOR MAC:" },
    { row: 14, col: 1, text: "Terminal -> Settings -> Font" },
    { row: 15, col: 1, text: "HELP" },

    // Shortcut keys
    { row: 20, col: 1, text: "PF1=Help" },
    { row: 20, col: 20, text: "PF2=Main Menu" },
    { row: 20, col: 42, text: "PF3=Search Book" },
    { row: 20, col: 67, text: "ENTER=Continue" },
  ];
  layoutHelp.forEach((item) => {
    rl.cursorTo(process.stdout, item.col, item.row);
    process.stdout.write(item.text);
  });

  currentScreen = "HELP";
}

// Menu List Books
function drawListScreen(): void {
  clearScreen();

  const layoutList = [
    { row: 1, col: 1, text: "©TONOGW" },
    { row: 1, col: 25, text: "SIMPLE BOOK MANAGEMENT SYSTEM" },
    { row: 1, col: 69, text: "TERMID: 2680" },
    { row: 2, col: 1, text: "=".repeat(80) },
    { row: 4, col: 38, text: "BOOK LIST" },
    { row: 5, col: 25, text: "_".repeat(29) },

    { row: 7, col: 25, text: " F1 = HELP " },
    { row: 8, col: 25, text: "F2 = MAIN MENU " },
    { row: 9, col: 25, text: "F3 = SEARCH books" },
    { row: 11, col: 1, text: "RECOMMENDED FONT:" },
    { row: 12, col: 1, text: "Menlo 14" },
    { row: 13, col: 1, text: "FOR MAC:" },
    { row: 14, col: 1, text: "Terminal -> Settings -> Font" },
    { row: 15, col: 1, text: "HELP" },

    // Shortcut keys
    { row: 20, col: 1, text: "PF1=Help" },
    { row: 20, col: 20, text: "PF2=Main Menu" },
    { row: 20, col: 42, text: "PF3=Search Book" },
    { row: 20, col: 67, text: "ENTER=Continue" },
  ];
  layoutList.forEach((item) => {
    rl.cursorTo(process.stdout, item.col, item.row);
    process.stdout.write(item.text);
  });

  currentScreen = "LIST";
}

// Menu Add Book
function drawAddScreen(): void {
  clearScreen();

  const layoutAdd = [
    { row: 1, col: 1, text: "©TONOGW" },
    { row: 1, col: 25, text: "SIMPLE BOOK MANAGEMENT SYSTEM" },
    { row: 1, col: 69, text: "TERMID: 2680" },
    { row: 2, col: 1, text: "=".repeat(80) },
    { row: 4, col: 38, text: "ADD BOOK" },
    { row: 5, col: 25, text: "_".repeat(29) },

    { row: 7, col: 25, text: "Book Title . . . . : " },
    { row: 8, col: 25, text: "Author Name  . . . : " },
    { row: 9, col: 25, text: "Publication Year . : " },
    { row: 11, col: 1, text: " RECOMMENDED FONT:" },
    { row: 12, col: 1, text: "Menlo 14" },
    { row: 13, col: 1, text: "FOR MAC:" },
    { row: 14, col: 1, text: "Terminal -> Settings -> Font" },
    { row: 15, col: 1, text: "HELP" },

    // Shortcut keys
    { row: 20, col: 1, text: "PF1=Help" },
    { row: 20, col: 20, text: "PF2=Main Menu" },
    { row: 20, col: 42, text: "PF3=Search Book" },
    { row: 20, col: 67, text: "ENTER=Continue" },
  ];

  layoutAdd.forEach((item) => {
    rl.cursorTo(process.stdout, item.col, item.row);
    process.stdout.write(item.text);
  });

  currentScreen = "ADD";
}
