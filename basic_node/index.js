// Urutan import module harus seperti ini.

// const fs = require('fs'); // core modules
// const cetakNama = require('./lokalModule.js'); // local modules
// const moment = require('moment'); // third party modules / npm modules / node_modules

// console.log('Haloo pall');

// console.log(window); // ini akan menghasilkan error karena window hanya ada di browser, tidak ada di dalam node.

const {nama, cetakNama, Orang} = require('./coba') // dan requirenya harus detail mengambil dengan destructuring dari apa yang sudah di export.

// console.log('Halo aku index'); // jika modal require doang dia bisa ambil log atau hasil eksekusi dari file coba.

// console.log(nama); // tapi gabisa mengambil variabel nama didalam file coba, harus di export terlebih dahulu.

// dengan ini jika sudah di pakai export.module di file coba, kemudian require telah di tangkap dalam variabel destructuring, maka variabel nama sudah bisa dicetak bawaan atau kiriman dari file coba.js
console.log(nama);

console.log(cetakNama(nama)); // termasuk fungsi yang ada di file coba, dan mencetak nama dari sana juga.

console.log(new Orang()); 