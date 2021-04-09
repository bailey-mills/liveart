const DbDrive = require('../dal/dbDrive');
const QueryBuilder = require('../dal/queryBuilder');

let dbDrive = new DbDrive();
let queryBuilder = new QueryBuilder();

module.exports = class EventController {    
    
    getRecommendEvents = async (req, res) => {

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

    getSubscribedEvents = async (req, res) => {
        /*
            [
                {
                    EventID,
                    EventName,
                    EventDescribition,
                    EventTime,
                    EventTags,
                    EventHostUsername
                }
            ]
        */
        
        let result = await dbDrive.executeQuery('');
        return res.json(result[0])
    }
    
    getPlannedEvents = async (req, res) => {
        let username = req.params.username;
            
        // GET PLANNED EVENTS
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

        let ret = plannedEvents[0];
        if (ret.length > 0) {
            ret = ret[0];
        }
        
        return res.json(ret);
    }
    
    createEvent = async (req, res) => {
        /*
        [
            {
                EventTitle,
                StartTime,
                EndTime,
                HostUsername,
                Items: [
                    {
                        Name
                        Description:
                        BasePrice:
                        URL:
                        Tags: [
                            {
                                ID,
                                Name,
                                Description
                            }
                        ]
                    }
                ]
            }
        ]
        */
       
        let result = await dbDrive.executeQuery('');
        return res.json(result[0])
    }

    /*
    activeEvents = async (req, res) => {

         let result = await dbDrive.executeQuery('SELECT * from Event Where StartTime < CURRENT_TIMESTAMP AND EndTime > CURRENT_TIMESTAMP');
         
         return res.json(result[0]);
    }
    */
}
