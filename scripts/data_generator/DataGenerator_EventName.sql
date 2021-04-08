use liveart_dg;

CREATE TABLE EventName (
    Value varchar(100) NOT NULL,
	CategoryID int
);

-- Categories
-- ID 1: Painting
-- ID 2: Sculpture
-- ID 3: Flower
-- ID 4: Handicraft

INSERT INTO EventName VALUES ('Paintings for auction', 1);
INSERT INTO EventName VALUES ('Sculptures for auction', 2);
INSERT INTO EventName VALUES ('Flowers for auction', 3);
INSERT INTO EventName VALUES ('Handicrafts for auction', 4);

/*
INSERT INTO EventName VALUES ('Selling various paintings');
INSERT INTO EventName VALUES ('Selling my scupltures');
INSERT INTO EventName VALUES ('Paintings for sale');
INSERT INTO EventName VALUES ('Nature themed art for sale');
INSERT INTO EventName VALUES ('Ocean paintings event');

INSERT INTO EventName VALUES ('Handcrafted wood statues for sale');
INSERT INTO EventName VALUES ('Christmas themed whittling (basswood)');

INSERT INTO EventName VALUES ('Several bonsai for auction');
INSERT INTO EventName VALUES ('Seasonal flowers for auction');
*/