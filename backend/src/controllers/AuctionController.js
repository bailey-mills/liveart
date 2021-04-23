const DbDrive = require('../dal/dbDrive');
const QueryBuilder = require('../dal/queryBuilder');
const moment = require('moment');

let dbDrive = new DbDrive();
let queryBuilder = new QueryBuilder();

class AuctionController {

    getHost = async (req, res) => {
        let eventID = req.params.eventID;

       let hostResult = await dbDrive.executeQuery(`SELECT [dbo].[User].ID as EventID, [dbo].[User].Username, [dbo].[Event].Title as 'EventTitle', [dbo].[Event].Summary as 'EventSummary', C.Name as 'CategoryName'
       from [dbo].[User] 
       JOIN SellerToEvent on [dbo].[User].ID=SellerToEvent.UserID 
       JOIN [dbo].[Event] on SellerToEvent.EventID = [dbo].[Event].ID
       JOIN [dbo].[Category] C on C.ID = [Event].CategoryID
       WHERE SellerToEvent.EventID=${eventID}`);


       return res.send(hostResult[0]);
                
    }

    getEventProducts = async (req, res) => {
        let eventID = req.params.eventID;

        let productsQuery = queryBuilder.getFromjoin(['[dbo].[Product]'],['*'], [{
            joinTable: '[dbo].[ProductToEvent]', referenceKeys: 'Product.ID = ProductToEvent.ProductID'
        }], `ProductToEvent.EventID = ${eventID}`);

        let productsResult = await dbDrive.executeQuery(productsQuery);

        return res.send(productsResult[0]);
    }


    getEventTags = async (req, res) => {
        let eventID = req.params.eventID;
        let tagsOfEventQuery = `SELECT DISTINCT ID, Name FROM ProductToTag 
                                JOIN Tag on Tag.ID=ProductToTag.TagID
                                JOIN ProductToEvent on ProductToEvent.ProductID=ProductToTag.ProductID
                                WHERE ProductToEvent.EventID = ${eventID}`;
        let result = await dbDrive.executeQuery(tagsOfEventQuery);
        return res.status(200).send(result[0]);

    }


    getHighestBid = async (req, res) => {
        let productID = req.params.productID;

        if(!productID){
            return res.send([]);
        }

        let highestBidQuery = queryBuilder.getFromjoin(['Bid'], 
        ['TOP 1 Bid.ID','[dbo].[User].Username', '[dbo].[Bid].Amount', '[dbo].[Bid].Timestamp'],
        [{joinTable: '[dbo].[User]', referenceKeys: '[dbo].[User].ID = Bid.userID'}], 
        `Bid.ProductID = ${productID}`, '[dbo].[Bid].Amount DESC');

        let highestBidResult = await dbDrive.executeQuery(highestBidQuery);

        return res.send(highestBidResult[0]);
    }

    getCurrentProductID = async(req, res)=> {
        let eventID = req.params.eventID;

        let currentProductResult = await dbDrive.executeQuery(`SELECT CurrentBiddingProductID FROM Event WHERE ID = ${eventID}`);

        return res.send(currentProductResult[0]);
    }


    skipProduct = async (req, res) => {
        let eventID = req.params.eventID;
        // get the next productID of the event
        let nextProductIDResult = await dbDrive.executeQuery(`SELECT TOP 1 ProductID from ProductToEvent 
        Join Event on ProductToEvent.EventID =Event.ID WHERE Event.ID=${eventID} AND
        ProductToEvent.ProductID > (SELECT CurrentBiddingProductID FROM Event WHERE ID=${eventID})`);


        //update event table currentBiddingProductID to the nextProductID
        if(nextProductIDResult[0].length > 0){
            await dbDrive.executeQuery(`UPDATE Event 
            SET CurrentBiddingProductID=${nextProductIDResult[0][0].ProductID} WHERE ID=${eventID}`);
        } else {
            await dbDrive.executeQuery(`UPDATE Event SET CurrentBiddingProductID=NULL WHERE ID=${eventID}`);
        }

       return res.status(204).send({});
     
        
    }


    createBid = async (req,res) => {
        let productID = req.params.productID;
        let eventID = parseInt(req.body.EventID);
        let userID = parseInt(req.body.UserID);
        let amount = parseInt(req.body.Amount);
        let date = moment.utc(moment()).format("YYYY-MM-DD HH:mm:ss");
        
       // check base price and current highest bidding price
       let basePriceResult = await dbDrive.executeQuery(`SELECT BasePrice FROM [dbo].[Product] WHERE ID=${productID}`);
       let basePrice = basePriceResult[0][0].BasePrice;

       if(amount <= basePrice) {
           return res.status(400).send({message: 'Bidding price can not be lower than base price!'});
       }

       let curHighestBiddingPriceQuery = queryBuilder.getFromjoin(['Bid'], 
       ['TOP 1 Bid.ID','[dbo].[User].Username', '[dbo].[Bid].Amount', '[dbo].[Bid].Timestamp'],
       [{joinTable: '[dbo].[User]', referenceKeys: '[dbo].[User].ID = Bid.userID'}], 
       `Bid.ProductID = ${productID}`, '[dbo].[Bid].Amount DESC');
       let curHighestBiddingPriceResult = await dbDrive.executeQuery(curHighestBiddingPriceQuery);
       
       if(curHighestBiddingPriceResult[0].length > 0) {
           let curHighestBiddingPrice = curHighestBiddingPriceResult[0][0].Amount;

           if(amount <= curHighestBiddingPrice) {
               return res.status(400).send({message: 'Bidding price can not be lower than current highest price!'})
           }
       }


        let query = `INSERT INTO Bid (ProductID, EventID, UserID, Amount, Timestamp) 
        VALUES (${productID}, ${eventID}, ${userID}, ${amount}, '${date}')`;

        await dbDrive.executeQuery(query);


        return res.status(201).send({message:`Bid created!`});


    }

    createTransaction = async (req, res) => {
        let eventID = req.body.EventID;
        let bidID = req.body.BidID;

        //update product table IsSold
        await dbDrive.executeQuery(`UPDATE Product SET IsSold=1 WHERE ID=(SELECT ProductID FROM Bid WHERE ID = ${bidID})`);

        //update event table currentBiddingProductID if nextproductID is not null
        let nextProductIDResult = await dbDrive.executeQuery(`SELECT TOP 1 ProductID from ProductToEvent 
        Join Event on ProductToEvent.EventID =Event.ID WHERE Event.ID=${eventID} AND
        ProductToEvent.ProductID > (SELECT CurrentBiddingProductID FROM Event WHERE ID=${eventID})`);


        //update event table currentBiddingProductID to the nextProductID
        if(nextProductIDResult[0].length > 0){
            await dbDrive.executeQuery(`UPDATE Event 
            SET CurrentBiddingProductID=${nextProductIDResult[0][0].ProductID} WHERE ID=(SELECT EventID FROM Bid WHERE ID=${bidID})`);
        } else {
            await dbDrive.executeQuery(`UPDATE Event SET CurrentBiddingProductID=NULL WHERE ID=(SELECT EventID FROM Bid WHERE ID=${bidID})`);
        }
        //insert the bidID into transaction table
        await dbDrive.executeQuery(`INSERT INTO [dbo].[Transaction] (BidID) VALUES (${bidID})`);


        return res.status(201).send({message: 'transaction created!'});

    }

}

module.exports = AuctionController;