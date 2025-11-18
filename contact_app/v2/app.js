const { saveContact, question } = require("./contact");

const main = async () => {
    try {
        const name = await question('Masukkan nama anda: ');
        const age = await question('Masukkan umur anda: ');
        const email = await question('Masukkan email anda: ');
        const mobilePhone = await question('Masukkan nomor telepon anda: ');
        
        saveContact(name, age, email, mobilePhone);
    } catch (error) {
        console.log('\nTerjadi kesalahan:', error);
    }
}

main()