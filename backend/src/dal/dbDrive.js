const sql = require('mssql');
const sha256 = require('js-sha256');
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

    Encrypt(password){

        return sha256.hmac(process.env.SECRET, password);
  
    }

}
 

module.exports = DbDrive;