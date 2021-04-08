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


	DECLARE @averageEventValue FLOAT;
	DECLARE @totalEvents FLOAT;

	SELECT @grossRevenue AS 'GrossRevenue', @averageProductValue AS 'AverageProductValue';
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

	DECLARE @averageEventValue FLOAT;
	DECLARE @totalEvents FLOAT;

	SELECT @totalSpent AS 'TotalSpent', @averageProductPrice AS 'AverageProductPrice';
GO