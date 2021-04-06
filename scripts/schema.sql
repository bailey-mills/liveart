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
	Username NVARCHAR(50) NOT NULL,
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

CREATE TABLE dbo.[SocialMediaLinks](
	UserID INT NOT NULL,
	Twitter NVARCHAR(100),
	Instagram NVARCHAR(100),
	Pinterest NVARCHAR(100)
)

GO

CREATE TABLE dbo.[Subscription](
	UserID INT NOT NULL,
	TargetUserID INT NOT NULL
)

GO

CREATE TABLE dbo.[Bid](
	ID INT IDENTITY(1,1) PRIMARY KEY,
	ProductID INT NOT NULL,
	EventID INT NOT NULL,
	UserID INT NOT NULL,
	Amount FLOAT NOT NULL,
	Timestamp DATETIME
)

GO

CREATE TABLE dbo.[Transaction](
	ID INT IDENTITY(1,1) PRIMARY KEY,
	BidID INT NOT NULL
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

ALTER TABLE dbo.[SocialMediaLinks] WITH CHECK ADD CONSTRAINT [FK_SocialMediaLinks_UserID] FOREIGN KEY(UserID)
REFERENCES dbo.[User] (ID)
go
ALTER TABLE dbo.[SocialMediaLinks] CHECK CONSTRAINT [FK_SocialMediaLinks_UserID]
go

ALTER TABLE dbo.[Subscription] WITH CHECK ADD CONSTRAINT [FK_Subscription_UserID] FOREIGN KEY(UserID)
REFERENCES dbo.[User] (ID)
go
ALTER TABLE dbo.[Subscription] CHECK CONSTRAINT [FK_Subscription_UserID]
go
ALTER TABLE dbo.[Subscription] WITH CHECK ADD CONSTRAINT [FK_Subscription_TargetUserID] FOREIGN KEY(TargetUserID)
REFERENCES dbo.[User] (ID)
go
ALTER TABLE dbo.[Subscription] CHECK CONSTRAINT [FK_Subscription_TargetUserID]
go

ALTER TABLE dbo.[Bid] WITH CHECK ADD CONSTRAINT [FK_Bid_ProductID] FOREIGN KEY(ProductID)
REFERENCES dbo.[Product] (ID)
go
ALTER TABLE dbo.[Bid] CHECK CONSTRAINT [FK_Bid_ProductID]
go
ALTER TABLE dbo.[Bid] WITH CHECK ADD CONSTRAINT [FK_Bid_EventID] FOREIGN KEY(EventID)
REFERENCES dbo.[Event] (ID)
go
ALTER TABLE dbo.[Bid] CHECK CONSTRAINT [FK_Bid_EventID]
go
ALTER TABLE dbo.[Bid] WITH CHECK ADD CONSTRAINT [FK_Bid_UserID] FOREIGN KEY(UserID)
REFERENCES dbo.[User] (ID)
go
ALTER TABLE dbo.[Bid] CHECK CONSTRAINT [FK_Bid_UserID]
go

ALTER TABLE dbo.[Transaction] WITH CHECK ADD CONSTRAINT [FK_Transaction_BidID] FOREIGN KEY(BidID)
REFERENCES dbo.[Bid] (ID)
go
ALTER TABLE dbo.[Transaction] CHECK CONSTRAINT [FK_Transaction_BidID]
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

-- Tag Group
INSERT INTO [dbo].[Category] (Name) VALUES ('Painting'),('Sculpture'),('Flower'),('Handicraft');

-- Tags
INSERT INTO [dbo].[Tag] (Name, CategoryID) VALUES 
('Realism', 1),('Photorealism', 1),('Abstraction', 1), ('Impressionism',1),
('Expressionism', 1),('Painterly', 1),('Oil Painting',1),('Sand Painting',1),
('Humanoid Figure',2),('Wooden Statue', 2),('Metallic Sculpture', 2),('Classic Sculpture', 2),('Abstract Sculpture', 2),
('Flower bouquet',3),('Pot Plant',3),('Bonsai', 3),
('Art Doll',4),('Glass Art Work', 4), ('Jade Art Work', 4), ('Embroidery', 4), ('Cutlery', 4);
go
