const DbDrive = require('../dal/dbDrive');

let dbOps = new DbDrive();

module.exports = class AnalyticsPageController {
    //let result = await dbOps.executeQuery('SELECT * from Province');
    //res.json(result);


    // ------------------
    // Artist Tab Methods
    // ------------------

    getAge = async (req, res)=> {
        // SELECT U.Birthday FROM [dbo].[Transaction] T JOIN [dbo].[User] U ON U.ID = T.BuyerID WHERE U.ID = ___;
    }
    
    getLocation = async (req, res)=> {
        
    }
    
    getTagsArtist = async (req, res)=> {
        
    }
    
    getTagsGlobal = async (req, res)=> {
        
    }

    getAverageViewers = async (req, res)=> {
        
    }

    getAverageRevenue = async (req, res)=> {
        
    }

    getAverageProductValue = async (req, res)=> {
        
    }

    getAverageEventValue = async (req, res)=> {
        
    }


    

    // -----------------
    // Buyer Tab Methods
    // -----------------



    // --------------------
    // Social Media Methods
    // --------------------

    
}