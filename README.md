# Rencana Belajar NodeJS

## 1. Apa itu NodeJS?
> "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine."

> "Node.js is an asynchronous event-driven JavaScript runtime, designed to build scalable network applications."

NodeJS Sering disebut sebagai bahasa pemrograman, padaal sebenernya NodeJS itu adalah runtime, dimana kita bisa menjalankan script javascript di dalamnya.

### Apa itu Runtime?
Secara sederhana, **Runtime** adalah lingkungan atau tempat di mana kita bisa menjalankan atau mengeksekusi kode program kita.

### Ilustrasi: Dari Browser ke Server
Bayangkan JavaScript sebagai seekor ikan yang sangat cerdas. Selama ini, ikan tersebut hanya bisa hidup di dalam sebuah akuarium bernama **Browser Web** (seperti Chrome, Firefox). Di dalam akuarium ini, ada sebuah mesin oksigen canggih bernama **V8 Engine** yang membuat ikan bisa hidup dan beraktivitas. Namun, gerak-gerik ikan ini terbatas hanya di dalam akuarium. Ia tidak bisa berinteraksi dengan dunia luar, seperti menyentuh perabotan di kamar atau membuka pintu.

Ryan Dahl, pencipta NodeJS, melihat potensi besar dari ikan (JavaScript) dan mesin oksigen (V8 Engine) ini. Ia berpikir, "Bagaimana jika saya mengeluarkan V8 Engine dari akuarium dan memasangnya di sebuah tangki raksasa yang terhubung dengan seluruh ruangan (Sistem Operasi)?"

Itulah yang dia lakukan. Dengan "mengeluarkan" V8 Engine dari browser, JavaScript kini bisa berjalan di lingkungan server atau komputer lokal. Hasilnya, JavaScript tidak lagi terbatas. Ia bisa melakukan hal-hal yang sebelumnya tidak mungkin, seperti:
- Mengakses dan memanipulasi file di komputer (**File System**).
- Membuat dan menjalankan server web.
- Berkomunikasi langsung dengan database.
- Mengakses sumber daya sistem operasi lainnya.

Inilah kelahiran **Node.js**: sebuah runtime yang memungkinkan JavaScript "berenang bebas" di luar browser.

### Karakteristik Utama NodeJS
- **Asynchronous & Event-Driven**: Operasi di NodeJS tidak saling menunggu. NodeJS menggunakan sistem "event" untuk memberitahu kapan sebuah tugas selesai, sehingga bisa mengerjakan tugas lain sambil menunggu.
- **Non-Blocking I/O**: Saat melakukan operasi I/O (Input/Output) seperti membaca file atau query database, NodeJS tidak akan berhenti dan menunggu. Thread utama tetap berjalan untuk melayani permintaan lain. Ini membuat NodeJS sangat efisien.
- **Single-Threaded but Highly Scalable**: NodeJS menjalankan kode JavaScript pada satu thread utama. Ini menyederhanakan pengembangan karena tidak perlu khawatir tentang masalah kompleks pada multi-threading. Skalabilitas tinggi dicapai berkat model non-blocking I/O dan event loop yang efisien menangani ribuan koneksi secara bersamaan.
- **Cross-Platform**: Kode NodeJS dapat berjalan di berbagai sistem operasi seperti Windows, macOS, dan Linux tanpa perlu diubah.
- **MIT License**: NodeJS bersifat open-source dengan lisensi MIT yang sangat permisif, artinya bebas digunakan untuk proyek komersial sekalipun.
- **NPM (Node Package Manager)**: Ini adalah "toko aplikasi" untuk NodeJS. NPM adalah repositori paket (library) JavaScript terbesar di dunia, memungkinkan developer untuk dengan mudah menambahkan fungsionalitas pada aplikasi mereka.

### Fitur Bawaan (Core Modules)
- **File System (`fs`)**: Modul untuk berinteraksi dengan file system, seperti membaca, menulis, mengubah, dan menghapus file.
- **HTTP/HTTPS**: Modul untuk membuat server web dan melakukan permintaan (request) ke server lain melalui protokol HTTP atau HTTPS.
- **REPL (Read-Eval-Print-Loop)**: Lingkungan interaktif di terminal untuk mengeksekusi kode JavaScript baris per baris. Sangat berguna untuk testing dan debugging cepat.
- **Console**: Menyediakan fungsionalitas logging ke terminal, mirip seperti `console` pada browser.
- **Crypto**: Menyediakan fungsionalitas kriptografi seperti hashing, enkripsi, dan dekripsi.
- **Buffer**: Untuk mengelola dan memanipulasi data biner (binary data).
- **Zlib**: Untuk kompresi dan dekompresi file menggunakan algoritma zlib.

> **Catatan**: Dokumentasi lengkap bisa dicek di nodejs.org.

---

## 2. Arsitektur NodeJS
> "Node.js is a runtime environment for executing JavaScript code."

Arsitektur NodeJS didesain untuk menangani banyak koneksi secara bersamaan dengan efisien. Komponen utamanya adalah:

1.  **V8 JavaScript Engine**: Mesin yang sama digunakan oleh Google Chrome. Tugasnya adalah mengkompilasi kode JavaScript menjadi kode mesin yang dapat dieksekusi oleh komputer dengan sangat cepat.
2.  **Libuv**: Library C++ yang fokus pada I/O asinkron. Inilah "jantung" dari kemampuan non-blocking NodeJS. Libuv yang mengelola *worker threads* dan *event loop*.
3.  **Event Loop**: Ini adalah inti dari model konkurensi NodeJS. Event Loop adalah sebuah proses single-thread yang terus-menerus memeriksa "antrian event". Jika ada operasi I/O yang selesai (misalnya, file selesai dibaca), Event Loop akan mengambil *callback function* yang terkait dan menjalankannya.
4.  **Node.js Bindings & API**: Lapisan perantara yang ditulis dalam C++ untuk "menghubungkan" kode JavaScript Anda dengan fungsionalitas level sistem operasi yang disediakan oleh Libuv (seperti akses file dan jaringan).

**Alur Kerja Sederhana:**
1.  Aplikasi NodeJS menerima permintaan (misalnya, request HTTP).
2.  Permintaan tersebut didorong ke Event Loop.
3.  Jika permintaan tersebut adalah operasi non-blocking (seperti query database), Event Loop akan mendelegasikannya ke *worker thread* yang dikelola oleh Libuv.
4.  Event Loop tidak menunggu dan langsung siap menerima permintaan baru.
5.  Ketika *worker thread* selesai, ia akan menempatkan *callback* ke dalam antrian event.
6.  Event Loop mengambil *callback* tersebut dan menjalankannya, lalu mengirimkan hasilnya kembali ke klien.

---

## 3. Instalasi, Konfigurasi, dan Menjalankan NodeJS
*   **Instalasi**: Unduh installer dari situs resmi NodeJS. Disarankan mengunduh versi **LTS (Long Term Support)** karena lebih stabil. Instalasi ini sudah termasuk NPM.
*   **Verifikasi Instalasi**: Buka terminal atau command prompt, lalu jalankan `node -v` dan `npm -v` untuk memastikan NodeJS dan NPM sudah terpasang.
*   **Menjalankan File**: Buat file JavaScript (misal: `app.js`), lalu jalankan dari terminal dengan perintah `node app.js`.

---

## 4. NodeJS Module System
> "**Modules** adalah sekumpulan code yang dapat digunakan kembali, dengan antarmuka yang terdefinisi."
> "**Node Modules** adalah fungsionalitas yang simpel ataupun kompleks yang tersimpan di dalam sebuah file javascript, yang dapat kita gunakan kembali pada aplikasi node js."

NodeJS menggunakan sistem modul **CommonJS**. Anda dapat memecah kode menjadi beberapa file (modul) agar lebih terstruktur.
Di dalam NodeJS terdapat 3 tipe modules:
1. **Core Modules** = Modul bawaan Node.js yang sudah tersedia saat instalasi dan bisa langsung digunakan. Contoh: `http`, `fs`, `path`.
2. **Lokal Modules** = Modul yang kita buat sendiri di dalam proyek. Biasanya berupa file JavaScript yang kita ekspor untuk digunakan di file lain.
3. **Third Party Modules** atau **NPM Modules** = Modul yang dibuat oleh komunitas dan diinstal dari repositori NPM menggunakan perintah `npm install`. Contoh: `express`, `lodash`, `nodemon`.

contoh pemanggilan module:
```javascript

```

*   **`require()`**: Fungsi untuk mengimpor modul lain, dengan urutan pencarian dari core modules (jika ada), lokal modules, baru kemudian jika kedua tersebut tidak ada dia akan mencari ke third party modules (npm).
*   **`module.exports`**: Objek khusus untuk menentukan bagian mana dari sebuah modul yang ingin diekspor (disediakan untuk digunakan oleh modul lain).

---

## 5. NPM (Node Package Manager)
NPM adalah manajer paket bawaan NodeJS.

Namun sejatinya pada saat ini NPM telah berkembang dan menjadi sesuatu yang lebih besar lagi, dan sudah diakuisisi oleh GitHub, menjadi platform open source yang menyimpan project-project yang dapat dijadikan module untuk membantu pengembangan aplikasi NodeJS.

Sekarang, dalam konteks yang lebih luas:
npm, Inc. adalah perusahaan yang didirikan pada tahun 2014 dan diakuisisi oleh GitHub pada tahun 2020. npm merupakan bagian penting dari komunitas JavaScript dan membantu mendukung salah satu ekosistem pengembang terbesar di dunia.
npm memiliki beberapa peran utama:
-   **Manajer Paket (Package Manager)**: npm adalah manajer paket untuk Node.js. Dibuat pada tahun 2009 sebagai proyek open source untuk membantu pengembang JavaScript berbagi modul kode yang dikemas dengan mudah.
-   **Registry npm**: Ini adalah koleksi publik berisi paket-paket kode sumber terbuka (open-source) untuk Node.js, aplikasi web front-end, aplikasi seluler, dan berbagai kebutuhan lainnya dalam komunitas JavaScript.
-   **Klien Baris Perintah (Command Line Client)**: Ini adalah alat baris perintah yang memungkinkan pengembang untuk menginstal paket dari Registry dan mempublikasikan paket mereka sendiri.  


*   **`package.json`**: File konfigurasi proyek yang berisi metadata (nama, versi, dll.) dan daftar dependensi (paket yang dibutuhkan). Dibuat dengan `npm init`. Dalam package.json ini terdapat sebuah fitur yang dapat meringkas perintah ke command line, namanya adalah scripts. Script ini fungsinya untuk menyingkat sebuah perintah untuk terminal, misal perintah "node app.js" ini disingkat menjadi "npm start", dan ini sangat digunakan misal untuk menjalankan beberapa perintah pengujian yang membutuhkan penulisan yang panjang, bisa gunakan script ini untuk mempersingkat, nah jika sintaks scriptnya itu bukan hal yang standar, seperti start dan test, maka cara panggilnya itu ditambah dengan "run", contohnya "npm run dev" seperti itu. Selain itu, di dalam package.json ini juga terdapat dependencies yang tugasnya untuk merincikan module-module yang telah diinstall melalui npm, yang berarti menunjukkan bahwa aplikasi tersebut bergantung pada dependencies ini.
*   **`npm install <nama-paket>`**: Perintah untuk mengunduh dan menginstal paket dari repositori NPM.
*   **`node_modules`**: Folder tempat semua paket yang diinstal disimpan.

---

## 6. Membuat Aplikasi NodeJS Sederhana
Contoh membuat server web sederhana yang menampilkan "Hello World".

**File `server.js`:**
```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

**Cara Menjalankan:**
1.  Simpan kode di atas sebagai `server.js`.
2.  Buka terminal di direktori yang sama.
3.  Jalankan `node server.js`.
4.  Buka browser dan akses `http://127.0.0.1:3000`.