use LIVEART;

DROP PROCEDURE IF EXISTS GetAnalyticsArtist;
GO
CREATE PROCEDURE GetAnalyticsArtist @userID int
AS
	DECLARE @grossRevenue FLOAT;
	SET @grossRevenue = (
		SELECT SUM(Amount) FROM [dbo].[Transaction] WHERE ArtistID = @userID
	);
	
	DECLARE @averageProductValue FLOAT;
	DECLARE @totalTransactions FLOAT;
	SET @totalTransactions = (
		SELECT Count(*) FROM [dbo].[Transaction] WHERE ArtistID = @userID
	);
	SET @averageProductValue = @grossRevenue / @totalTransactions;


	DECLARE @averageEventValue FLOAT;
	DECLARE @totalEvents FLOAT;

	SELECT @grossRevenue AS 'GrossRevenue', @averageProductValue AS 'AverageProductValue';
GO




DROP PROCEDURE IF EXISTS GetAnalyticsBuyer;
GO
CREATE PROCEDURE GetAnalyticsBuyer @userID int
AS
	DECLARE @grossRevenue FLOAT;
	SET @grossRevenue = (
		SELECT SUM(Amount) FROM [dbo].[Transaction] WHERE BuyerID = @userID
	);
	
	DECLARE @averageProductValue FLOAT;
	DECLARE @totalTransactions FLOAT;
	SET @totalTransactions = (
		SELECT Count(*) FROM [dbo].[Transaction] WHERE BuyerID = @userID
	);
	SET @averageProductValue = @grossRevenue / @totalTransactions;


	DECLARE @averageEventValue FLOAT;
	DECLARE @totalEvents FLOAT;

	SELECT @grossRevenue AS 'GrossRevenue', @averageProductValue AS 'AverageProductValue';
GO