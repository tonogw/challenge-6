// File ini adalah entry point aplikasi
// Gunakan file ini untuk menguji implementasi yang sudah dibuat
// Contoh yang bisa dilakukan:
//   1. Import fungsi-fungsi yang sudah dibuat
//   2. Tambahkan beberapa data buku untuk testing
//   3. Uji fungsi listBooks untuk melihat semua data
//   4. Uji fungsi searchBook dengan dan tanpa parameter
// Silakan bereksplorasi untuk memastikan semua fungsi berjalan dengan baik

import { books } from "./data/books";

console.log("Book Management Application - Week 6");
console.log("=====================================");

// Mulai pengujian di bawah ini

// import { books } from "./data/books";
import { addBook, listBooks, searchBook } from "./functions/bookManager";

addBook({
  title: "Clean Code",
  author: "Robert Martin",
  publicationYear: 2008,
});

addBook({
  title: "Big Data for Dummies",
  author: "Judith Hurwitz",
  publicationYear: 2013,
});

listBooks();

searchBook("clean");

searchBook("dummies");

searchBook();
