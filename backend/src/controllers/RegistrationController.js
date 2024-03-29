/**
 * @file RegistrationController.js contains method to create a new user
 * @author Shuang Liang, Bailey Mills
 * 
 */
const DbDrive = require('../dal/dbDrive');
const QueryBuilder = require('../dal/queryBuilder');



let dbDrive = new DbDrive();
let queryBuilder = new QueryBuilder();

/**
 * @module RegistrationController
 * 
 */
module.exports = class RegistrationController {
    // [
    //     {
    //         "Email": "test@email",
    //         "Username": "userb",
    //         "Birthday": "2000-01-01",
    //         "Password": "123",
    //         "Street": "123street",
    //         "City": "wateloo",
    //         "Postalcode": "N2LL2N",
    //         "ProvinceID": 5,
    //         "Tags": [ {"ID": 1},{"ID":3}, {"ID":5}
    //         ]
    //     }
    // ]
    

        /**
    * @typedef {object} UserInfo
    * @prop {string} Email - Email
    * @prop {string} Username - Username
    * @prop {string} Birthday - Birthday
    * @prop {string} Password - Password
    * @prop {string} Street - Street
    * @prop {string} City - City
    * @prop {string} Postalcode - Postalcode
    * @prop {number} ProvinceID - ProvinceID
    */
    /**
     * @method createUser 
     * @description  createUser
     * @param {UserInfo} user - new user
     * @returns {Null} - None
     */ 
    createUser = async (req, res)=> {
        let data = req.body;

        let newUser = data[0];

        // console.log(newUser);

        // check if username and email already exists
        let checkUserNameResult = await dbDrive.executeQuery(`SELECT * FROM [dbo].[User] WHERE username='${newUser.Username}'`);
        let checkUserName = checkUserNameResult[0];

        let checkEmailResult = await dbDrive.executeQuery(`SELECT * FROM [dbo].[User] WHERE email='${newUser.Email}'`);
        let checkEmail = checkEmailResult[0];

        if(checkUserName.length || checkEmail.length > 0) {
            return res.status(403).json({error: "Username or Email already exists!"})
        }
    
        // HASH password
        let hashedPassword = dbDrive.Encrypt(newUser.Password);

        try {
            //insert into Address Table 
            let addressQuery = queryBuilder.insertInto('[dbo].[Address]',['Street', 'City', 'ProvinceID', 'PostalCode'], 
                                                        [[newUser.Street, newUser.City, newUser.ProvinceID, newUser.Postalcode]]);
            
            
            await dbDrive.executeQuery(addressQuery);

            // get addressID
            let addressIDResult = await dbDrive.executeQuery(`SELECT ID from [dbo].[Address] WHERE Street='${newUser.Street}'`);

            let addressID = addressIDResult[0][0]['ID'];
            
            

            //insert into User Table
            let UserQuery = queryBuilder.insertInto('[dbo].[User]', ['AddressID', 'Email', 'Password', 'UserName', 'Birthday', 'ProfileImage'],
                                                     [[addressID, newUser.Email, hashedPassword, newUser.Username, newUser.Birthday, process.env.DEFAULT_PROFILE]]);


                           // console.log(UserQuery);

             await dbDrive.executeQuery(UserQuery);

            //Insert into UserToTag Table

            let userIDResult = await dbDrive.executeQuery(`SELECT ID FROM [dbo].[User] WHERE username='${newUser.Username}'`);
            let userID = userIDResult[0][0].ID;

            let userToTagPromise = newUser.Tags.map( async tag => {
                let query = `INSERT INTO [dbo].[UserToTag] (TagID, UserID) VALUES (${tag.ID}, '${userID}')`;

               // console.log(query);
                 await dbDrive.executeQuery(query);
             });

            await Promise.all(userToTagPromise);



        }catch(error){
            console.log(error);
            return res.status(500).send({'message': 'Server Error!'});
        }

        return res.status(201).send({"message": "Successfully created user"})

    }

}