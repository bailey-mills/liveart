const DbDrive = require('../dal/dbDrive');
const moment =  require('moment');

let dbOps = new DbDrive();

module.exports = class AnalyticsPageController {
    //let result = await dbOps.executeQuery('SELECT * from Province');
    //res.json(result);


    // ------------------
    // Artist Tab Methods
    // ------------------

    calculateAgeSet(rawData, ret) {
        var i = 0;
        var now = moment();
        for (i = 0; i < rawData[0].length; i++) {
            // Calculate age
            var birthday = moment(rawData[0][i].Birthday);
            var age = now.diff(birthday, 'years');
            
            // Organize birthdays into groups and count them
            if (age >= 65) {
                ret[5]++;
            }
            else if (age >= 55) {
                ret[4]++;
            }
            else if (age >= 45) {
                ret[3]++;
            }
            else if (age >= 35) {
                ret[2]++;
            }
            else if (age >= 25) {
                ret[1]++;
            }
            else {
                ret[0]++;
            }
        }

        return ret;
    }

    convertDataToPercent(data) {
        var i = 0;
        var sum = 0;
        // Get Sum
        for (i = 0; i < data.length; i++) {
            sum += data[i];
        }
        // Get Percent        
        for (i = 0; i < data.length; i++) {
            data[i] = (data[i] / sum * 100).toFixed(1);
        }

        return data;
    }

    getAgeBoth = async (req, res)=> {
        /*
        SELECT U.Birthday FROM [dbo].[Transaction] T JOIN [dbo].[User] U ON U.ID = T.BuyerID WHERE U.ID = ___;
        */        
        // 18-24, 25-34, 45-54, 55-64, 65+
        var userData = [0, 0, 0, 0, 0, 0];
        var globalData = [0, 0, 0, 0, 0, 0];

        // User Data
        let userResult = await dbOps.executeQuery('SELECT U.Birthday FROM [dbo].[Transaction] T JOIN [dbo].[User] U ON U.ID = T.BuyerID WHERE U.ID = 6');
        if (userResult) {
            userData = this.calculateAgeSet(userResult, userData);
        }
        
        // Global Data
        let globalResult = await dbOps.executeQuery('SELECT U.Birthday FROM [dbo].[Transaction] T JOIN [dbo].[User] U ON U.ID = T.BuyerID');
        if (globalResult) {
            globalData = this.calculateAgeSet(globalResult, globalData);
        }

        // Convert data to percentages
        userData = this.convertDataToPercent(userData);
        globalData = this.convertDataToPercent(globalData);

        // Return null for that value if it's 0 (empty instead of 0)
        var i = 0;
        for (i = 0; i < userData.length; i++) {
            if (userData[i] <= 0) {
                userData[i] = null;
            }
            if (globalData[i] <= 0) {
                globalData[i] = null;
            }
        }

        // Format results
        let ret = {
            labels: ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
            data1: userData,
            data2: globalData
        }

        res.json(ret);
    }

    getAge = async (req, res)=> {
        /*
        SELECT U.Birthday FROM [dbo].[Transaction] T JOIN [dbo].[User] U ON U.ID = T.BuyerID WHERE U.ID = ___;
        */        
        // 18-24, 25-34, 45-54, 55-64, 65+
        var data = [0, 0, 0, 0, 0, 0];

        let result = await dbOps.executeQuery('SELECT U.Birthday FROM [dbo].[Transaction] T JOIN [dbo].[User] U ON U.ID = T.BuyerID WHERE U.ID = 6');
        if (result) {
            data = this.calculateAgeSet(result, data);
        }

        // Return null for that value if it's 0 (empty instead of 0)
        var i = 0;
        for (i = 0; i < data.length; i++) {
            if (data[i] === 0) {
                data[i] = null;
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
        res.json("Incomplete");
    }

    getTagList = async (req, res)=> {
        let query = 'SELECT ID, Name FROM [dbo].[Tag];';
        let ret = await dbOps.executeQuery(query);

        if (ret) {
            ret = ret[0];
        }

        res.json(ret);
    }
    
    getTagsArtist = async (req, res)=> {
        /*
        SELECT T.Name, COUNT(T.ID) AS 'Count' FROM [dbo].[ProductToTag] PT
            JOIN [dbo].[Tag] T ON PT.TagID = T.ID
            JOIN [dbo].[ProductToEvent] PE ON PE.ProductID = PT.ProductID
            JOIN [dbo].[SellerToEvent] SE ON SE.EventID = PE.EventID
            WHERE SE.UserID = ____
            GROUP BY T.Name
            ORDER BY 'Count' DESC
        */

        let query = 'SELECT T.Name, COUNT(T.ID) AS \'Count\' FROM [dbo].[ProductToTag] ' +
            'PT JOIN [dbo].[Tag] T ON PT.TagID = T.ID ' + 
            'JOIN [dbo].[ProductToEvent] PE ON PE.ProductID = PT.ProductID ' + 
            'JOIN [dbo].[SellerToEvent] SE ON SE.EventID = PE.EventID ' + 
            'WHERE SE.UserID = 272 ' +
            'GROUP BY T.Name ' + 
            'ORDER BY \'Count\' DESC;';
        let ret = await this.getTags(query);

        res.json(ret);
    }
    
    getTagsGlobal = async (req, res)=> {
        /*
        SELECT T.Name, COUNT(T.ID) AS 'Count' FROM [dbo].[ProductToTag] PT
            JOIN [dbo].[Tag] T ON PT.TagID = T.ID
            GROUP BY T.Name
            ORDER BY 'Count' DESC;
        */

        let query = 'SELECT T.Name, COUNT(T.ID) AS \'Count\' FROM [dbo].[ProductToTag] PT JOIN [dbo].[Tag] T ON PT.TagID = T.ID GROUP BY T.Name ORDER BY \'Count\' DESC;';
        let ret = await this.getTags(query);

        res.json(ret);
    }

    getTagsBoth = async (req, res)=> {
        // Get list of tags
        let tagQuery = 'SELECT ID, Name FROM [dbo].[Tag]';
        let tagData = await dbOps.executeQuery(tagQuery);
        let tagNames = [];
        let ret = null;
        if (tagData && tagData.length > 0 && tagData[0].length > 0) {
            let tagList = tagData[0];

            // Store user / global data here
            let userList = [];
            let globalList = [];

            // Get User ID
            let userID = 272;

            // Loop through TagIDs
            let i = 0;
            for (i = 0; i < tagList.length; i++) {
                // Save the current tag
                tagNames.push(tagList[i].Name)
                let currID = tagList[i].ID.toString();
                
                // Get User data
                let userQuery = 'SELECT COUNT(PT.TagID) AS \'Count\' FROM [dbo].[ProductToTag] PT ' +
                    'JOIN [dbo].[ProductToEvent] PE ON PE.ProductID = PT.ProductID ' + 
                    'JOIN [dbo].[SellerToEvent] SE ON SE.EventID = PE.EventID ' + 
                    'WHERE SE.UserID = ' + userID.toString() + ' AND PT.TagID = ' + currID + ';';
                let userData = await dbOps.executeQuery(userQuery);
                if (userData) {
                    userList.push(userData[0][0].Count);
                }
                else {
                    userList.push(0);
                }

                // Get Global data
                let globalQuery = 'SELECT COUNT(TagID) AS \'Count\' FROM [dbo].[ProductToTag] WHERE TagID = ' + currID + ';';
                let globalData = await dbOps.executeQuery(globalQuery);
                if (globalData) {
                    globalList.push(globalData[0][0].Count);
                }
                else {
                    globalList.push(0);
                }
            }

            // Convert datasets to percent
            userList = this.convertDataToPercent(userList);
            globalList = this.convertDataToPercent(globalList);

            // Replace 0's with nulls
            for (i = 0; i < userList.length; i++) {
                if (userList[i] <= 0) {
                    userList[i] = null;
                }
                if (globalList[i] <= 0) {
                    globalList[i] = null;
                }
            }
            
            // Compile data
            ret = {
                labels: tagNames,
                data1: userList,
                data2: globalList
            };
        }

        res.json(ret);
    }

    async getTags(query) {
        let result = await dbOps.executeQuery(query);
        let name = [];
        let count = [];
        let ret = {};
        if (result) {
            let data = result[0];            
            var i = 0;

            for (i = 0; i < data.length; i++) {
                name.push(data[i].Name);
                count.push(data[i].Count);
            }

            ret = {
                labels: name,
                data: count
            }
        }

        return ret
    }

    getAnalyticsArtist = async (req, res)=> {
        /*
            EXEC GetAnalyticsArtist
        */
        let result = await dbOps.executeQuery('EXEC GetAnalyticsArtist');
        let ret = [];
        if (result && result.length > 0 && result[0].length > 0) {
            ret = result[0][0];
        }
        res.json(ret);
    }


    

    // -----------------
    // Buyer Tab Methods
    // -----------------



    // --------------------
    // Social Media Methods
    // --------------------

    
}