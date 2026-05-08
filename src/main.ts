// File ini adalah entry point aplikasi
// Gunakan file ini untuk menguji implementasi yang sudah dibuat
// Contoh yang bisa dilakukan:
//   1. Import fungsi-fungsi yang sudah dibuat
//   2. Tambahkan beberapa data buku untuk testing
//   3. Uji fungsi listBooks untuk melihat semua data
//   4. Uji fungsi searchBook dengan dan tanpa parameter
// Silakan bereksplorasi untuk memastikan semua fungsi berjalan dengan baik

// APPLICATION NAME HEADER
const bookHeader = " Book Management Application - ©TONOGW ";
console.log(
  bookHeader
    .padStart(Math.floor((80 + bookHeader.length) / 2), "=")
    .padEnd(80, "="),
);

// Mulai pengujian di bawah ini

// import functions from bookManager to display result in npm run dev
import { addBook, listBooks, searchBook } from "./functions/bookManager";
import { showAddedBooks } from "./functions/bookManager";
addBook({
  title: "Clean Code",
  author: "Robert Martin",
  publicationYear: 2008,
});

// ADDED 2 BOOKS FOR TESTING AND POPULATED IN ADDED REPORT
addBook({
  title: "Big Data for Dummies",
  author: "Judith Hurwitz",
  publicationYear: 2013,
});

showAddedBooks();

listBooks();

searchBook("clean");

searchBook("dummies");

searchBook("modular design utility management");

searchBook("");
