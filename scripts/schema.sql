CREATE DATABASE LIVEART
GO

USE LIVEART
GO

-- Tables

CREATE TABLE dbo.[User] (
ID INT IDENTITY(1,1) PRIMARY KEY,
AddressID INT NOT NULL,
Email NVARCHAR(50) NOT NULL,
Password NVARCHAR(70) NOT NULL,
FirstName NVARCHAR(50),
LastName NVARCHAR(50),
Birthday DATE NOT NULL
)

GO

CREATE TABLE dbo.[Event](
ID INT IDENTITY(1,1) PRIMARY KEY,
Title NVARCHAR(50) NOT NULL,
Summary NVARCHAR(200),
StartTime DATETIME NOT NULL, 
EndTime DATETIME,
ThumbNailURL NVARCHAR(400)
)

GO

CREATE TABLE dbo.[Product](
ID INT IDENTITY(1,1) PRIMARY KEY,
Name NVARCHAR(50) NOT NULL,
SellerID INT NOT NULL,
Summary NVARCHAR(200),
PreviewURL NVARCHAR(400),
BasePrice FLOAT NOT NULL,
IsSold BIT NOT NULL
)

GO

CREATE TABLE dbo.[Tag](
ID INT IDENTITY(1,1) PRIMARY KEY, 
Name NVARCHAR(50) NOT NULL,
Summary NVARCHAR(200),
)

GO


CREATE TABLE dbo.[Address](
ID INT IDENTITY(1,1) PRIMARY KEY,
Address NVARCHAR(50) NOT NULL,
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
TagID INT NOT NULL,
UserID INT NOT NULL
)

GO

CREATE TABLE dbo.[SellerToEvent](
UserID INT NOT NULL,
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

ALTER TABLE dbo.[Product] WITH CHECK ADD CONSTRAINT [FK_Seller_Key] FOREIGN KEY(SellerID)
REFERENCES dbo.[User] (ID)
go
ALTER TABLE dbo.[Product] CHECK CONSTRAINT [FK_Seller_Key]
go


-- Intermediate Tables

ALTER TABLE dbo.[UserToTag] WITH CHECK ADD CONSTRAINT [FK_TagOfUser_Key] FOREIGN KEY(TagID)
REFERENCES dbo.[Tag] (ID)
go
ALTER TABLE dbo.[UserToTag] CHECK CONSTRAINT [FK_TagOfUser_Key]
go
ALTER TABLE dbo.[UserToTag] WITH CHECK ADD CONSTRAINT [FK_UserOfTag_Key] FOREIGN KEY(UserID)
REFERENCES dbo.[User] (ID)
go
ALTER TABLE dbo.[UserToTag] CHECK CONSTRAINT [FK_UserOfTag_Key]
go


ALTER TABLE dbo.[SellerToEvent] WITH CHECK ADD CONSTRAINT [FK_SellerOfEvent_Key] FOREIGN KEY(UserID)
REFERENCES dbo.[User] (ID)
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


-- Tags
INSERT INTO [dbo].[Tag] (Name) VALUES ('Realism'),('Photorealism'),('Abstraction'),
('Impressionism'),('Expressionism'),('Painterly'),
('Handcraft'),('Sculpture'),('Flower bouquet'),('Bonsai');


-- Events
Insert into [dbo].[Event] (Title, ThumbNailURL) VALUES ('event1', 'https://kwag.ca/sites/default/files/styles/homepage_slider/public/slider-images/untitled-28.jpg?itok=pd3GJKUg'),
 ('event2', 'https://www.tucmag.net/wp-content/uploads/2018/06/HK_Overview_Exhibitors.jpg'),
  ('event3', 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F84129047%2F197010627980%2F1%2Foriginal.20191210-163245?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C55%2C2414%2C1207&s=70cba5c497adc17584d57e5818c55872');

-- reset auto increment IDs
-- DBCC CHECKIDENT ('Province', RESEED, 0);