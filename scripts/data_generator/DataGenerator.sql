-- 		  FILENAME	:	DataGenerator.sql
-- 		CREATED BY	:	Bailey Mills
-- 			  DATE	:	2021/02/20
-- 	   DESCRIPTION	:	Tables and stored procedures used by the Data Generator application to fill the application with useful sample data.

use master;
GO
DROP DATABASE IF EXISTS liveart_dg;
GO
CREATE DATABASE liveart_dg;
GO
USE liveart_dg;

-- [liveart_dg] Stored Procedures
-- GET TABLES
DROP PROCEDURE IF EXISTS GetTables;
GO
CREATE PROCEDURE GetTables @db nvarchar(50)
AS
	EXEC ('USE ' + @db);
	SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE'
GO

-- CREATE Stored Procedures
-- GET ROWS
DROP PROCEDURE IF EXISTS GetRows;
GO
CREATE PROCEDURE GetRows @Requests int, @SampleRows int, @Table nvarchar(50), @Column nvarchar(50)
AS
	DECLARE @loops int = @Requests / @SampleRows;
	DECLARE @extra int = @Requests % @SampleRows;

	if @extra <> 0
		SET @loops = @loops + 1;

	DECLARE @i int = 0;
	DECLARE @total int = 0;
	DECLARE @curr int = 0;

	CREATE TABLE #temptable (Value nvarchar(50));

	WHILE @i < @loops
	BEGIN
		-- Determine how many rows to pull (set to max, unless on the last loop and less are needed)
		SET @curr = @SampleRows;
		if @extra <> 0 AND @i = @loops - 1
			SET @curr = @extra;

		-- INSERT into temporary table
		EXEC('USE [liveart_dg]; INSERT INTO #temptable SELECT TOP (' + @curr + ') ' + @Column + ' FROM [dbo].[' + @Table + '] ORDER BY NEWID()');

		-- Increment loop counter
		SET @i = @i + 1;
	END;

	SELECT * FROM #temptable;

	DROP TABLE #temptable;
GO
