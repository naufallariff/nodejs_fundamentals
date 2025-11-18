const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dirPath = './data';
if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

const filePath = './data/contacts.json';
if(!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8');
}

if(fs.readFileSync(filePath, 'utf-8') == '') {
    fs.writeFileSync(filePath, '[]', 'utf-8');
}

// Fungsi 'question' ini adalah sebuah "pembungkus" (wrapper) untuk fungsi 'rl.question'
// yang aslinya menggunakan callback. Tujuannya adalah mengubahnya menjadi berbasis Promise,
// sehingga kita bisa menggunakan sintaks yang lebih modern dan mudah dibaca seperti async/await.
const question = (questionText) => {
    // 'new Promise()' adalah cara kita membuat sebuah objek Promise.
    // Promise ini menerima satu argumen: sebuah fungsi yang disebut "executor".
    // Executor ini langsung dijalankan dan menerima dua parameter fungsi: 'resolve' dan 'reject'.
    return new Promise((resolve, reject) => {

        // 'rl.question()' adalah fungsi asinkronus dari modul readline.
        // Ia akan menampilkan 'questionText' di terminal dan menunggu input dari pengguna.
        // Parameter kedua adalah sebuah "callback function" yang akan dieksekusi
        // HANYA SETELAH pengguna mengetik sesuatu dan menekan Enter.
        rl.question(questionText, (answer) => {
            // 'answer' adalah variabel yang berisi teks yang diketik oleh pengguna.
            // Setelah kita mendapatkan jawabannya, kita memanggil fungsi 'resolve()'.
            // Memanggil 'resolve(answer)' berarti kita "menepati janji" (Promise fulfilled).
            // Nilai 'answer' inilah yang akan menjadi hasil dari Promise ini
            // dan bisa ditangkap oleh 'await' di file app.js.
            resolve(answer);
        });

        // 'rl.on('close', ...)' adalah sebuah event listener.
        // Ia akan "mendengarkan" kejadian 'close' pada interface readline.
        // Kejadian 'close' ini biasanya terjadi ketika pengguna menekan Ctrl+C di terminal.
        rl.on('close', () => {
            // Jika kejadian 'close' terdeteksi, kita memanggil fungsi 'reject()'.
            // Memanggil 'reject()' berarti "janji tidak bisa ditepati" (Promise rejected).
            // Pesan error yang kita berikan di sini ('Input dibatalkan...') akan
            // "dilempar" sebagai error dan bisa ditangkap oleh blok 'catch' di app.js.
            reject('Input dibatalkan oleh pengguna.');
        });
    })
}

const saveContact = (name, age, email, mobilePhone) => {
    const newContact = {name, age, email, mobilePhone};

    fs.readFile(filePath, 'utf-8', (err, data) => {
        const contacts = err ? [] : JSON.parse(data); // jika error kembalikan array kosong
        contacts.push(newContact); // lakukan push ke contact yang bersifat array dari readFile si contact.json dengan isi dari newContact baru.

        // fungsi async write file harus ada di dalam sini, karena dia async jadi bisa bugg menulis dilakukan duluan dibanding baca. untuk mempertimbangkan itu, fungsinya dimasukkan kedlam proses read sebagai callback.
        fs.writeFile(filePath, JSON.stringify(contacts, null, 4), err => { // 4 ini sebagai 4 kali space untuk kerapihan file json
            if (err) throw err;
            console.log('Data berhasil disimpan');
        });
    });
}

module.exports = {
    question,
    saveContact
}