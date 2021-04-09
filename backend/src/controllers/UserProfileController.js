const DbDrive = require('../dal/dbDrive');
const QueryBuilder = require('../dal/queryBuilder');

let dbDrive = new DbDrive();
let queryBuilder = new QueryBuilder();

module.exports = class UserProfileController {
    getBio = async (req, res)=> {
        /*
        SELECT TOP 1 U.Username, U.ProfileImage AS 'AvatarURL', U.Email, U.Birthday, A.Street AS 'Address', A.City, A.ProvinceID, P.Name AS 'Province'
            FROM [User] U
            JOIN [Address] A ON A.ID = U.AddressID
            JOIN [Province] P ON P.ID = A.ProvinceID
            WHERE U.Username = 'Trista_Kastor_252'
        */
        /*
        SELECT T.ID, T.Name
            FROM [UserToTag] UT
            JOIN [Tag] T ON T.ID = UT.TagID
            JOIN [User] U ON U.ID = UT.UserID
            WHERE U.Username = 'Trista_Kastor_252'
        */
        
        let username = req.params.username;

        let userInfo = await dbDrive.executeQuery(
            "SELECT TOP 1 U.Username, U.ProfileImage AS 'AvatarURL', U.Email, U.Birthday, A.Street AS 'Address', A.City, A.ProvinceID, P.Name AS 'Province' " +
            "FROM [User] U " +
            "JOIN [Address] A ON A.ID = U.AddressID " +
            "JOIN [Province] P ON P.ID = A.ProvinceID " +
            "WHERE U.Username = '" + username + "'"
        );
        let tagList = await dbDrive.executeQuery(
            "SELECT T.ID, T.Name " + 
            "FROM [UserToTag] UT " +
            "JOIN [Tag] T ON T.ID = UT.TagID " + 
            "JOIN [User] U ON U.ID = UT.UserID " + 
            "WHERE U.Username = '" + username + "'"
        );

        let ret = {};
        if (userInfo[0].length > 0) {
            ret = userInfo[0][0];
            ret.Tags = tagList[0];
        }
        else {
            return res.status(404).send({message: 'User not found!'});
        }

        return res.json(ret);
    }
    
    getUser = async (req, res)=> {
        let username = req.params.username;

        // GET USER INFO
        let userInfo = await dbDrive.executeQuery(
            "SELECT TOP 1 U.Username, U.ProfileImage AS 'AvatarURL', U.Email, U.Birthday " +
            "FROM [User] U " +
            "WHERE U.Username = '" + username + "'"
        );

        // GET USER TAGS
        let tagList = await dbDrive.executeQuery(
            "SELECT T.ID, T.Name " + 
            "FROM [UserToTag] UT " +
            "JOIN [Tag] T ON T.ID = UT.TagID " + 
            "JOIN [User] U ON U.ID = UT.UserID " + 
            "WHERE U.Username = '" + username + "'"
        );
        
        // GET PLANNED EVENTS
        /*        
        Returns all events that a user has created. Unfiltered

            SELECT E.ID AS 'EventID', E.Title AS 'EventName', E.StartTime, E.EndTime, E.CategoryID, C.Name AS 'CategoryName', U.Username FROM [Event] E
                JOIN [SellerToEvent] SE ON SE.EventID = E.ID
                JOIN [Category] C ON C.ID = E.CategoryID
                JOIN [User] U ON U.ID = SE.UserID
                WHERE U.Username = 'Trista_Kastor_252'
        */
        let plannedEvents = await dbDrive.executeQuery(
            "SELECT E.ID AS 'EventID', E.Title AS 'EventName', E.StartTime, E.EndTime, E.CategoryID, C.Name AS 'CategoryName', U.Username AS 'EventHostUsername' " + 
            "FROM [Event] E " +
            "JOIN [SellerToEvent] SE ON SE.EventID = E.ID " + 
            "JOIN [Category] C ON C.ID = E.CategoryID " + 
            "JOIN [User] U ON U.ID = SE.UserID " + 
            "WHERE U.Username = '" + username + "'"
        );
        
        // GET EVENT TAGS (from each product in the event(s))
        if (plannedEvents[0].length > 0) {
            let i = 0;
            // Get the tags for each product in each event in the array of events
            for (i = 0; i < plannedEvents[0].length; i++) {
                let event = plannedEvents[0][i];
                let eventID = event.EventID;
                let eventProductTags = await dbDrive.executeQuery(
                    "SELECT T.ID, T.Name " + 
                    "FROM [ProductToTag] PT " +
                    "JOIN [Tag] T ON T.ID = PT.TagID " + 
                    "JOIN [ProductToEvent] PE ON PE.ProductID = PT.ProductID " + 
                    "WHERE PE.EventID = " + eventID
                );
                if (eventProductTags[0].length > 0) {
                    plannedEvents[0][i].EventTags = eventProductTags[0];
                }
            }
        }

        // GET SOLD PRODUCTS
        let soldProducts = await dbDrive.executeQuery(
            "SELECT P.Name, P.Summary AS 'ProductDescription', P.PreviewURL AS 'ProductURL', B.Amount, SE.EventID, E.Title AS 'EventName' " + 
            "FROM [Product] P " +
            "JOIN [ProductToEvent] PE ON PE.ProductID = P.ID " + 
            "JOIN [Bid] B ON B.ProductID = P.ID " + 
            "JOIN [Transaction] T ON T.BidID = B.ID " + 
            "JOIN [SellerToEvent] SE ON SE.EventID = B.EventID " + 
            "JOIN [User] U ON U.ID = SE.UserID " + 
            "JOIN [Event] E ON E.ID = SE.EventID " + 
            "WHERE P.IsSold = 1 AND U.Username = '" + username + "'"
        );

        let ret = {};
        if (userInfo[0].length > 0) {
            ret = userInfo[0][0];
            ret.Tags = tagList[0];
            ret.PlannedEvents = plannedEvents[0];
            ret.SoldProducts = soldProducts[0];
        }
        else {
            return res.status(404).send({message: 'User not found!'});
        }

        return res.json(ret);
    }
    
    updatePassword = async (req, res)=> {
        /*
            [
                {
                    OldPassword,
                    NewPassword
                }
            ]
        */
        
        let result = await dbDrive.executeQuery('');
        return res.json(result[0]);
    }
}
