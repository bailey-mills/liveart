use LIVEART;

DROP PROCEDURE IF EXISTS GetAnalyticsArtist;
GO
CREATE PROCEDURE GetAnalyticsArtist @userID int
AS
	DECLARE @grossRevenue FLOAT;
	SET @grossRevenue = (
		SELECT SUM(B.Amount) FROM [dbo].[Bid] B
			JOIN [Transaction] T ON T.BidID = B.ID
			JOIN [SellerToEvent] SE ON SE.UserID = @userID AND SE.EventID = B.EventID
			WHERE SE.UserID = @userID
	);
	
	DECLARE @averageProductValue FLOAT;
	SET @averageProductValue = (
		SELECT AVG(B.Amount) FROM [dbo].[Bid] B
			JOIN [Transaction] T ON T.BidID = B.ID
			JOIN [SellerToEvent] SE ON SE.UserID = @userID AND SE.EventID = B.EventID
			WHERE SE.UserID = @userID
	);
	
	DECLARE @sumOfBaseValues FLOAT;
	SET @sumOfBaseValues = (
		SELECT SUM(P.BasePrice) FROM [dbo].[Bid] B
			JOIN [Transaction] T ON T.BidID = B.ID
			JOIN [SellerToEvent] SE ON SE.UserID = @userID AND SE.EventID = B.EventID
			JOIN [Product] P ON P.ID = B.ProductID
			WHERE SE.UserID = @userID
	);

	SELECT @grossRevenue AS 'GrossRevenue', @averageProductValue AS 'AverageProductValue', @sumOfBaseValues AS 'SumBaseValue';
GO




DROP PROCEDURE IF EXISTS GetAnalyticsBuyer;
GO
CREATE PROCEDURE GetAnalyticsBuyer @userID int
AS
	DECLARE @totalSpent FLOAT;
	SET @totalSpent = (
		SELECT SUM(B.Amount) FROM [dbo].[Transaction] T
			JOIN [Bid] B ON B.ID = T.BidID
			WHERE B.UserID = @userID
	);
	
	DECLARE @averageProductPrice FLOAT;
	SET @averageProductPrice = (
		SELECT AVG(B.Amount) FROM [dbo].[Transaction] T
			JOIN [Bid] B ON B.ID = T.BidID
			WHERE B.UserID = @userID
	);
	
	DECLARE @totalSpentBase FLOAT;
	SET @totalSpentBase = (
		SELECT SUM(P.BasePrice) FROM [dbo].[Transaction] T
			JOIN [Bid] B ON B.ID = T.BidID
			JOIN [Product] P ON P.ID = B.ProductID
			WHERE B.UserID = @userID
	);

	SELECT @totalSpent AS 'TotalSpent', @averageProductPrice AS 'AverageProductPrice', @totalSpentBase AS 'TotalSpentBase';
GO