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
    
    recommendEvents = async (req, res) => {

        let randomRecommendQuery = 'SELECT TOP 6 * FROM [dbo].[Event] order by NEWID()';
        // not logged in, give random recommendations
        if(!req.session.loggedIn){
            let result = await dbDrive.executeQuery(randomRecommendQuery);

            return res.json(result[0]);
        } else {
            // get user tags to calcuate weights
            // let username = 'shawn';
            let username = req.session.username;

            let weightedCategoriesQuery = 
            queryBuilder.getFromjoin(['[dbo].[UserToTag]'],['Tag.CategoryID',"Count(UserToTag.TagID) as 'Count'"],
            [
            {joinTable:'[dbo].[User]',referenceKeys:'[dbo].[UserToTag].Username=[dbo].[User].Username'},
            {joinTable:'[dbo].[Tag]',referenceKeys:'[dbo].[UserToTag].TagID=[dbo].[Tag].ID'},
            {joinTable:'[dbo].[Category]',referenceKeys:'[dbo].[Category].ID=[dbo].[Tag].CategoryID'}
            ],
            `UserToTag.Username='${username}' Group By Tag.CategoryID`,
            "'Count' DESC"
            );

            let result = await dbDrive.executeQuery(weightedCategoriesQuery);

            let weightedCategoriesResult = result[0];

            
            if(weightedCategoriesResult.length == 0){
                let result = await dbDrive.executeQuery(randomRecommendQuery);

                return res.json(result[0]);
            } else {
                let results = [];

                let resultPromise = weightedCategoriesResult.map(async weightedPair => {
                    let eventsResult = await dbDrive.executeQuery(`SELECT TOP ${weightedPair.Count} * FROM [dbo].[Event] 
                                        WHERE CategoryID=${weightedPair.CategoryID} AND EndTime > CURRENT_TIMESTAMP
                                        ORDER BY NEWID()`);

                        if(eventsResult[0].length > 0){
                            eventsResult[0].map( event => {

                                results.push(event);

                            });
                        }
                });
                    
                await Promise.all(resultPromise);

                return res.json(results);

            }
            
        }
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





