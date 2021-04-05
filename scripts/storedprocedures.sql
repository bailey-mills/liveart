use LIVEART;

DROP PROCEDURE IF EXISTS GetAnalyticsArtist;
GO
CREATE PROCEDURE GetAnalyticsArtist
AS
	DECLARE @grossRevenue FLOAT;
	SET @grossRevenue = (
		SELECT SUM(Amount) FROM [dbo].[Transaction]
	);
	
	DECLARE @averageProductValue FLOAT;
	DECLARE @totalTransactions FLOAT;
	SET @totalTransactions = (
		SELECT Count(*) FROM [dbo].[Transaction]
	);
	SET @averageProductValue = @grossRevenue / @totalTransactions;


	DECLARE @averageEventValue FLOAT;
	DECLARE @totalEvents FLOAT;

	SELECT @grossRevenue AS 'GrossRevenue', @averageProductValue AS 'AverageProductValue';
GO