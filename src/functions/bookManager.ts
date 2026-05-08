// Tugas 3: Implementasikan fungsi-fungsi manajemen buku

// Fungsi addBook
// Fungsi ini digunakan untuk menambahkan buku baru ke dalam koleksi
// Parameter yang dibutuhkan: data buku sesuai tipe Book
// Fungsi ini tidak mengembalikan nilai (void)
// Petunjuk: pikirkan bagaimana cara menambahkan buku ke array yang sudah disediakan

// Fungsi listBooks
// Fungsi ini digunakan untuk menampilkan semua buku yang tersimpan
// Tidak memerlukan parameter
// Fungsi ini tidak mengembalikan nilai (void)
// Petunjuk: pikirkan cara menampilkan data buku dengan format yang mudah dibaca

// Fungsi searchBook
// Fungsi ini digunakan untuk mencari buku berdasarkan judul
// Parameter title bersifat opsional (bisa ada atau tidak)
// Fungsi ini tidak mengembalikan nilai (void)
// Petunjuk: jika parameter title diberikan, cari buku yang cocok
//           jika tidak diberikan, tampilkan semua buku atau berikan informasi yang sesuai

import { books } from "../data/books";
import { Book } from "../types";

const addedBooks: Book[] = [];

// ADD BOOK
export function addBook(book: Book): void {
  books.push(book);
  addedBooks.push(book);
}

// SHOW ADDED BOOKS
export function showAddedBooks(): void {
  const addHeader = ` ADD BOOK `;
  console.log(
    "\n" +
      addHeader
        .padStart(Math.floor((80 + addHeader.length) / 2), "=")
        .padEnd(80, "="),
  );

  // CONTENT HEADER ADDED BOOK
  console.log(
    "\x1b[36m" +
      `${"   TITLE".padEnd(45)} | ${"REMARKS".padEnd(25)} ` +
      "\x1b[37m",
  );

  // CONTENT ADDED BOOK IF TRUE
  addedBooks.forEach((book, index) => {
    console.log(
      "\x1b[32m" +
        `${index + 1}. ${book.title.padEnd(42)} |\x1b[37m Successfully added `,
    );
  });
}

// LIST BOOK FUNCTION
export function listBooks(): void {
  //  SECTION HEADER BOOK LIST
  const listHeader = ` BOOK LIST `;

  console.log(
    "\n" +
      listHeader
        .padStart(Math.floor((80 + listHeader.length) / 2), "=")
        .padEnd(80, "="),
  );

  // HEADER CONTENT BOOK LIST
  console.log(
    "\x1b[36m" +
      `${"   TITLE".padEnd(45)} | ${"AUTHOR".padEnd(25)} | YEAR ` +
      "\x1b[37m",
  );

  // CONTENT BOOK LIST
  books.forEach((book, index) => {
    console.log(
      "\x1b[32m" +
        `${index + 1}. ${book.title.padEnd(42)} | ${book.author.padEnd(25)} | ${book.publicationYear}` +
        "\x1b[37m",
    );
  });
}

// SEARCH BOOK
export function searchBook(title?: string): void {
  if (!title) {
    title = " ";
  }

  // SECTION HEADER SEARCH BOOK
  const result =
    title === " "
      ? books
      : books.filter((book) =>
          book.title.toLowerCase().includes(title.toLowerCase()),
        );

  const searchHeader = ` SEARCH RESULT: ${"\x1b[32m" + title + "\x1b[37m"} `;

  console.log(
    "\n" +
      searchHeader
        .padStart(Math.floor((90 + searchHeader.length) / 2), "=")
        .padEnd(90, "="),
  );

  // CONTENT SEARCH BOOK IF FALSE
  if (result.length === 0) {
    console.log("\x1b[31m" + " ".repeat(30) + "NO MATCHING BOOK" + "\x1b[37m");
    return;
  }

  // CONTENT HEADER SEARCH BOOK
  console.log(
    "\x1b[36m" +
      `${"   TITLE".padEnd(45)} | ${"AUTHOR".padEnd(25)} | YEAR ` +
      "\x1b[37m",
  );

  // CONTENT SEARCH BOOK RESULT
  result.forEach((book, index) => {
    console.log(
      "\x1b[32m" +
        `${index + 1}. ${book.title.padEnd(42)} | ${book.author.padEnd(25)} | ${book.publicationYear}` +
        "\x1b[37m",
    );
  });
}
