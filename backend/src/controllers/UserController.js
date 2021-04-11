const DbDrive = require('../dal/dbDrive');
const QueryBuilder = require('../dal/queryBuilder');
const EventController = require('./EventController');
const ProductController = require('./ProductController');

const { sha256 } = require('js-sha256');

let dbDrive = new DbDrive();
let queryBuilder = new QueryBuilder();
let eventController = new EventController();
let productController = new ProductController();

module.exports = class UserController {
    getBio = async (req, res)=> {
        let username = req.params.username;

        let userInfo = await dbDrive.executeQuery(
            "SELECT TOP 1 U.Username, U.ProfileImage AS 'AvatarURL', U.Email, U.Birthday, A.Street AS 'Address', A.City, A.ProvinceID, P.Name AS 'Province', A.PostalCode " +
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
        let subscribedByCount = await this.methodSubscriberCount(username);
        let subscribedToCount = await this.methodSubscribedCount(username);

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
        let soldProducts = await productController.methodSoldProducts(username);

        let ret = {};
        if (userInfo[0].length > 0) {
            ret = userInfo[0][0];
            ret.SubscribedToCount = subscribedToCount;
            ret.SubscribedByCount = subscribedByCount;
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

        let username = req.body.Username;
        
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
    
    getSubscribedTo = async (req, res)=> {
        let username = req.params.username;

        let subscribers = await dbDrive.executeQuery(
            "SELECT UArtist.Username, P.ID AS 'ProvinceID', P.Name AS 'Province' " + 
            "FROM [Subscription] S " +
            "JOIN [User] UArtist ON UArtist.ID = S.TargetUserID " + 
            "JOIN [Address] A ON A.ID = UArtist.AddressID " + 
            "JOIN [Province] P ON P.ID = A.ProvinceID " + 
            "JOIN [User] UBuyer ON UBuyer.ID = S.UserID " + 
            "WHERE UBuyer.Username = '" + username + "'"
        );
        return res.json(subscribers[0]);
    }

    // Get number of profiles subscribed to this user
    async methodSubscriberCount(username) {
        let subscribers = await dbDrive.executeQuery(
            "SELECT COUNT(U.ID) AS 'Count' " + 
            "FROM [Subscription] S " +
            "JOIN [User] U ON U.ID = S.TargetUserID " + 
            "WHERE U.Username = '" + username + "'"
        );

        if (!subscribers[0] || subscribers[0].length <= 0) {
            return 0;
        }

        return parseInt(subscribers[0][0].Count);
    }

    // Get number of profiles this user is subscribed to
    async methodSubscribedCount(username) {
        let subscribers = await dbDrive.executeQuery(
            "SELECT COUNT(U.ID) AS 'Count' " + 
            "FROM [Subscription] S " +
            "JOIN [User] U ON U.ID = S.UserID " + 
            "WHERE U.Username = '" + username + "'"
        );

        if (!subscribers[0] || subscribers[0].length <= 0) {
            return 0;
        }

        return parseInt(subscribers[0][0].Count);
    }
    
    toggleSubscription = async (req, res)=> {
        console.log(req.body);
        let user = req.body.User;
        let target = req.body.Target;

        let subbed = await this.methodCheckSubscription(user, target);

        // Unsubscribe
        if (subbed) {
            let userID = await dbDrive.executeQuery(
                `SELECT TOP 1 ID FROM [User] U WHERE U.Username = '${user}'`
            );
            let targetID = await dbDrive.executeQuery(
                `SELECT TOP 1 ID FROM [User] U WHERE U.Username = '${target}'`
            );

            await dbDrive.executeQuery(
                `DELETE
                FROM [Subscription]
                WHERE UserID = ${userID[0][0].ID} AND TargetUserID = ${targetID[0][0].ID}`
            );
        }
        // Subscribe
        else {
            let userID = await dbDrive.executeQuery(
                `SELECT TOP 1 ID FROM [User] U WHERE U.Username = '${user}'`
            );
            let targetID = await dbDrive.executeQuery(
                `SELECT TOP 1 ID FROM [User] U WHERE U.Username = '${target}'`
            );
            
            await dbDrive.executeQuery(
                `INSERT INTO [Subscription] (UserID, TargetUserID)
                VALUES (${userID[0][0].ID}, ${targetID[0][0].ID})`
            );
        }

        subbed = await this.methodCheckSubscription(user, target);

        return res.json({
            Subscribed: subbed
        });
    }
    
    checkSubscription = async (req, res)=> {
        let user = req.body.User;
        let target = req.body.Target;

        let subbed = await this.methodCheckSubscription(user, target);

        return res.json({
            Subscribed: subbed
        });
    }

    async methodCheckSubscription(user, target) {
        let subscription = await dbDrive.executeQuery(
            `SELECT TOP 1 UUser.ID
            FROM [Subscription] S
            JOIN [User] UUser ON UUser.ID = S.UserID
            JOIN [User] UTarget ON UTarget.ID = S.TargetUserID
            WHERE UUser.Username = '${user}' AND UTarget.Username = '${target}'`
        );
        let subscribed = false;

        if (subscription[0].length > 0) {
            subscribed = true;
        }

        return subscribed;
    }
    
    search = async (req, res)=> {
        let input = req.body.Input;
        let count = req.body.Count;

        let result = await dbDrive.executeQuery(
            `SELECT TOP ${count} U.ID, U.Username, U.Birthday, P.ID AS 'ProvinceID', P.Name AS 'ProvinceName'
            FROM [User] U
            JOIN [Address] A ON A.ID = U.AddressID
            JOIN [Province] P ON P.ID = A.ProvinceID
            WHERE U.Username LIKE '${input}%'
            `
        );

        // Get more of each user's info
        if (result[0].length > 0) {
            let i = 0;
            for (i = 0; i < result[0].length; i++) {
                let user = result[0][i];

                // Subscribed count
                let subscribedTo = await this.methodSubscribedCount(user.Username);

                // Subscriber count
                let subscribedBy = await this.methodSubscriberCount(user.Username);
                
                // Tags
                let tagList = await dbDrive.executeQuery(
                    "SELECT T.ID, T.Name " + 
                    "FROM [UserToTag] UT " +
                    "JOIN [Tag] T ON T.ID = UT.TagID " + 
                    "JOIN [User] U ON U.ID = UT.UserID " + 
                    "WHERE U.Username = '" + user.Username + "'"
                );

                // Apply data to user
                user.SubscribedToCount = subscribedTo;
                user.SubscribedByCount = subscribedBy;
                user.Tags = tagList[0];
            }
        }

        return res.json(result[0]);
    }
}
