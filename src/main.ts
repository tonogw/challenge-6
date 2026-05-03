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
  "================================================================================",
);

// Mulai pengujian di bawah ini
import * as readline from "readline";

import { addBook, listBooks, searchBook } from "./functions/bookManager";

console.log(
  "                         SIMPLE BOOK MANAGEMENT SYSTEM           TERMID: TS-2680",
);
console.log(
  "================================================================================",
);

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

listBooks();

console.log("\nSEARCH RESULT");
console.log("=========================================");

// searchBook("clean");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("\nAUTHOR NAME . . . . .: ", (author: string) => {
  console.log("\nSEARCH RESULT");
  console.log("=========================================");

  searchBook(author);
});

console.log(" ");
console.log(" ");
console.log(
  "PF1=Help            PF2=Main Menu          PF3=Search Book        ENTER=Continue",
);
