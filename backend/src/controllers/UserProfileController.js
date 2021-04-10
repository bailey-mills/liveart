const DbDrive = require('../dal/dbDrive');
const QueryBuilder = require('../dal/queryBuilder');
const EventController = require('./EventController');

const { sha256 } = require('js-sha256');

let dbDrive = new DbDrive();
let queryBuilder = new QueryBuilder();
let eventController = new EventController();

module.exports = class UserProfileController {
    getBio = async (req, res)=> {
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
        let plannedEvents = await eventController.methodPlannedEvents(username);

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
            ret.PlannedEvents = plannedEvents;
            ret.SoldProducts = soldProducts[0];
        }
        else {
            return res.status(404).send({message: 'User not found!'});
        }

        return res.json(ret);
    }
    
    updatePassword = async (req, res)=> {
        let oldPass = req.body.OldPassword;
        let oldPassHash = sha256.hmac(process.env.SECRET, oldPass);

        let newPass = req.body.NewPassword;
        let newPassHash = sha256.hmac(process.env.SECRET, newPass);

        let username = 'Lenora_Trafford_523';
        
        // Try to find the user
        let dbUserResult = await dbDrive.executeQuery(`SELECT TOP 1 Password FROM [dbo].[User] WHERE username='${username}'`);
        let dbUser = dbUserResult[0];

        // Cancel if the user is not found
        if(dbUser.length == 0) {
            return res.status(404).send({ message: 'User not found!' });
        }
        // Cancel if their old password wasn't correctly provided
        if (oldPassHash != dbUser[0].Password) {
            return res.status(401).send({ message: 'Password does not match' });
        }

        // Update database password to new password hash
        await dbDrive.executeQuery(`UPDATE [dbo].[User] SET Password = '${newPassHash}' WHERE Username = '${username}'`);
        
        return res.json({ message: 'Password updated successfully'});
    }

    getSubscribers = async (req, res)=> {
        let username = req.params.username;

        let subscribers = await dbDrive.executeQuery(
            "SELECT UBuyer.Username, P.ID AS 'ProvinceID', P.Name AS 'Province' " + 
            "FROM [Subscription] S " +
            "JOIN [User] UBuyer ON UBuyer.ID = S.UserID " + 
            "JOIN [Address] A ON A.ID = UBuyer.AddressID " + 
            "JOIN [Province] P ON P.ID = A.ProvinceID " + 
            "JOIN [User] UArtist ON UArtist.ID = S.TargetUserID " + 
            "WHERE UArtist.Username = '" + username + "'"
        );
        return res.json(subscribers[0]);
    }
}
