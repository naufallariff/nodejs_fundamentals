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

const question = (questionText) => {
    return new Promise((resolve, reject) => {
        rl.question(questionText, (answer) => {
            resolve(answer);
        });
        rl.on('close', () => {
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
    rl.close();
}

module.exports = {
    question,
    saveContact
}