const DbDrive = require('../dal/dbDrive');
const QueryBuilder = require('../dal/queryBuilder');
const moment = require('moment');
const e = require('express');

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
        let username = req.params.username;

        // Limit data to between 7 days ago, and 14 days ahead
        let dateRange = this.getDateRange(3, 7);

        // GET SUBSCRIBED EVENTS
        let subscribedEvents = await dbDrive.executeQuery(
            "SELECT E.ID AS 'EventID', E.Title AS 'EventName', E.StartTime, E.EndTime, E.CategoryID, C.Name AS 'CategoryName', USeller.Username AS 'EventHostUsername' " + 
            "FROM [Event] E " +
            "JOIN [SellerToEvent] SE ON SE.EventID = E.ID " + 
            "JOIN [Category] C ON C.ID = E.CategoryID " + 
            "JOIN [Subscription] S ON S.TargetUserID = SE.UserID " + 
            "JOIN [User] UBuyer ON UBuyer.ID = S.UserID " + 
            "JOIN [User] USeller ON USeller.ID = SE.UserID " + 
            "WHERE UBuyer.Username = '" + username + "' " +
            `AND E.StartTime > '${dateRange.daysBack}' ` +
            `AND E.StartTime < '${dateRange.daysForward}'`
        );
        
        // GET EVENT TAGS (from each product in the event(s))
        subscribedEvents = await this.methodEventTags(subscribedEvents);

        // ORGANIZE EVENTS
        subscribedEvents = await this.methodOrganizeEvents(subscribedEvents);

        return res.json(subscribedEvents);
    }
    
    getPlannedEvents = async (req, res) => {
        let username = req.params.username;
            
        // GET PLANNED EVENTS
        let plannedEvents = await this.methodPlannedEvents(username);
        return res.json(plannedEvents);
    }

    async methodEventTags(eventList) {
        // Get the tags for each product in each event in the array of events
        if (eventList[0].length > 0) {
            let i = 0;
            for (i = 0; i < eventList[0].length; i++) {
                let event = eventList[0][i];
                let eventID = event.EventID;
                let eventProductTags = await dbDrive.executeQuery(
                    "SELECT T.ID, T.Name " + 
                    "FROM [ProductToTag] PT " +
                    "JOIN [Tag] T ON T.ID = PT.TagID " + 
                    "JOIN [ProductToEvent] PE ON PE.ProductID = PT.ProductID " + 
                    "WHERE PE.EventID = " + eventID
                );
                if (eventProductTags[0].length > 0) {
                    eventList[0][i].EventTags = eventProductTags[0];
                }
            }
        }

        return eventList;
    }

    async methodPlannedEvents(username) {
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
        plannedEvents = await this.methodEventTags(plannedEvents);

        // Organize these events into past/active/upcoming events
        plannedEvents = await this.methodOrganizeEvents(plannedEvents);

        return plannedEvents;
    }
    
    async methodOrganizeEvents(eventListReference) {
        let eventList = {
            PastEvents: [],
            ActiveEvents: [],
            UpcomingEvents: []
        };

        if (eventListReference[0].length > 0) {
            let i = 0;
            for (i = 0; i < eventListReference[0].length; i++) {
                let event = eventListReference[0][i];

                let startTime = moment(event.StartTime);
                let endTime = moment(event.EndTime);
                let now = moment();

                // Past event
                if (now > endTime) {
                    eventList.PastEvents.push(eventListReference[0][i]);
                }
                // Upcoming event
                else if (now < startTime) {
                    eventList.UpcomingEvents.push(eventListReference[0][i]);
                }
                // Active event
                else {
                    eventList.ActiveEvents.push(eventListReference[0][i]);
                }
            }

            // Sort lists of events based on what is needed
            eventList.PastEvents.sort(function(a, b) {
                return moment(b.StartTime) - moment(a.StartTime);
            });
            eventList.ActiveEvents.sort(function(a, b) {
                return moment(a.StartTime) - moment(b.StartTime);
            });
            eventList.UpcomingEvents.sort(function(a, b) {
                return moment(a.StartTime) - moment(b.StartTime);
            });
        }

        return eventList;
    }

    getDateRange(daysBack, daysForward) {        
        return { 
            daysBack: moment().utc().subtract(daysBack, 'days').toISOString(), 
            daysForward: moment().utc().add(daysForward, 'days').toISOString()
        };
    }

    createEvent = async (req, res) => {
        let event = req.body;

        let valid = true;
        // Validate Event
        if (event) {
            // title
            if (!event.EventTitle || event.EventTitle.length <= 0) {
                valid = false;
            }
            // starttime
            if (!event.StartTime || !moment(event.StartTime).isValid) {
                valid = false;
            }
            // endtime
            if (!event.EndTime || !moment(event.EndTime).isValid) {
                valid = false;
            }
            // url
            if (!event.ThumbnailURL || event.ThumbnailURL.length <= 0) {
                valid = false;
            }
            // categoryid
            if (event.CategoryID) {
                let testCategoryID = await dbDrive.executeQuery(`SELECT TOP 1 ID FROM [Category] WHERE ID = ${event.CategoryID}`);
                if (testCategoryID[0].length <= 0) {
                    valid = false;
                }
            }
            else {
                valid = false;
            }
        }
        else {
            valid = false;
        }

        // Validate products
        if (valid && event.Items.length > 0) {
            let products = event.Items;
            if (!products || products.length <= 0 || !products.length) {
                valid = false;
            }
            else {
                let i = 0;
                for (i = 0; i < products.length; i++) {
                    let product = products[i];
                    // name
                    if (!product.Name || product.Name.length <= 0) {
                        valid = false;
                    }
                    // description
                    if (!product.Description || product.Description.length <= 0) {
                        valid = false;
                    }
                    // base price
                    if (!product.BasePrice || product.BasePrice <= 0) {
                        valid = false;
                    }
                    // url
                    if (!product.URL || product.URL.length <= 0) {
                        valid = false;
                    }
                    // tags
                    if (!product.Tags || product.Tags.length <= 0 || !product.Tags.length) {
                        valid = false;
                    }
                    else {
                        let j = 0;
                        for (j = 0; j < product.Tags.length; j++) {
                            let tag = product.Tags[j];
                            let tagID = await dbDrive.executeQuery(`SELECT TOP 1 ID FROM [Tag] WHERE ID = ${tag.ID}`);
                            if (tagID[0].length <= 0) {
                                valid = false;
                            }
                        }
                    }
                }
            }
        }
        else {
            valid = false;
        }

        if (!valid) {
            return res.status(400).send({message: 'Invalid input'});
        }
        
        // Input looks valid, insert the event
        let userID = req.session.userID;

        if (userID && userID > 0) {
            // EVENT
            let eventID = await dbDrive.executeQuery(`INSERT INTO [Event] (Title, Summary, StartTime, EndTime, ThumbnailURL, CategoryID) OUTPUT Inserted.ID VALUES ('${event.EventTitle}', '', '${event.StartTime}', '${event.EndTime}', '${event.ThumbnailURL}', ${event.CategoryID})`);
            eventID = eventID[0][0].ID;
            
            // PRODUCT
            let i = 0;
            for (i = 0; i < event.Items.length; i++) {
                let product = event.Items[i];
                let productID = await dbDrive.executeQuery(`INSERT INTO [Product] (Name, SellerID, Summary, PreviewURL, BasePrice, IsSold) OUTPUT Inserted.ID VALUES ('${product.Name}', ${userID}, '${product.Description}','${product.URL}', ${product.BasePrice}, 0)`);
                productID = productID[0][0].ID;

                // PRODUCT TO TAG
                let j = 0;
                for (j = 0; j < product.Tags.length; j++) {
                    let tag = product.Tags[j];
                    await dbDrive.executeQuery(`INSERT INTO [ProductToTag] (TagID, ProductID) VALUES (${tag.ID}, ${productID})`);
                }
        
                // PRODUCT TO EVENT
                await dbDrive.executeQuery(`INSERT INTO [ProductToEvent] (EventID, ProductID) VALUES (${eventID}, ${productID})`);                
            }

            // SELLER TO EVENT
            await dbDrive.executeQuery(`INSERT INTO [SellerToEvent] (UserID, EventID) VALUES (${userID}, ${eventID})`);
        }
        else {
            return res.status(400).send({message: 'Missing userID session variable'});
        }
        
        return res.json({ message: "Event Created" });
    }
}
