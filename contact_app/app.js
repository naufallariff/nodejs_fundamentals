const { saveContact, question } = require("./contact");

const main = async () => {
    const name = await question('Masukkan nama anda: ');
    const age = await question('Masukkan umur anda: ');
    const email = await question('Masukkan email anda: ');
    const mobilePhone = await question('Masukkan nomor telepon anda: ');
    
    saveContact(name, age, email, mobilePhone);
}

main()