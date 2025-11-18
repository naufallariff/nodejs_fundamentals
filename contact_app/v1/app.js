const { saveContact, question } = require("./contact");

// 1. Kata Kunci `async`
// Dengan menambahkan `async` di depan sebuah fungsi, kita mengubahnya menjadi fungsi spesial.
// Fungsi ini sekarang secara otomatis akan mengembalikan sebuah Promise.
// Yang terpenting, `async` memungkinkan kita untuk menggunakan kata kunci `await` di dalamnya.
const main = async () => {
    console.log('========= PROGRAM PENCATATAN DIMULAI =========');

    // 2. Blok `try...catch`
    // Ini adalah mekanisme standar JavaScript untuk menangani error.
    // `try`: Program akan MENCOBA menjalankan semua kode di dalam blok ini.
    // `catch`: Jika ada error yang "dilempar" (thrown) di dalam blok `try`,
    //  eksekusi `try` akan berhenti dan program akan langsung loncat ke blok `catch`.    
    try {
        // 3. Kata Kunci `await`
        // `await` hanya bisa digunakan di dalam fungsi `async`.
        // `await` akan "menjeda" eksekusi fungsi `main` di baris ini.
        // Ia akan menunggu sampai Promise yang dikembalikan oleh `question()` selesai (settled).
        const name = await question('Masukkan nama anda: ');

        // === Skenario Sukses (Promise di-resolve) ===
        // a. `question()` mengembalikan Promise.
        // b. `await` menunggu... Pengguna mengetik "Naufal" lalu Enter.
        // c. Di dalam `question()`, `resolve("Naufal")` dipanggil.
        // d. `await` melihat Promise sudah terpenuhi (fulfilled) dan "membuka" nilainya.
        // e. Nilai "Naufal" kemudian dimasukkan ke dalam variabel `name`.
        // f. Eksekusi fungsi `main` berlanjut ke baris berikutnya.

        // === Skenario Gagal (Promise di-reject) ===
        // a. `question()` mengembalikan Promise.
        // b. `await` menunggu... Pengguna menekan Ctrl+C.
        // c. Di dalam `question()`, event 'close' terpicu dan `reject('Input dibatalkan...')` dipanggil.
        // d. `await` melihat Promise ditolak (rejected). Alih-alih mengembalikan nilai,
        //    `await` akan MELEMPAR (THROW) nilai yang ada di dalam `reject` sebagai sebuah error.
        // e. Karena ada error yang dilempar di dalam blok `try`, eksekusi langsung loncat ke `catch`.

        const age = await question('Masukkan umur anda: ');
        const email = await question('Masukkan email anda: ');
        const mobilePhone = await question('Masukkan nomor telepon anda: ');
        
        saveContact(name, age, email, mobilePhone);

    } catch (error) {
        // 4. Menangkap Error dari `reject`
        // Variabel `error` di sini akan berisi apa pun yang "dilempar" dari blok `try`.
        // Dalam skenario gagal di atas, `await` melempar nilai dari `reject`,
        // yaitu string 'Input dibatalkan oleh pengguna.'.
        // Oleh karena itu, `error` di sini akan berisi string tersebut.
        // Inilah "jembatan" yang menghubungkan `reject()` dari sebuah Promise
        // dengan blok `catch` dalam sintaks `async/await`.
        console.log('\nTerjadi kesalahan:', error);
    } finally {
        console.log('========= PROGRAM PENCATATAN SELESAI =========');
    }

    /*
    INI ADALAH CARA LAIN, YAITU PROMISE CHAINNING, METODE YANG RIBET... DAN TIDAK KITA GUNAKAN.

    console.log('========= PROGRAM PENCATATAN DIMULAI =========');
    // Kita mulai dengan Promise pertama untuk mendapatkan nama.
    question('Siapa nama Anda? ')
        .then((name) => {
            // Di sini, kita punya 'name'.
            // Kita kembalikan Promise baru (dari pertanyaan berikutnya).
            // Ketika Promise ini selesai, ia akan memberikan 'age'.
            // Kita gabungkan 'name' dan 'age' dalam sebuah array untuk diteruskan.
            return Promise.all([name, question('Berapa usia Anda? ')]);
        })
        .then(([name, age]) => {
            // Di sini, kita menerima array berisi [name, age].
            // Kita teruskan lagi ke rantai berikutnya bersama dengan hasil pertanyaan email.
            return Promise.all([name, age, question('Masukkan email anda: ')]);
        })
        .then(([name, age, email]) => {
            // Di sini, kita menerima array berisi [name, age, email].
            // Terakhir, kita teruskan semuanya bersama hasil pertanyaan nomor HP.
            return Promise.all([name, age, email, question('Masukkan nomor telepon anda: ')]);
        })
        .then(([name, age, email, mobilePhone]) => {
            // Di blok .then() terakhir ini, kita akhirnya memiliki SEMUA data.
            // Sekarang adalah waktu yang tepat untuk memanggil saveContact.
            saveContact(name, age, email, mobilePhone);
            console.log('Terima kasih atas semua jawabannya, data sedang disimpan....');
        })
        .catch((error) => {
            // Jika ada satu saja Promise yang di-reject (misal: Ctrl+C),
            // eksekusi akan langsung loncat ke sini.
            console.error('\nTerjadi kesalahan:', error);
        })
        .finally(() => {
            // Penting: Tutup interface setelah semua Promise selesai
            console.log('========= PROGRAM PENCATATAN SELESAI =========');
        });
    */

}

main()