/**
 * @file GeneralController.js contains methods to provide common data for user selection
 * @author Shuang Liang, Bailey Mills
 * 
 */
const DbDrive = require('../dal/dbDrive');
let dbDrive = new DbDrive();

/**
 * @module GeneralController
 * 
 */
module.exports = class GeneralController {
    
    /**
     * @method getProvinces 
     * @description get all provinces
     * @returns {Array<Object>} - provinces
     */ 
    getProvinces = async (req, res)=> {
        let result = await dbDrive.executeQuery('SELECT * FROM [Province]');    
        return res.json(result[0]);
    }
    
    /**
     * @method getTags 
     * @description get all tags
     * @returns {Array<Object>} - tags
     */ 
    getTags = async (req, res) => {
        let data = await dbDrive.executeQuery(
            `SELECT T.ID, CONCAT(C.Name, ' - ', T.Name) AS 'Name'
                FROM [Tag] T
                JOIN [Category] C ON C.ID = T.CategoryID
                ORDER BY C.ID`
        );        
        return res.send(data[0]);
    }
    
    /**
     * @method getTagsSorted 
     * @description sort the tags
     * @returns {Array<Object>} - sorted tags
     */ 
    getTagsSorted = async (req, res) => {
        let result = [];
        let categories = await dbDrive.executeQuery("SELECT ID, Name FROM [Category]");

        let i = 0;
        for (i = 0; i < categories[0].length; i++) {
            let set = {
                Name: categories[0][i].Name,
                Tags: []
            }

            let curr = await dbDrive.executeQuery(`SELECT * FROM [Tag] WHERE CategoryID = ${categories[0][i].ID}`);
            let j = 0;
            for (j = 0; j < curr[0].length; j++) {
                let tag = {
                    ID: curr[0][j].ID,
                    Name: curr[0][j].Name
                }
                set.Tags.push(tag);
            }

            result.push(set);
        }

        return res.send(result);
    }

    /**
     * @method getCategories 
     * @description get all categories
     * @returns {Array<Object>} - sorted Categories
     */ 
    getCategories = async (req, res) => {
        let data = await dbDrive.executeQuery("SELECT * FROM [Category]");
        return res.send(data[0]);
    }
}