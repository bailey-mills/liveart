const { password } = require('../dal/dbconfig');
const DbDrive = require('../dal/dbDrive');
const QueryBuilder = require('../dal/queryBuilder');
let dbOps = new DbDrive();
let queryBuilder = new QueryBuilder();

module.exports = class RegistrationController {

    getTags = async (req, res) => {
            let data = await dbOps.executeQuery("SELECT * FROM TAG");
            
            return res.send(data[0]);
    }

    createUser = async (req, res)=> {
        let data = req.body;

        let newUser = data[0];

    
        // HASH password



        try {
            //insert into Address Table 
            let addressQuery = queryBuilder.insertInto('[dbo].[Address]',['Street', 'City', 'ProvinceID', 'PostalCode'], 
                                                        [[newUser.Street, newUser.City, newUser.ProvinceID, newUser.Postalcode]]);
            
            
            await dbOps.executeQuery(addressQuery);

            // get addressID
            let addressIDResult = await dbOps.executeQuery(`SELECT ID from [dbo].[Address] WHERE Street='${newUser.Street}'`);

            let addressID = addressIDResult[0][0]['ID'];
            
            

            //insert into User Table
            let mockBirthday = '2000-01-01';
            let mockEmail = '1234567@gmail.com';
            let UserQuery = queryBuilder.insertInto('[dbo].[User]', ['AddressID', 'Email', 'Password', 'UserName', 'Birthday'],
                                                     [[addressID, mockEmail, newUser.Password, newUser.Username, mockBirthday]]);
            await dbOps.executeQuery(UserQuery);

            // get userID
            let userIDResult = await dbOps.executeQuery(`SELECT ID from [dbo].[User] WHERE Username='${newUser.Username}'`);
            
            let userID = userIDResult[0][0]['ID'];


            //Insert into UserToTag Table

            let userToTagPromise = newUser.Tags.map( async tagID => {
             await dbOps.executeQuery(`INSERT INTO [dbo].[UserToTag] (TagID, UserID) VALUES (${tagID}, ${userID})`)
             });

             await Promise.all(userToTagPromise);



        }catch(error){
            console.log(error);
            return res.staus(500).send({'message': error});
        }

        return res.status(201).send({"message": "Successfully created user"})

    }

}