const config = require('./dbconfig');
var sql = require('mssql');
require('dotenv').config();

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
}
 

module.exports = DbDrive;