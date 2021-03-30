// let users = await dbOps.executeQuery("SELECT * FROM [dbo].[User]");
// let test;
// let test2 = 'hi';
// let test3 = 3;

// console.log(typeof test === 'undefined');
// console.log(typeof test2 === 'string');
// console.log(typeof test3 === 'number');

module.exports = class QueryBuilder {

    insertInto = (table, columns, values) => {
      let query = `INSERT INTO ${table} ( ${columns.join(', ')} ) VALUES`;

        let querifiedValues = [];
          // single row insert
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
              query += ` ( ${querifiedValues.join(', ')} )`;
            }
            // multi-row insert
          else {
                for(let i = 0; i < values.length; i++){
                    let row = values[i];
                    row.map((field) => {
                      //validate fields
                      if (typeof field === 'string' && field !== 'NULL') {
                        querifiedValues.push("'" + field + "'");
                      } else {
                        querifiedValues.push(field);
                      }
                    });

                      if(i == values.length - 1){
                        query += ` ( ${querifiedValues.join(', ')} )`;
                      }
                      else {
                        query += ` ( ${querifiedValues.join(', ')} ), `;
                      }
                      querifiedValues = [];
                }
          }
                return query;
    }

      
    

    getFrom(table, columns, condition, orderBy){
      let query = `SELECT ${columns.join(', ')} FROM ${table}`;
      if (condition !== undefined) {query += ` WHERE ${condition}`};
      if (orderBy !== undefined) {query += ` ORDER BY ${orderBy}`};
      return query;
      
    }


    getFromjoin(tables, columns, joinQueryPairs, condition, orderBy){
      let query = `SELECT ${columns.join(', ')} FROM ${tables.join(', ')} `;
      joinQueryPairs.map((pair) => {
        query += ` INNER JOIN ${pair.joinTable} ON ${pair.referenceKeys} `;
      });
      if (condition !== undefined) query += ` WHERE ${condition}`;
      if (orderBy !== undefined) query += ` ORDER BY ${orderBy}`;
      return query;     

    }



      //   queryDB.updateTable(
      //   'User',
      //   [{ column: 'email', value: 'test@email.com' }],
      //   `username = 'userb'`
      // );
    updateTable(table, updatePairs, condition){
      let validatedUpdates = [];
      let stringifiedUpdates = [];
      let query = `UPDATE ${table} SET `;
  
      updatePairs.map((pair) => {
        if (typeof pair.value === 'string' && pair.value !== 'NULL') {
          pair.value = "'" + pair.value + "'";
        }
        validatedUpdates.push(pair);
      });
  
      validatedUpdates.map((pair) => {
        stringifiedUpdates.push(` ${pair.column} = ${pair.value}`);
      });
  
      query += stringifiedUpdates.join(', ');
  
      if (condition !== undefined) query += ` WHERE ${condition}`;
  
      return query;      

    }

    deleteFrom(table, column, value){
      let query = `DELETE FROM ${table} WHERE ${column} = '${value}' `;
      return query;

    }



}