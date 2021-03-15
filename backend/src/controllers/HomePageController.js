const DbDrive = require('../dal/dbDrive');

let dbOps = new DbDrive();

module.exports = class HomePageController {

    getProvinces = async (req, res)=> {
          
        let result = await dbOps.executeQuery('SELECT * from Province');
    
        res.json(result)
           
    }
    
    recommendEvents = async (req, res) => {

        let result = await dbOps.executeQuery('SELECT * from Event');
       
            res.json(result)
    }

}





