const DbDrive = require('../dal/dbDrive');
const moment =  require('moment');

let dbOps = new DbDrive();

module.exports = class AnalyticsPageController {
    //let result = await dbOps.executeQuery('SELECT * from Province');
    //res.json(result);


    // ------------------
    // Artist Tab Methods
    // ------------------

    getAge = async (req, res)=> {
        /*
        SELECT U.Birthday FROM [dbo].[Transaction] T JOIN [dbo].[User] U ON U.ID = T.BuyerID WHERE U.ID = ___;
        */        
        // 18-24, 25-34, 45-54, 55-64, 65+
        var data = [0, 0, 0, 0, 0, 0];

        let result = await dbOps.executeQuery('SELECT U.Birthday FROM [dbo].[Bid] T JOIN [dbo].[User] U ON U.ID = T.UserID');
        if (result) {
            var i = 0;
            var now = moment();
            for (i = 0; i < result[0].length; i++) {
                // Calculate age
                var birthday = moment(result[0][i].Birthday);
                var age = now.diff(birthday, 'years');
                
                // Organize birthdays into groups and count them
                if (age >= 65) {
                    data[5]++;
                }
                else if (age >= 55) {
                    data[4]++;
                }
                else if (age >= 45) {
                    data[3]++;
                }
                else if (age >= 35) {
                    data[2]++;
                }
                else if (age >= 25) {
                    data[1]++;
                }
                else {
                    data[0]++;
                }
            }
            
        }

        // Format results
        let ret = {
            labels: ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
            data: data
        }

        res.json(ret);
    }
    
    getLocation = async (req, res)=> {
        
    }
    
    getTagsArtist = async (req, res)=> {
        /*
        SELECT TagID, COUNT(TagID) as 'Count' FROM [dbo].[ProductToTag] PT
            JOIN [dbo].[ProductToEvent] PE ON PE.ProductID = PT.ProductID
            JOIN [dbo].[SellerToEvent] SE ON SE.EventID = PE.EventID
            WHERE SE.UserID = ___
            GROUP BY PT.TagID;
        */
    }
    
    getTagsGlobal = async (req, res)=> {
        /*
        SELECT TagID, COUNT(TagID) AS 'Count' FROM [dbo].[ProductToTag] GROUP BY TagID;
        */
    }

    getAverageViewers = async (req, res)=> {
        /*
        
        */
    }

    getTotalRevenue = async (req, res)=> {
        /*
        
        */
    }

    getAverageProductValue = async (req, res)=> {
        /*
        
        */
    }

    getAverageEventValue = async (req, res)=> {
        /*
        
        */
    }


    

    // -----------------
    // Buyer Tab Methods
    // -----------------



    // --------------------
    // Social Media Methods
    // --------------------

    
}