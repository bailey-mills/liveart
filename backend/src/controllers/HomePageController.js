const DbDrive = require('../dal/dbDrive');

let dbOps = new DbDrive();

module.exports = class HomePageController {

    getProvinces = async (req, res)=> {
          
        let result = await dbOps.executeQuery('SELECT * FROM Province');
    
        return res.json(result[0])
           
    }
    
    recommendEvents = async (req, res) => {
        //recommend algorithm comes later

        let result = await dbOps.executeQuery('SELECT * FROM Event');
       
            return res.json(result[0])
    }

    activeEvents = async (req, res) => {

         let result = await dbOps.executeQuery('SELECT * from Event Where StartTime < CURRENT_TIMESTAMP AND EndTime > CURRENT_TIMESTAMP');
         
         return res.json(result[0]);
    }

}





