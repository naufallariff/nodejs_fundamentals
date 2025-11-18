const yargs = require('yargs');
const { saveContact} = require('./contact');

// secara default yargs itu berisi begini .command(cmd, desc, [builder], [handler])

// ini merupakan cara manual untuk meengambil parameter command line
// console.log(process.argv[2]);

// ini menggunakan modul yargs
// console.log(yargs.argv);

// kita bisa build dengan defaull buildnyaa .command(cmd, desc, [builder], [handler])
// yargs.command(
//     'add',
//     'Menambahkan kontak baru',
//     () => {},
//     (argv) => {
//         console.log(argv.nama);
//     }
// );
// ini adalah  dasar penulisan aatau build yargs-nya

// Kemudian ini cara untuk membuat atau build yargs command lebih detail dengan object
yargs.command({
    command: 'add',
    describe: 'Menambahkan kontak baru',
    builder: {
        name: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        },
        age: {
            describe: 'Umur',
            demandOption: true,
            type: 'number'
        },
        email: {
            describe: 'Email',
            demandOption: true,
            type: 'string'
        },
        mobilePhone: {
            describe: 'Nomor telepon',
            demandOption: true,
            type: 'string'
        }
    }
    ,
    handler: (argv) => {
        /*
        const contact = {
            name: argv.name,
            age: argv.age,
            email: argv.email,
            mobilePhone: argv.mobilePhone
        }
        console.log(contact);
        
        dan outputnya menjadi object json:
        {
            name: 'Naufal',
            age: 22,
            email: 'naufal@gmail.com',
            mobilePhone: '0896615277'
        }
        */
        saveContact(argv.name, argv.age, argv.email, argv.mobilePhone);
    }
})


yargs.parse();
