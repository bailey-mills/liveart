// let users = await dbOps.executeQuery("SELECT * FROM [dbo].[User]");
// let test;
// let test2 = 'hi';
// let test3 = 3;

// console.log(typeof test === 'undefined');
// console.log(typeof test2 === 'string');
// console.log(typeof test3 === 'number');

module.exports = class QueryBuilder {

    insertInto = (table, columns, values) => {
            let queryBase = `INSERT INTO ${table} ( ${columns.join(', ')} ) VALUES`;

            let querifiedValues = [];
            if (values.length == 1) {
              let row = values[0];
              row.map((field) => {
                //validate fields
                if (typeof field === 'string' && field !== 'NULL') {
                  querifiedValues.push("'" + field + "'");
                } else {
                  querifiedValues.push(field);
                }
              });
              queryBase += ` ( ${querifiedValues.join(', ')} )`;
            }

            // need to support array of values for bulk insert
            return queryBase;
    }
}