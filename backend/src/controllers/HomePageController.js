const DbDrive = require('../dal/dbDrive');
const bcrypt = require('bcrypt');
let dbDrive = new DbDrive();

module.exports = class HomePageController {

    getProvinces = async (req, res)=> {

        if(!req.session.loggedIn){
            return res.status(403).send({message: 'unauthorized!'})
        }
          
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
         //console.log(dbUser);

         if(dbUser.length == 0) {
             return res.status(404).send({message: 'User not found!'});
         }

         let dbHashedPassword = dbUser[0].Password;


         bcrypt.compare(clientPassword, dbHashedPassword, (err, isMatched)=> {

            if(err) return console.log(err);

            if(!isMatched){
                return res.status(401).send({message: 'Incorrent credential!'})
            }
            else {
                res.locals.username = clientUsername;
                next();
            }      
         });
         

    }

    createSession = (req, res) => {
        req.session.loggedIn = true
        req.session.username = res.locals.username

        // console.log(res.locals);
        // console.log(req.session);
        
        res.status(201).send({message:`Session for user ${res.locals.username} created!`});
    }

    logOut = async (req, res, next) => {
        req.session.destroy(err => {if(err) console.log(err)})
        res.status(205).send({message: 'logged out!'});
    }

}





