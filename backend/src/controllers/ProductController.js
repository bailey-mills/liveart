const DbDrive = require('../dal/dbDrive');
const QueryBuilder = require('../dal/queryBuilder');

let dbDrive = new DbDrive();
let queryBuilder = new QueryBuilder();

module.exports = class ProductController {    
    async methodSoldProducts(username) {
        // GET SOLD PRODUCTS
        let soldProducts = await dbDrive.executeQuery(
            "SELECT P.ID, P.Name, P.Summary AS 'ProductDescription', P.PreviewURL AS 'ProductURL', P.BasePrice, B.Amount AS 'FinalPrice', SE.EventID, E.Title AS 'EventName', E.StartTime, E.EndTime, U.Username AS 'EventHostUsername' " + 
            "FROM [Product] P " +
            "JOIN [ProductToEvent] PE ON PE.ProductID = P.ID " + 
            "JOIN [Bid] B ON B.ProductID = P.ID " + 
            "JOIN [Transaction] T ON T.BidID = B.ID " + 
            "JOIN [SellerToEvent] SE ON SE.EventID = B.EventID " + 
            "JOIN [User] U ON U.ID = SE.UserID " + 
            "JOIN [Event] E ON E.ID = SE.EventID " + 
            "WHERE U.Username = '" + username + "'"
        );

        // GET PRODUCT TAGS
        if (soldProducts[0].length > 0) {
            let i = 0;
            // Get the tags for each product
            for (i = 0; i < soldProducts[0].length; i++) {
                let product = soldProducts[0][i];
                let productID = product.ID;
                let productTags = await dbDrive.executeQuery(
                    "SELECT T.ID, T.Name " + 
                    "FROM [ProductToTag] PT " +
                    "JOIN [Tag] T ON T.ID = PT.TagID " + 
                    "WHERE PT.ProductID = " + productID
                );
                if (productTags[0].length > 0) {
                    soldProducts[0][i].Tags = productTags[0];
                }
            }
        }

        return soldProducts;
    }

    getSoldProducts = async (req, res) => {
        let username = req.params.username;

        // GET SOLD PRODUCTS
        let soldProducts = await this.methodSoldProducts(username);

        return res.json(soldProducts[0]);
    }

    getPurchasedProducts = async (req, res) => {
        /*
            [
                {
                    ProductID,
                    ProductName,
                    ProductDescription,
                    ProductURL,
                    ProductBasePrice,
                    **ProductTradedPrice,
                    ProductSeller
                    ProductSoldEvent { 
                        EventID,
                        EventName,
                        EventDescribition,
                        EventTime,
                        EventTags,
                        EventHostUsername
                    }
                }
            ]

            SELECT P.ID, P.Name, P.Summary AS 'ProductDescription', P.PreviewURL AS 'ProductURL', P.BasePrice, B.Amount AS 'FinalPrice', USeller.Username AS 'ProductSellerUsername', E.ID AS 'EventID', E.Title AS 'EventName', E.StartTime, E.EndTime, C.ID AS 'CategoryID', C.Name AS 'CategoryName'
                FROM [Product] P
                JOIN [Bid] B ON B.ProductID = P.ID
                JOIN [Transaction] T ON T.BidID = B.ID
                JOIN [User] UBuyer ON UBuyer.ID = B.UserID
                JOIN [Event] E ON E.ID = B.EventID
                JOIN [SellerToEvent] SE ON SE.EventID = E.ID
                JOIN [User] USeller ON USeller.ID = SE.UserID
                JOIN [Category] C ON C.ID = E.CategoryID
                WHERE UBuyer.Username = 'Jolyn_Kleinberger_897'
        */
        let username = req.params.username;

        // GET PURCHASED PRODUCTS
        let purchasedProducts = await dbDrive.executeQuery(
            "SELECT P.ID, P.Name, P.Summary AS 'ProductDescription', P.PreviewURL AS 'ProductURL', P.BasePrice, " +
                "B.Amount AS 'FinalPrice', USeller.Username AS 'ProductSellerUsername', E.ID AS 'EventID', E.Title AS 'EventName', " +
                "E.StartTime, E.EndTime, C.ID AS 'CategoryID', C.Name AS 'CategoryName' " + 
            "FROM [Product] P " +
            "JOIN [Bid] B ON B.ProductID = P.ID " + 
            "JOIN [Transaction] T ON T.BidID = B.ID " + 
            "JOIN [User] UBuyer ON UBuyer.ID = B.UserID " + 
            "JOIN [Event] E ON E.ID = B.EventID " + 
            "JOIN [SellerToEvent] SE ON SE.EventID = E.ID " + 
            "JOIN [User] USeller ON USeller.ID = SE.UserID " + 
            "JOIN [Category] C ON C.ID = E.CategoryID " + 
            "WHERE UBuyer.Username = '" + username + "'"
        );

        // GET PRODUCT TAGS
        if (purchasedProducts[0].length > 0) {
            let i = 0;
            // Get the tags for each product
            for (i = 0; i < purchasedProducts[0].length; i++) {
                let product = purchasedProducts[0][i];
                let productID = product.ID;
                let productTags = await dbDrive.executeQuery(
                    "SELECT T.ID, T.Name " + 
                    "FROM [ProductToTag] PT " +
                    "JOIN [Tag] T ON T.ID = PT.TagID " + 
                    "WHERE PT.ProductID = " + productID
                );
                if (productTags[0].length > 0) {
                    purchasedProducts[0][i].Tags = productTags[0];
                }
            }
        }

        return res.json(purchasedProducts[0])
    }
}
