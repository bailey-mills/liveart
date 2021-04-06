CREATE DATABASE LIVEART
GO

USE LIVEART
GO

-- Tables

CREATE TABLE dbo.[User] (
ID INT IDENTITY(1,1),  
Username NVARCHAR(50)  PRIMARY KEY NOT NULL,
Password NVARCHAR(70) NOT NULL,
Email NVARCHAR(50) NOT NULL,
AddressID INT NOT NULL,
Birthday DATE NOT NULL
)

GO

CREATE TABLE dbo.[Event](
ID INT IDENTITY(1,1) PRIMARY KEY,
Title NVARCHAR(50) NOT NULL,
Summary NVARCHAR(200),
StartTime DATETIME, 
EndTime DATETIME,
ThumbNailURL NVARCHAR(400),
CategoryID INT
)

GO

CREATE TABLE dbo.[Product](
ID INT IDENTITY(1,1) PRIMARY KEY,
Name NVARCHAR(50) NOT NULL,
SellerUsername NVARCHAR(50) NOT NULL,
Summary NVARCHAR(200),
PreviewURL NVARCHAR(400),
BasePrice FLOAT NOT NULL,
IsSold BIT NOT NULL
)

GO

CREATE TABLE dbo.[Tag](
ID INT IDENTITY(1,1) PRIMARY KEY, 
Name NVARCHAR(50) NOT NULL,
CategoryID INT NOt NULL
)


CREATE TABLE dbo.[Category](
ID INT IDENTITY(1,1) PRIMARY KEY,
Name NVARCHAR(50) NOT NULL
)

GO


CREATE TABLE dbo.[Address](
ID INT IDENTITY(1,1) PRIMARY KEY,
Street NVARCHAR(50) NOT NULL,
City NVARCHAR(50) NOT NULL,
ProvinceID INT NOT NULL,
PostalCode NVARCHAR(50) NOT NULL
)

GO

CREATE TABLE dbo.[Province](
ID INT IDENTITY(1,1) PRIMARY KEY,
Name NVARCHAR(50) NOT NULL
)

GO

CREATE TABLE dbo.[UserToTag](
Username NVARCHAR(50) NOT NULL,
TagID INT NOT NULL

)

GO

CREATE TABLE dbo.[SellerToEvent](
SellerUsername NVARCHAR(50) NOT NULL,
EventID INT NOT NULL
)

GO

CREATE TABLE dbo.[ProductToEvent](
EventID INT NOT NULL,
ProductID INT NOT NULL
)

GO

CREATE TABLE dbo.[ProductToTag](
TagID INT NOT NULL,
ProductID INT NOT NULL
)

GO



-- Foreign Keys

ALTER TABLE dbo.[User] WITH CHECK ADD CONSTRAINT [FK_Address_Key] FOREIGN KEY(AddressID)
REFERENCES dbo.[Address] (ID)
go
ALTER TABLE dbo.[User] CHECK CONSTRAINT [FK_Address_Key]
go

ALTER TABLE dbo.[Address] WITH CHECK ADD CONSTRAINT [FK_Province_Key] FOREIGN KEY(ProvinceID)
REFERENCES dbo.[Province] (ID)
go
ALTER TABLE dbo.[Address] CHECK CONSTRAINT [FK_Province_Key]
go

ALTER TABLE dbo.[Product] WITH CHECK ADD CONSTRAINT [FK_Seller_Key] FOREIGN KEY(SellerUsername)
REFERENCES dbo.[User] (Username)
go
ALTER TABLE dbo.[Product] CHECK CONSTRAINT [FK_Seller_Key]
go

ALTER TABLE dbo.[Tag] WITH CHECK ADD CONSTRAINT [FK_CategoryOfTag_Key] FOREIGN KEY(CategoryID)
REFERENCES dbo.[Category] (ID)
go
ALTER TABLE dbo.[Tag] CHECK CONSTRAINT [FK_CategoryOfTag_Key]
go

ALTER TABLE dbo.[Event] WITH CHECK ADD CONSTRAINT [FK_CategoryOfEvent_Key] FOREIGN KEY(CategoryID)
REFERENCES dbo.[Category] (ID)
go
ALTER TABLE dbo.[Event] CHECK CONSTRAINT [FK_CategoryOfEvent_Key]
go


-- Intermediate Tables

ALTER TABLE dbo.[UserToTag] WITH CHECK ADD CONSTRAINT [FK_TagOfUser_Key] FOREIGN KEY(TagID)
REFERENCES dbo.[Tag] (ID)
go
ALTER TABLE dbo.[UserToTag] CHECK CONSTRAINT [FK_TagOfUser_Key]
go
ALTER TABLE dbo.[UserToTag] WITH CHECK ADD CONSTRAINT [FK_UserOfTag_Key] FOREIGN KEY(Username)
REFERENCES dbo.[User] (Username)
go
ALTER TABLE dbo.[UserToTag] CHECK CONSTRAINT [FK_UserOfTag_Key]
go


ALTER TABLE dbo.[SellerToEvent] WITH CHECK ADD CONSTRAINT [FK_SellerOfEvent_Key] FOREIGN KEY(SellerUsername)
REFERENCES dbo.[User] (Username)
go
ALTER TABLE dbo.[SellerToEvent] CHECK CONSTRAINT [FK_SellerOfEvent_Key]
go
ALTER TABLE dbo.[SellerToEvent] WITH CHECK ADD CONSTRAINT [FK_EventOfSeller_Key] FOREIGN KEY(EventID)
REFERENCES dbo.[Event] (ID)
go
ALTER TABLE dbo.[SellerToEvent] CHECK CONSTRAINT [FK_EventOfSeller_Key]
go


ALTER TABLE dbo.[ProductToEvent] WITH CHECK ADD CONSTRAINT [FK_EventOfProduct_Key] FOREIGN KEY(EventID)
REFERENCES dbo.[Event] (ID)
go
ALTER TABLE dbo.[ProductToEvent] CHECK CONSTRAINT [FK_EventOfProduct_Key]
go
ALTER TABLE dbo.[ProductToEvent] WITH CHECK ADD CONSTRAINT [FK_ProductOfEvent_Key] FOREIGN KEY(ProductID)
REFERENCES dbo.[Product] (ID)
go
ALTER TABLE dbo.[ProductToEvent] CHECK CONSTRAINT [FK_ProductOfEvent_Key]
go


ALTER TABLE dbo.[ProductToTag] WITH CHECK ADD CONSTRAINT [FK_TagOfProduct_Key] FOREIGN KEY(TagID)
REFERENCES dbo.[Tag] (ID)
go
ALTER TABLE dbo.[ProductToTag] CHECK CONSTRAINT [FK_TagOfProduct_Key]
go
ALTER TABLE dbo.[ProductToTag] WITH CHECK ADD CONSTRAINT [FK_ProductOfTag_Key] FOREIGN KEY(ProductID)
REFERENCES dbo.[Product] (ID)
go
ALTER TABLE dbo.[ProductToTag] CHECK CONSTRAINT [FK_ProductOfTag_Key]
go


-- Provinces
INSERT INTO [dbo].[Province] (Name) VALUES ('Ontario'),('Quebec'),('Nova Scotia'),
('New Brunswick'),('Manitoba'),('British Columbia'),
('Prince Edward Island'),('Saskatchewan'),('Alberta'),
('Newfoundland and Labrador'),('Northwest Territories'),('Yukon'),('Nunavut');
go

-- Tag Group
INSERT INTO [dbo].[Category] (Name) VALUES ('Painting'),('Sculpture'),('Flower'),('Handicraft');


-- Tags
INSERT INTO [dbo].[Tag] (Name, CategoryID) VALUES 
('Realism', 1),('Photorealism', 1),('Abstraction', 1), ('Impressionism',1),
('Expressionism', 1),('Painterly', 1),('Oil Painting',1),('Sand Painting',1),
('Humanoid Figure',2),('Wooden Statue', 2),('Metallic Sculpture', 2),('Classic Sculpture', 2),('Abstract Sculpture', 2),
('Flower bouquet',3),('Pot Plant',3),('Artifical Bonsai', 3),
('Art Doll',4),('Glass Art Work', 4), ('Jade Art Work', 4), ('Embroidery', 4), ('Cutlery', 4);
go



-- Events
Insert into [dbo].[Event] (Title, StartTime, EndTime, ThumbNailURL, CategoryID) VALUES ('event1', '20210321 10:00:00 AM', '20220321 10:00:00 AM','https://kwag.ca/sites/default/files/styles/homepage_slider/public/slider-images/untitled-28.jpg?itok=pd3GJKUg', 1),
 ('event2', '20210321 10:00:00 AM', '20220321 10:00:00 AM','https://www.tucmag.net/wp-content/uploads/2018/06/HK_Overview_Exhibitors.jpg', 1),
  ('event3', '20210321 10:00:00 AM', '20220321 10:00:00 AM','https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F84129047%2F197010627980%2F1%2Foriginal.20191210-163245?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C55%2C2414%2C1207&s=70cba5c497adc17584d57e5818c55872', 1);
go

  -- Insert into Event (Title, StartTime, EndTime, CategoryID) values 
  -- ('event4', '2021-03-21 10:00:00.000', '2022-03-21 10:00:00.000',1),
  -- ('event5', '2021-03-21 10:00:00.000', '2022-03-21 10:00:00.000',1),
  -- ('event6', '2021-03-21 10:00:00.000', '2022-03-21 10:00:00.000',1),
  -- ('event7', '2021-03-21 10:00:00.000', '2022-03-21 10:00:00.000',1),
  -- ('event8', '2021-03-21 10:00:00.000', '2022-03-21 10:00:00.000',2),
  -- ('event9', '2021-03-21 10:00:00.000', '2022-03-21 10:00:00.000',2),
  -- ('event10', '2021-03-21 10:00:00.000', '2022-03-21 10:00:00.000',2),
  -- ('event11', '2021-03-21 10:00:00.000', '2022-03-21 10:00:00.000',2),
  -- ('event12', '2021-03-21 10:00:00.000', '2022-03-21 10:00:00.000',3),
  -- ('event13', '2021-03-21 10:00:00.000', '2022-03-21 10:00:00.000',3),
  -- ('event14', '2021-03-21 10:00:00.000', '2022-03-21 10:00:00.000',3),
  -- ('event15', '2021-03-21 10:00:00.000', '2022-03-21 10:00:00.000',4),
  -- ('event16', '2021-03-21 10:00:00.000', '2022-03-21 10:00:00.000',4),
  -- ('event17', '2021-03-21 10:00:00.000', '2022-03-21 10:00:00.000',4),
  -- ('event18', '2021-03-21 10:00:00.000', '2022-03-21 10:00:00.000',4);
  -- go


 

-- reset auto increment IDs
-- DBCC CHECKIDENT ('Province', RESEED, 0);