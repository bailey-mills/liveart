const DbDrive = require('../dal/dbDrive');
const QueryBuilder = require('../dal/queryBuilder');
const moment = require('moment');

let dbDrive = new DbDrive();
let queryBuilder = new QueryBuilder();

class AuctionController {

    getHost = async (req, res) => {
        let eventID = req.params.eventID;

       let hostResult = await dbDrive.executeQuery(`SELECT ID, Username from [dbo].[User] JOIN SellerToEvent on [dbo].[User].ID=SellerToEvent.UserID 
       WHERE SellerToEvent.EventID=${eventID}`);


       res.send(hostResult[0]);
                
    }

    getEventProducts = async (req, res) => {
        let eventID = req.params.eventID;

        let productsQuery = queryBuilder.getFromjoin(['[dbo].[Product]'],['*'], [{
            joinTable: '[dbo].[ProductToEvent]', referenceKeys: 'Product.ID = ProductToEvent.ProductID'
        }], `ProductToEvent.EventID = ${eventID}`);

        let productsResult = await dbDrive.executeQuery(productsQuery);

        return res.send(productsResult[0]);
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

        res.status(204).send({});
     
        
    }


    createBid = async (req,res) => {
        let productID = req.params.productID;


        console.log(moment.utc().toDate());

    }

    createTransaction = async (req, res) => {
        let bidID = req.params.bidID;
        let isSold = req.query.IsSold;

        //update product table IsSold

        //update event table currentBiddingProductID

        //insert the bidID into transaction table
    }

}

module.exports = AuctionController;