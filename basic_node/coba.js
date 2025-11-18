// console.log('test');

console.log('Halo aku coba'); // ini bisa di cetak di tempat dia di require.

const nama = 'naufal';

const cetakNama = (nama) => `Hi, nama saya ${nama}`;

class Orang {
    constructor() {
        console.log('Objek orang telah dibuat!');
    }
}

module.exports = {nama, cetakNama, Orang};