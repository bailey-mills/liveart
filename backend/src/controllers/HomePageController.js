const DbDrive = require('../dal/dbDrive');
const { sha256 } = require('js-sha256');
let dbDrive = new DbDrive();

module.exports = class HomePageController {

    getProvinces = async (req, res)=> {

        // if(!req.session.loggedIn){
        //     return res.status(403).send({message: 'unauthorized!'})
        // }
          
        let result = await dbDrive.executeQuery('SELECT * FROM Province');
    
        return res.json(result[0])
           
    }
    
    recommendEvents = async (req, res) => {
        //recommend algorithm comes later

        let result = await dbDrive.executeQuery('SELECT * FROM Event');
       
            return res.json(result[0])
    }

    activeEvents = async (req, res) => {

         let result = await dbDrive.executeQuery('SELECT * from Event Where StartTime < CURRENT_TIMESTAMP AND EndTime > CURRENT_TIMESTAMP');
         
         return res.json(result[0]);
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

    createSession = (req, res) => {
        req.session.loggedIn = true
        req.session.username = res.locals.username
        // req.session.test = 'test';

        //  console.log(res.locals);
        //  console.log(req.session);
        
        res.status(201).send({message:`Session for user ${res.locals.username} created!`});
    }

    logOut = async (req, res, next) => {
        //console.log(req.query.username)
        req.session.destroy(err => {if(err) console.log(err)})
        res.status(205).send({message: 'logged out!'});
    }

}





