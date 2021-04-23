/**
 * @file queryBuilder.js contains methods to execute SQL queries and encryption
 * @author Shuang Liang, Bailey Mills
 * 
 */

/**
 * @module QueryBuilder
 * 
 */
module.exports = class QueryBuilder {
    
      /**
     * @method insertInto 
     * @description execute SQL Insert Query
     * @param {string} table - table name
     * @param {Array<string>} column - columns of the table
     * @param {Array<string>} value - actual
     * @returns {null} - None
     */  
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

      
    
      /**
     * @method getFrom 
     * @description execute SQL SELECT to get data from table
     * @param {string} table - table name
     * @param {Array<string>} columns - columns of the table
     * @param {string} codition - condition after WHERE clause
     * @param {string} orderBy - column used by ORDER BY clause
     * @returns {Array<Object>} - Data Rows from Table
     */ 
    getFrom(table, columns, condition, orderBy){
      let query = `SELECT ${columns.join(', ')} FROM ${table}`;
      if (condition !== undefined) {query += ` WHERE ${condition}`};
      if (orderBy !== undefined) {query += ` ORDER BY ${orderBy}`};
      return query;
      
    }


    /**
    * @typedef {object} joinQueryPairs
    * @prop {string} joinTables - table after JOIN clause
    * @prop {string} referenceKeys - JOIN foreign keys pair 
    */

      /**
     * @method getFromJoin 
     * @description execute SQL SELECT JOIN mutiple tables to get data from tables
     * @param {string} table - table name
     * @param {Array<joinQueryPairs>} joinQueryPairs - columns of the tables to JOIN
     * @param {string} codition - condition after WHERE clause
     * @param {string} orderBy - column used by ORDER BY clause
     * @returns {Array<Object>} - Data Rows from Table
     */ 
    getFromjoin(tables, columns, joinQueryPairs, condition, orderBy){
      let query = `SELECT ${columns.join(', ')} FROM ${tables.join(', ')} `;
      joinQueryPairs.map((pair) => {
        query += ` INNER JOIN ${pair.joinTable} ON ${pair.referenceKeys} `;
      });
      if (condition !== undefined) query += ` WHERE ${condition}`;
      if (orderBy !== undefined) query += ` ORDER BY ${orderBy}`;
      return query;     

    }



    /**
    * @typedef {object} updatePairs
    * @prop {string} column - column in table
    * @prop {string|number|null} value - actual value
    */

      /**
     * @method updateTable 
     * @description execute SQL UPDATE to update values in table
     * @param {Array<updatePairs>} updatePairs - acutal column to update and actual value
     * @param {Array<string>} condition - condtion after WHERE clause
     * @returns {null} - None
     */ 
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


    /**
     * @method deleteFrom 
     * @description execute SQL DELETE to delete row from a table
     * @param {string} table - table name
     * @param {string} column  - column condition after WHERE clause
     * @param {string} value = value condition 
     */ 
    deleteFrom(table, column, value){
      let query = `DELETE FROM ${table} WHERE ${column} = '${value}' `;
      return query;

    }



}