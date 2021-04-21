const DbDrive = require('../dal/dbDrive');
let dbDrive = new DbDrive();

module.exports = class GeneralController {
    getProvinces = async (req, res)=> {
        let result = await dbDrive.executeQuery('SELECT * FROM [Province]');    
        return res.json(result[0]);
    }
    
    getTags = async (req, res) => {
        let data = await dbDrive.executeQuery("SELECT * FROM [Tag]");        
        return res.send(data[0]);
    }
    
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

    getCategories = async (req, res) => {
        let data = await dbDrive.executeQuery("SELECT * FROM [Category]");
        return res.send(data[0]);
    }
}