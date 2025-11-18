const validator = require('validator');

const data = {
    email: 'naufal@gmail.com',
    mobilePhone: '080513578414',
    numeric: '0001344773920082'
};
const { email, mobilePhone, numeric } = data;

const validate = () => {
    return {
        resultEmail: validator.isEmail(email), // untuk cek email, bisa benar bahkan jika nama domainnya tidak ada seperti .c ini false.
        resultMobilePhone: validator.isMobilePhone(mobilePhone, 'id-ID'), // untuk cek nomor hape, bahkan dia dapat mengetahui apakah nomor ini asli atau tidak.
        resultNumeric: validator.isNumeric(numeric) // untuk cek nomor pada string, apakah semua string ini adalah numeric atau bukan.
    }
};
const { resultEmail, resultMobilePhone, resultNumeric } = validate();

module.exports = {
    email, 
    mobilePhone,
    numeric,
    resultEmail,
    resultMobilePhone,
    resultNumeric
};