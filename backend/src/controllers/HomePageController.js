const DbDrive = require('../dal/dbDrive');
const QueryBuilder = require('../dal/queryBuilder');
const { sha256 } = require('js-sha256');
const { user } = require('../dal/dbconfig');


let dbDrive = new DbDrive();
let queryBuilder = new QueryBuilder();

module.exports = class HomePageController {

    getProvinces = async (req, res)=> {

        // if(!req.session.loggedIn){
        //     return res.status(403).send({message: 'unauthorized!'})
        // }
          
        let result = await dbDrive.executeQuery('SELECT * FROM Province');
    
        return res.json(result[0])
           
    }

    // {
    //     "Username":"userb",
    //     "Password" : "123"
    // }
    authenticate = async (req, res, next) => {
         let clientPassword = req.body.Password;
         let clientUsername = req.body.Username;

         let dbUserResult = await dbDrive.executeQuery(`SELECT * FROM [dbo].[User] WHERE username='${clientUsername}'`);

         let dbUser = dbUserResult[0];
         

         if(dbUser.length == 0) {
             return res.status(404).send({message: 'User not found!'});
         }

         let dbHashedPassword = dbUser[0].Password;

         if(sha256.hmac(process.env.SECRET, clientPassword) === dbHashedPassword){
            res.locals.username = clientUsername;
            next();
         }
         else {
            return res.status(401).send({message: 'Incorrent credential!'});
         }
    }

    createSession = async (req, res) => {
        req.session.loggedIn = true;
        req.session.username = res.locals.username;
        let userIDResult = await dbDrive.executeQuery(`SELECT ID from [dbo].[User] WHERE username='${req.session.username}'`)

        let userID = userIDResult[0][0].ID;
        
        res.status(201).send({UserID:userID, username: req.session.username});
    }

    logOut = async (req, res, next) => {
        //console.log(req.query.username)
        req.session.destroy(err => {if(err) console.log(err)})
        res.status(205).send({message: 'logged out!'});
    }

}





