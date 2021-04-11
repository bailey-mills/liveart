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

    getCategories = async (req, res) => {
        let data = await dbDrive.executeQuery("SELECT * FROM [Category]");        
        return res.send(data[0]);
    }
}