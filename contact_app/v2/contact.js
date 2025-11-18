const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

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

const saveContact = (name, age, email, mobilePhone) => {
    const newContact = {name, age, email, mobilePhone};

    fs.readFile(filePath, 'utf-8', (err, data) => {
        const contacts = err ? [] : JSON.parse(data); // jika error kembalikan array kosong
        
        const duplicated = contacts.find(contact => contact.name === newContact.name);
        if(duplicated) {
            console.log(chalk.bgRed.whiteBright('Contact sudah terdaftar, gunakan nama lain!'));
            return false; 
        }
        if(age || age !== null) {
            if(age == 0) {
                console.log(chalk.bgRed.whiteBright('Umur tidak boleh 0!'));
                return false;
            }
            // validator.isNumeric() expects a string. Convert age to string first.
            if(!validator.isNumeric(String(age))) {
                console.log(chalk.bgRed.whiteBright('Umur harus berupa angka!'));
                return false;
            }
        }
        if(email) {
            if(!validator.isEmail(email)) {
                console.log(chalk.bgRed.whiteBright('Email tidak valid!'));
                return false;
            }
        }
        if(mobilePhone) {
            if(!validator.isMobilePhone(mobilePhone, 'id-ID')) {
                console.log(chalk.bgRed.whiteBright('Nomor telepon tidak valid!'));
                return false;
            }
        }
        
        contacts.push(newContact); // lakukan push ke contact yang bersifat array dari readFile si contact.json dengan isi dari newContact baru.

        // fungsi async write file harus ada di dalam sini, karena dia async jadi bisa bugg menulis dilakukan duluan dibanding baca. untuk mempertimbangkan itu, fungsinya dimasukkan kedlam proses read sebagai callback.
        fs.writeFile(filePath, JSON.stringify(contacts, null, 4), err => { // 4 ini sebagai 4 kali space untuk kerapihan file json
            if (err) throw err;
            console.log(chalk.bgGreen.white.bold('Data berhasil disimpan'));
        });
    });
}

module.exports = {
    saveContact
}