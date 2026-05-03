// Tugas 3: Implementasikan fungsi-fungsi manajemen buku

import { Book } from "../types";
import { books } from "../data/books";

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
  console.log("\nBOOK LIST");
  console.log("=========================================");

  books.forEach((book) => {
    console.log(`${book.title} | ${book.author} | ${book.publicationYear}`);
  });
}

// Fungsi searchBook
// Fungsi ini digunakan untuk mencari buku berdasarkan judul
// Parameter title bersifat opsional (bisa ada atau tidak)
// Fungsi ini tidak mengembalikan nilai (void)
// Petunjuk: jika parameter title diberikan, cari buku yang cocok
//           jika tidak diberikan, tampilkan semua buku atau berikan informasi yang sesuai
export function searchBook(author?: string): void {
  if (!author) {
    console.log("Search title is required");
    return;
  }

  const result = books.filter((book) =>
    book.author.toLowerCase().includes(author.toLowerCase()),
  );

  if (result.length === 0) {
    console.log("\x1b[32m" + "Author not found.");
    return;
  }

  console.log("BOOK TITLE".padEnd(35) + "AUTHOR".padEnd(25) + "YEAR");

  console.log("-".repeat(65));

  result.forEach((book) => {
    console.log(
      "\x1b[32m" +
        `${book.title.padEnd(30)} | ${book.author.padEnd(25)} | ${book.publicationYear}`,
    );
  });
}
