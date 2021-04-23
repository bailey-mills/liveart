/**
 * @file dbDrive.js contains methods to execute SQL queries and encryption
 * @author Shuang Liang, Bailey Mills
 * 
 */
const sql = require('mssql');
const sha256 = require('js-sha256');
require('dotenv').config();
const config = require('./dbconfig');


/**
 * @module DbDrive
 * 
 */
class DbDrive {

    /**
     * @method executeQuery 
     * @description execute SQL query to apply CRUD operations
     * @param {string} - queryString 
     * @returns {string} - Query Result
     */
    async executeQuery(queryString) {

        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query(queryString);

            return result.recordsets;
        }catch(err){
            console.log(err);
        }

    }


    /**
     * @method Encrypt 
     * @description uses sha256 hasing algorithm to encryt plain text password
     * @param {string} - password 
     * @returns {string} - hashed password
     */
    Encrypt(password){

        return sha256.hmac(process.env.SECRET, password);
  
    }

}
 

module.exports = DbDrive;