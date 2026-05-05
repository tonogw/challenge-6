// Tugas 3: Implementasikan fungsi-fungsi manajemen buku

import { Book } from "../types";
import { books } from "../data/books";
import { cursorTo } from "node:readline";
import * as readline from "node:readline";
const rl = readline;

import { moveDot } from "../types";

// Fungsi addBook
// Fungsi ini digunakan untuk menambahkan buku baru ke dalam koleksi
// Parameter yang dibutuhkan: data buku sesuai tipe Book
// Fungsi ini tidak mengembalikan nilai (void)
// Petunjuk: pikirkan bagaimana cara menambahkan buku ke array yang sudah disediakan
export function addBook(book: Book): void {
  books.push(book);
}

// Fungsi listBooks
// Fungsi ini digunakan untuk menampilkan semua buku yang tersimpan
// Tidak memerlukan parameter
// Fungsi ini tidak mengembalikan nilai (void)
// Petunjuk: pikirkan cara menampilkan data buku dengan format yang mudah dibaca
export function listBooks(): void {
  moveDot(7, 1);
  process.stdout.write("BOOK TITLE".padEnd(48) + "AUTHOR".padEnd(27) + "YEAR");

  moveDot(8, 1);
  process.stdout.write("_".repeat(80));
  books.forEach((book, index) => {
    moveDot(9 + index, 1);

    process.stdout.write(
      "\x1b[32m" +
        `${book.title.padEnd(45)} | ${book.author.padEnd(25)} | ${book.publicationYear}` +
        "\x1b[37m",
    );
  });

  // console.log("\nBOOK LIST");
  // console.log("_".repeat(80));

  // books.forEach((book) => {
  //   console.log("BOOK TITLE".padEnd(45) + "AUTHOR".padEnd(25) + "YEAR");

  //   console.log(
  //     `${book.title.padEnd(45)} | ${book.author.padEnd(25)} | ${book.publicationYear}`,
  //   );
  // });
}

// Fungsi searchBook
// Fungsi ini digunakan untuk mencari buku berdasarkan judul
// Parameter title bersifat opsional (bisa ada atau tidak)
// Fungsi ini tidak mengembalikan nilai (void)
// Petunjuk: jika parameter title diberikan, cari buku yang cocok
//           jika tidak diberikan, tampilkan semua buku atau berikan informasi yang sesuai
export function searchBook(title?: string): void {
  if (!title?.trim()) {
    // console.log("Search title is required");
    moveDot(9, 1);
    process.stdout.write("\x1b[32m");
    listBooks();
    return;
  }

  const result = books.filter((book) =>
    book.title.toLowerCase().includes(title.toLowerCase()),
  );

  if (result.length === 0) {
    moveDot(9, 27);
    process.stdout.write(
      "\x1b[31m" + "*** NO MATCHING RECORD ***" + "\x1b[37m",
    );

    // process.stdout.write("\x1b[32m");
    // listBooks();
    return;
  }

  if (result.length > 0) {
    moveDot(7, 1);
    process.stdout.write(
      "BOOK TITLE".padEnd(48) + "AUTHOR".padEnd(27) + "YEAR",
    );
    moveDot(8, 1);
    process.stdout.write("-".repeat(80));

    result.forEach((book, index) => {
      moveDot(9 + index, 1);
      process.stdout.write(
        "\x1b[32m" +
          `${book.title.padEnd(45)} | ${book.author.padEnd(25)} | ${book.publicationYear}` +
          "\x1b[37m",
      );
    });
  }
}
