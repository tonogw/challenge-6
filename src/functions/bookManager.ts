// Tugas 3: Implementasikan fungsi-fungsi manajemen buku

import { Book, ScreenField } from "../types";
import { books } from "../data/books";
import { moveDot } from "../types";

// Fungsi addBook
// Fungsi ini digunakan untuk menambahkan buku baru ke dalam koleksi
// Parameter yang dibutuhkan: data buku sesuai tipe Book
// Fungsi ini tidak mengembalikan nilai (void)
// Petunjuk: pikirkan bagaimana cara menambahkan buku ke array yang sudah disediakan
export function addBook(book: Book): void {
  books.push(book);
}

// export function clearResultArea(): void {
//   for(let resultRow =7; resultRow <=19; resultRow++) {
//     moveDot(resultRow, 1);
//     process.stdout.write(" ".repeat(80));
//   }
// }

export function clearResultArea(): void {
  for (let row = 7; row <= 19; row++) {
    moveDot(row, 1);

    process.stdout.write(" ".repeat(80));
  }
}

// List Books Header
function renderBookHeader(): void {
  // moveDot(7, 1);
  // process.stdout.write("BOOK TITLE".padEnd(48) + "AUTHOR".padEnd(27) + "YEAR");
  // moveDot(8, 1);
  // process.stdout.write(" ".repeat(80));
  drawBookHeader();
}

function renderBookRows(records: Book[]): void {
  records.forEach((book, index) => {
    moveDot(9 + index, 1);
    process.stdout.write(
      "\x1b[32m" +
        `${book.title.padEnd(45)} | ${book.author.padEnd(25)} | ${book.publicationYear}` +
        "\x1b[37m",
    );
  });
}

function showNoMatch(): void {
  moveDot(9, 27);
  process.stdout.write("\x1b[31m" + "*** NO MATCHING RECORD ***" + "\x1b[37m");
}
// Fungsi listBooks
// Fungsi ini digunakan untuk menampilkan semua buku yang tersimpan
// Tidak memerlukan parameter
// Fungsi ini tidak mengembalikan nilai (void)
// Petunjuk: pikirkan cara menampilkan data buku dengan format yang mudah dibaca
export function listBooks(): void {
  renderBookHeader();
  renderBookRows(books);

  // moveDot(7, 1);
  // process.stdout.write("BOOK TITLE".padEnd(48) + "AUTHOR".padEnd(27) + "YEAR");

  // moveDot(8, 1);
  // process.stdout.write("_".repeat(80));
  // books.forEach((book, index) => {

  // moveDot(9 + index, 1);

  // process.stdout.write(
  //   "\x1b[32m" +
  //     `${book.title.padEnd(45)} | ${book.author.padEnd(25)} | ${book.publicationYear}` +
  //     "\x1b[37m",
  // );
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
    showNoMatch();

    return;
  }

  renderBookHeader();
  // moveDot(7, 1);
  // process.stdout.write(
  //   "BOOK TITLE".padEnd(48) + "AUTHOR".padEnd(27) + "YEAR",
  // );
  // moveDot(8, 1);
  // process.stdout.write("-".repeat(80));

  // result.forEach((book, index) => {
  renderBookRows(result);
  // moveDot(9 + index, 1);
  // process.stdout.write(
  //   "\x1b[32m" +
  //     `${book.title.padEnd(45)} | ${book.author.padEnd(25)} | ${book.publicationYear}` +
  //     "\x1b[37m",
  // );
}

// Utilites
// untuk pindah koordinat, hapus result area, gconstruct screen
export function clearScreen(): void {
  process.stdout.write("\x1Bc");
}

// ScreenName
// untuk membuat display screen

const layoutHeader: ScreenField[] = [
  // Header
  { row: 1, col: 1, text: "©TONOGW" },
  { row: 1, col: 25, text: "SIMPLE BOOK MANAGEMENT SYSTEM" },
  { row: 1, col: 69, text: "TERMID: 2680" },
  { row: 2, col: 1, text: "=".repeat(80) },
];

const layoutMenu: ScreenField[] = [
  // Screen name
  { row: 4, col: 36, text: "MAIN MENU" },
  { row: 5, col: 25, text: "_".repeat(29) },

  // Selection user input
  { row: 7, col: 25, text: "1. INQUIRY" },
  { row: 8, col: 25, text: "2. ADD BOOK" },
  { row: 9, col: 25, text: "3. HELP" },
  { row: 10, col: 25, text: "4. EXIT" },
  {
    row: 13,
    col: 25,
    text: "SELECTION . . . : " + "\x1b[32m" + "_" + "\x1b[37m",
  },
];

const layoutFooter: ScreenField[] = [
  // Footer / Shortcut keys
  { row: 20, col: 1, text: "PF1=Help" },
  { row: 20, col: 20, text: "PF2=Main Menu" },
  { row: 20, col: 42, text: "PF3=Search Book" },
  { row: 20, col: 67, text: "ENTER=Continue" },
];

const layoutInquiry: ScreenField[] = [
  // Search Book by title?
  { row: 4, col: 1, text: "SEARCH BOOK BY TITLE :" },
  { row: 5, col: 1, text: "_".repeat(80) },
  { row: 4, col: 24, text: "\x1b[32m" + "_".repeat(40) + "\x1b[37m" },
];

const layoutAdd: ScreenField[] = [
  { row: 4, col: 38, text: "ADD BOOK" },
  { row: 5, col: 25, text: "_".repeat(29) },

  { row: 7, col: 25, text: "Book Title . . . . :" },
  { row: 8, col: 25, text: "Author Name  . . . : " },
  { row: 9, col: 25, text: "Publication Year . : " },
];

const layoutHelp: ScreenField[] = [
  { row: 4, col: 38, text: "HELP" },
  { row: 5, col: 25, text: "_".repeat(29) },

  { row: 7, col: 25, text: "F1 = HELP " },
  { row: 8, col: 25, text: "F2 = MAIN MENU " },
  { row: 9, col: 25, text: "F3 = SEARCH books" },
  { row: 11, col: 1, text: "RECOMMENDED FONT:" },
  { row: 12, col: 1, text: "Menlo 14" },
  { row: 13, col: 1, text: "FOR MAC:" },
  { row: 14, col: 1, text: "Terminal -> Settings -> Font" },
  { row: 15, col: 1, text: "HELP" },
];

const layoutBookHeader: ScreenField[] = [
  { row: 7, col: 1, text: "BOOK TITLE" },
  { row: 7, col: 49, text: "AUTHOR" },
  { row: 7, col: 77, text: "YEAR" },
  { row: 8, col: 1, text: "_".repeat(80) },
];

export function drawFields(fields: ScreenField[]): void {
  fields.forEach((item) => {
    moveDot(item.row, item.col);
    process.stdout.write(item.text);
  });
}

// drawMenu()
export function drawMenu(): void {
  clearScreen();

  drawFields(layoutHeader);
  drawFields(layoutMenu);
  drawFields(layoutFooter);

  moveDot(13, 43);
}

// drawInquiry() result area at row 9 - 19 (10 rows)
export function drawInquiry(): void {
  clearScreen();

  drawFields(layoutHeader);
  drawFields(layoutInquiry);
  drawFields(layoutFooter);

  // Cursor position at input field
  moveDot(4, 24);
}

// drawAdd()
export function drawAdd(): void {
  clearScreen();

  drawFields(layoutHeader);
  drawFields(layoutAdd);
  drawFields(layoutFooter);
}

// drawHelp()
export function drawHelp(): void {
  clearScreen();

  drawFields(layoutHeader);
  drawFields(layoutHelp);
  drawFields(layoutFooter);
}

// drawBookHeader()
export function drawBookHeader(): void {
  drawFields(layoutBookHeader);
}
