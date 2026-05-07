// Tugas 2: Buat array untuk menyimpan koleksi buku
// Array ini akan digunakan sebagai penyimpanan data sementara selama aplikasi berjalan
// Pertimbangkan tipe data yang tepat untuk array ini berdasarkan definisi Book yang sudah dibuat

import { Book } from "../types";

export const books: Book[] = [
  {
    title: "Building Microservices",
    author: "Sam Newman",
    publicationYear: 2015,
  },
];
