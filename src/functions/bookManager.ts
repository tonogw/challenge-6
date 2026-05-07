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

export function addBook(book: Book): void {
  books.push(book);
  console.log(`Book \x1b[32m"${book.title}"\x1b[37m successfully added. `);
}

export function listBooks(): void {
  console.log("\n=== BOOK LIST ===");

  books.forEach((book, index) => {
    console.log(
      "\x1b[32m" +
        `${index + 1}. ${book.title.padEnd(45)} | ${book.author.padEnd(25)} | ${book.publicationYear}` +
        "\x1b[37m",
    );
  });
}

export function searchBook(title?: string): void {
  if (!title) {
    listBooks();
    return;
  }

  const result = books.filter((book) =>
    book.title.toLowerCase().includes(title.toLowerCase()),
  );

  console.log(`\n=== SEARCH RESULT: "${"\x1b[32m" + title + "\x1b[37m"}" ===`);

  if (result.length === 0) {
    console.log("No matching books");
    return;
  }

  result.forEach((book, index) => {
    console.log(
      "\x1b[32m" +
        `${index + 1}. ${book.title.padEnd(45)} | ${book.author.padEnd(25)} | ${book.publicationYear}` +
        "\x1b[37m",
    );
  });
}
