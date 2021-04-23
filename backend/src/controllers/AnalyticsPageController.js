/**
 * @file AnalyticsPageController.js contains methods to support Data Visualization
 * @author Shuang Liang, Bailey Mills
 * 
 */
const DbDrive = require('../dal/dbDrive');
const moment =  require('moment');

let dbOps = new DbDrive();


/*
SELECT U.Birthday FROM [dbo].[Transaction] T
    JOIN [dbo].[Bid] B ON B.ID = T.BidID
    JOIN [dbo].[User] U ON U.ID = B.UserID
    JOIN [dbo].[Event] E ON E.ID = B.EventID
    JOIN [dbo].[SellerToEvent] SE ON SE.EventID = E.ID
    WHERE SE.UserID = 611
*/
const QUERY_ARTIST_AGE = "SELECT U.Birthday FROM [dbo].[Transaction] T JOIN [dbo].[Bid] B ON B.ID = T.BidID JOIN [dbo].[User] U ON U.ID = B.UserID JOIN [dbo].[Event] E ON E.ID = B.EventID JOIN [dbo].[SellerToEvent] SE ON SE.EventID = E.ID WHERE SE.UserID = ";

/**
 * @module AnalyticsPageController
 * 
 */
module.exports = class AnalyticsPageController {
    //let result = await dbOps.executeQuery('SELECT * from Province');
    //res.json(result);


    // ------------------
    // Artist Tab Methods
    // ------------------

      /**
     * @method calculateAgeSet 
     * @description calculate age set 
     * @param {Array<Object>} rawData - data to be processed
     * @param {Array<object>} ret - ret array
     * @returns {null} - None
     */  
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
    

     /**
     * convertDataToPercent
     * @param {Array<Object>} data - data to be processed
     * @returns {Array<Object>} - data after percent convertion
     */
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
    
    /**
    * @typedef {object} ageComparisonGroup
    * @prop {Array<string>} labels - age groups
    * @prop {Array<number>} data1 - user data 
    * @prop {Array<number>} data2 - global data 
    */

    /**
     * @method getAgeBoth 
     * @description get a set of comparison data of user related and global related age data
     * @param {Array<Object>} userID - UserID
     * @returns {ageComparisonGroup} - Age Comparison Object
     */  
    getAgeBoth = async (req, res)=> {
        // 18-24, 25-34, 45-54, 55-64, 65+
        var userData = [0, 0, 0, 0, 0, 0];
        var globalData = [0, 0, 0, 0, 0, 0];

        // User Data
        let userID = req.params.id;
        let userResult = await dbOps.executeQuery(QUERY_ARTIST_AGE + userID);
        if (userResult) {
            userData = this.calculateAgeSet(userResult, userData);
        }
        
        // Global Data
        let globalResult = await dbOps.executeQuery('SELECT U.Birthday FROM [dbo].[Transaction] T JOIN [dbo].[Bid] B ON B.ID = T.BidID JOIN [dbo].[User] U ON U.ID = B.UserID');
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
    

    /**
     * @method getAge 
     * @description get age
     * @param {string} userID - UserID
     * @returns {Object} - Age Group Object
     */  
    getAge = async (req, res)=> {
        // 18-24, 25-34, 45-54, 55-64, 65+
        var data = [0, 0, 0, 0, 0, 0];

        let userID = req.params.id;
        let result = await dbOps.executeQuery(QUERY_ARTIST_AGE + userID);
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
    
    /**
    * @typedef {object} ArtistTags
    * @prop {string} name - artist name
    * @prop {number} count - count of the tags
    */
    /**
     * @method getTagsArtist 
     * @description get tags of the artist
     * @param {string} userID - UserID
     * @returns {ArtistTags} - Tag count for Artist
     */  
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

        let userID = req.params.id;
        let query = 'SELECT T.Name, COUNT(T.ID) AS \'Count\' FROM [dbo].[ProductToTag] ' +
            'PT JOIN [dbo].[Tag] T ON PT.TagID = T.ID ' + 
            'JOIN [dbo].[ProductToEvent] PE ON PE.ProductID = PT.ProductID ' + 
            'JOIN [dbo].[SellerToEvent] SE ON SE.EventID = PE.EventID ' + 
            'WHERE SE.UserID = ' + userID + ' ' +
            'GROUP BY T.Name ' + 
            'ORDER BY \'Count\' DESC;';
        let ret = await this.getTags(query);

        res.json(ret);
    }
    

    /**
    * @typedef {object} transactions
    * @prop {Array<number>} amount - amount of income for each transaction
    * @prop {Array<string>} date - timestamp of transaction
    */
    /**
     * @method getTransactionsOverTimeArtist 
     * @description get all transaction income historically of the artists
     * @param {string} userID - UserID
     * @returns {transactions} - Array of transactions
     */ 
    getTransactionsOverTimeArtist = async (req, res)=> {
        /*
        SELECT SUM(B.Amount) AS 'Value', E.StartTime AS 'EventDate' FROM [dbo].[Bid] B
            JOIN [Transaction] T ON T.BidID = B.ID
            JOIN [SellerToEvent] SE ON SE.UserID = 2955 AND SE.EventID = B.EventID
            JOIN [Event] E ON E.ID = SE.EventID
            WHERE SE.UserID = 2955
            GROUP BY E.StartTime
        */

        let userID = req.params.id;
        let query = `SELECT SUM(B.Amount) AS 'Value', E.StartTime AS 'EventDate' FROM [dbo].[Bid] B
            JOIN [Transaction] T ON T.BidID = B.ID
            JOIN [SellerToEvent] SE ON SE.UserID = ${userID} AND SE.EventID = B.EventID
            JOIN [Event] E ON E.ID = SE.EventID
            WHERE SE.UserID = ${userID}
            GROUP BY E.StartTime
            ORDER BY E.StartTime`;
                
        let result = await dbOps.executeQuery(query);
        result = result[0];

        let keys = [];
        let values = [];
        for (let i = 0; i < result.length; i++) {
            keys.push(result[i].EventDate);
            values.push(result[i].Value);
        }
        
        // Format results
        let ret = {
            labels: keys,
            data: values
        }

        res.json(ret);
    }
    


    /**
     * @method getTransactionsOverTimeBuyer 
     * @description get all transaction cost historically of the buyers
     * @param {string} userID - UserID
     * @returns {transactions} - Array of transactions
     */ 
    getTransactionsOverTimeBuyer= async (req, res)=> {
        let userID = req.params.id;
        let query = `SELECT SUM(B.Amount) AS 'Value', E.StartTime AS 'EventDate' FROM [dbo].[Bid] B
            JOIN [Transaction] T ON T.BidID = B.ID
            JOIN [Event] E ON E.ID = b.EventID
            WHERE B.UserID = ${userID}
            GROUP BY E.StartTime
            ORDER BY E.StartTime`;
                
        let result = await dbOps.executeQuery(query);
        result = result[0];

        let keys = [];
        let values = [];
        for (let i = 0; i < result.length; i++) {
            keys.push(result[i].EventDate);
            values.push(result[i].Value);
        }
        
        // Format results
        let ret = {
            labels: keys,
            data: values
        }

        res.json(ret);
    }
    
    

    /**
    * @typedef {object} tagComparsionGroup
    * @prop {Array<string>} tags - name of tags
    * @prop {Array<number>} list1 - user list 
    * @prop {Array<number>} list2 - global globallist 
    */
      /**
     * @method getTagsBoth 
     * @description get tags comparision between user and globally
     * @param {string} userID - UserID
     * @returns {tagComparsionGroup} - Tag Group
     */ 
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
            let userID = req.params.id;

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
                    'WHERE SE.UserID = ' + userID + ' AND PT.TagID = ' + currID + ';';
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
    
     /**
    * @typedef {object} tagGroup
    * @prop {Array<string>} name - name of tags
    * @prop {Array<number>} count - count of tag 
    */
    /**
     * @method getTagsBoth 
     * @description get tags and their count
     * @param {string} query - query
     * @returns {tagGroup} - Tag Group
     */ 
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
    

    /**
     * @method getAnalyticsArtist 
     * @description execute getAnalyticsArtist procedure
     * @param {number} userID - userID
     * @returns {Object} - Result of analytics
     */ 
    getAnalyticsArtist = async (req, res)=> {
        /*
            EXEC GetAnalyticsArtist @userID = 1
        */
        let userID = req.params.id;
        let result = await dbOps.executeQuery('EXEC GetAnalyticsArtist @userID = ' + userID);
        let ret = [];
        if (result && result.length > 0 && result[0].length > 0) {
            ret = result[0][0];
        }
        res.json(ret);
    }


    

    // -----------------
    // Buyer Tab Methods
    // -----------------
    
    /**
     * @method getAnalyticsBuyer 
     * @description execute getAnalyticsBuyer procedure
     * @param {number} userID - userID
     * @returns {Object} - Result of analytics
     */ 
    getAnalyticsBuyer = async (req, res)=> {
        /*
            EXEC GetAnalyticsBuyer @userID = 1
        */
        let userID = req.params.id;
        let result = await dbOps.executeQuery('EXEC GetAnalyticsBuyer @userID = ' + userID);
        let ret = [];
        if (result && result.length > 0 && result[0].length > 0) {
            ret = result[0][0];
        }
        res.json(ret);
    }

    
    /**
     * @method getTagsBuyer 
     * @description get buyer tag group
     * @param {number} userID - userID
     * @returns {tagGroup} - Result of tag group
     */ 
    getTagsBuyer = async (req, res)=> {
        /*
	    SELECT T.Name, COUNT(T.ID) AS 'Count' FROM [dbo].[ProductToTag] PT
            JOIN [dbo].[Tag] T ON PT.TagID = T.ID
            JOIN [dbo].[ProductToEvent] PE ON PE.ProductID = PT.ProductID
            JOIN [dbo].[Bid] B ON B.EventID = PE.EventID
            WHERE B.UserID = 4321
            GROUP BY T.Name
            ORDER BY 'Count' DESC
        */

        let userID = req.params.id;
        let query = 'SELECT T.Name, COUNT(T.ID) AS \'Count\' FROM [dbo].[ProductToTag] ' +
            'PT JOIN [dbo].[Tag] T ON PT.TagID = T.ID ' + 
            'JOIN [dbo].[ProductToEvent] PE ON PE.ProductID = PT.ProductID ' + 
            'JOIN [dbo].[Bid] B ON B.EventID = PE.EventID ' + 
            'WHERE B.UserID = ' + userID + ' ' +
            'GROUP BY T.Name ' + 
            'ORDER BY \'Count\' DESC;';
        let ret = await this.getTags(query);

        res.json(ret);
    }

    


    // --------------------
    // Social Media Methods
    // --------------------



    // -------
    // General
    // -------
    
    /**
     * @method getTagsGlobal 
     * @description get global tags
     * @returns {Array<tagGroup>} - Result of global tag groups
     */ 
    getTagsGlobal = async (req, res)=> {
        /*
        SELECT T.Name, COUNT(T.ID) AS 'Count' FROM [dbo].[ProductToTag] PT
            JOIN [dbo].[Tag] T ON PT.TagID = T.ID
            GROUP BY T.Name
            ORDER BY 'Count' DESC;
        */

        let query = 'SELECT TOP 10 T.Name, COUNT(T.ID) AS \'Count\' FROM [dbo].[ProductToTag] PT JOIN [dbo].[Tag] T ON PT.TagID = T.ID GROUP BY T.Name ORDER BY \'Count\' DESC;';
        let ret = await this.getTags(query);

        res.json(ret);
    }    
    
    /**
     * @method getTagList 
     * @description get tag list
     * @returns {Array<tagGroup>} - Result of tag groups
     */ 
    getTagList = async (req, res)=> {
        let query = 'SELECT ID, Name FROM [dbo].[Tag];';
        let ret = await dbOps.executeQuery(query);

        if (ret) {
            ret = ret[0];
        }

        res.json(ret);
    }
}