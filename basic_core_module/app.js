// CORE MODULE

// File System
const fs = require('fs');

// console.log(fs); // untuk melihat detail fungsi bawaan modul

// ===================
// Write File
// ===================

// fs.writeFileSync('test.txt', 'Hello world s\ecara syncronous'); // ini bisa membuat file jika file tidak ada, namun tidak bisa membuat folder, karena folder beda lagi.
// fs. mkdirSync() // ini baru sintaks untuk membuat direktori.

// namun untuk membuatnya lebih baik kita gunakan try catch

// Sycncronous Example
try {
    
    // fs.mkdirSync('data'); // dan ini gabisa di ulang, artinya gabisa niban folder yang sudah ada
    fs.writeFileSync('data/FileSync.txt', 'Hello world secara Syncronous');
    // seperti ini urutan untuk membuat folder dan file serta isi filenya.
} catch (err) {
    console.log(err); // error ini untuk menangani jika ada error, karena dia syncroous, kalo async udah ada callback
}

// Asyncronous Example
fs.writeFile('data/FileAsync.txt', 'Hello world secara Asyncronous', err => {if (err) throw err}); // dia akan niban isi test.txt di folder data., dan akan return error jika error.

// ===================
// Read File
// ===================

// Syncronous
try {
    const data = fs.readFileSync('data/FileSync.txt', 'utf-8'); // butuh pakai UTF-8 untuk encoding, kalo ga nnti bentuk data nya masih buffer.
    console.log(`Isi file sync adalah: ${data}`);
} catch (err) {
    console.log(err);
}

// Asyncronous
fs.readFile('data/FileAsync.txt', 'utf-8', (err, data) => {
    if (err) throw err;  // ini untuk melempar error, seperti return
    console.log(`Isi file async adalah: ${data}`);
});

// ===================
// Readline
// ===================
// Readline adalah sebuah module untuk membaca inputan dari command line.
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ini adalah sebuah contoh program kecil untuk melakukan input nama dan umur seseorang ke file json secara asyncronous
setTimeout(() => {
    rl.question('Masukkan nama anda: ', (nama) => {
        rl.question('Masukkan umur anda: ', (umur) => {
            const newContact = {nama, umur};
            fs.readFile('data/contacts.json', 'utf-8', (err, data) => {
                const contacts = err ? [] : JSON.parse(data); // jika error kembalikan array kosong
                contacts.push(newContact); // lakukan push ke contact yang bersifat array dari readFile si contact.json dengan isi dari newContact baru.

                // fungsi async write file harus ada di dalam sini, karena dia async jadi bisa bugg menulis dilakukan duluan dibanding baca. untuk mempertimbangkan itu, fungsinya dimasukkan kedlam proses read sebagai callback.
                fs.writeFile('data/contacts.json', JSON.stringify(contacts, null, 4), err => { // 4 ini sebagai 4 kali space untuk kerapihan file json
                    if (err) throw err;
                    console.log('Data berhasil disimpan');
                    rl.close();
                });
            });
        });
    });
}, 2000);
    