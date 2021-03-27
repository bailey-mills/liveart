const sql = require('mssql');
const bcrypt = require('bcrypt');
require('dotenv').config();
const config = require('./dbconfig');

class DbDrive {
    async executeQuery(queryString) {

        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query(queryString);

            return result.recordsets;
        }catch(err){
            console.log(err);
        }

    }

    async Encrypt(password){
            const hashedPassword = await bcrypt.hash(password, 10);

            return hashedPassword;

    
    }

}
 

module.exports = DbDrive;