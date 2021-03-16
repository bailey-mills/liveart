require('dotenv').config();
const config = {  
    user: process.env.USER,
    password:process.env.PASSWORD,
    server: process.env.SERVER,
    database:process.env.DATABASE,
    "options": {
        "encrypt": true,
        "enableArithAbort": true
        }
};  

module.exports = config;