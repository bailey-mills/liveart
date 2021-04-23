/**
 * @file dbconfig.js contains configuration variables for the datbase connection
 * @author Shuang Liang, Bailey Mills
 * 
 */
require('dotenv').config();


/**
 * @typedef {object} config
 * @prop {string} user - user of database 
 * @prop {string} password - user password
 * @prop {string} server - datavase server name
 */

/**
 * Database Configuration
 * @type {config}
 */
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