-- 		  FILENAME	:	DataGenerator_Test.sql
-- 		CREATED BY	:	Bailey Mills
-- 			  DATE	:	2021/02/20
-- 	   DESCRIPTION	:	Creates the table(s) to test the data generator (development purposes)

use master;
GO
DROP DATABASE IF EXISTS liveart_test;
GO
CREATE DATABASE liveart_test;
GO
USE liveart_test;

-- CREATE Tables
CREATE TABLE Person (
	ID int IDENTITY(1,1) PRIMARY KEY,
	FirstName nvarchar(50) NOT NULL,
	LastName nvarchar(50) NOT NULL,
	PostalCode nvarchar(50) NOT NULL,
	CityID nvarchar(50)
);
CREATE TABLE City (
	ID int IDENTITY(1,1) PRIMARY KEY,
	Name nvarchar(50) NOT NULL
);
CREATE TABLE Province (
	ID int IDENTITY(1,1) PRIMARY KEY,
	Name nvarchar(50) NOT NULL
);
GO