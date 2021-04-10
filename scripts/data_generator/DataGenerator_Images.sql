use liveart_dg;

CREATE TABLE ProductImages (
    Value varchar(500) NOT NULL,
	CategoryID int
);

-- Categories
-- ID 1: Painting
-- ID 2: Sculpture
-- ID 3: Flower
-- ID 4: Handicraft

INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/pictures/cropped/7829/26433/carousel/serie_26433_ec197229829ece358281532135867848.jpeg', 1);
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/v2/cropped/4475/main/carousel/844029_e48aaf130ae0164c7aeedd2d9e36be9a.jpeg', 1);
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/v2/cropped/3567/main/carousel/879317_13b284cefcbc2a811c175cb043219749.jpeg', 1);
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/pictures/cropped/5223/16101/carousel/serie_16101_7bc4d1de3043d671e04733071dca1837.jpeg', 1);
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/v2/cropped/59/main/carousel/1049577_7609804d00a5571dcc60c8fa685c21fb.jpeg', 1);
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/v2/cropped/12975/main/carousel/395551_069850b63b870c3959c40ff243131413.jpeg', 1);
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/v2/cropped/5715/main/carousel/1118249_7214f2cc8139757adbba0ff40a01bf0d.jpeg', 1);
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/v2/cropped/4475/main/carousel/1066475_2702b52523cee480920b409a2350dc38.jpeg', 1);
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/v2/cropped/259/main/carousel/661833_7c97692cc55557916218220d8e306fa1.jpeg', 1);
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/pictures/cropped/7829/27089/carousel/serie_27089_e71cb3e8f70b10a283d8a54af1d8c6c3.jpeg', 1);
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/v2/cropped/800/main/carousel/670931_ee51c8094957c5c66ebf888c3d7bc9b4.jpeg', 1);
INSERT INTO ProductImages VALUES ('https://d17h7hjnfv5s46.cloudfront.net/assets/build/images/menu/new_photos.b098a937.jpg', 1);

INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/pictures/cutout/4485/13603/carousel/serie_13603_c66d8d164efbafcaa6386a2e43975ebf.png', 2);
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/v2/cutout/4485/main/carousel/1075201_609ade9932cf370aaf3dbfe9eb44ffa4.png', 2);
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/v2/cutout/86/main/carousel/356231_82535f130bc9f4f4ccc3bc733bad5f20.png', 2);
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/v2/cutout/10221/main/carousel/326799_f027ca15fc469f6451d9eddccb542ff4.png', 2);
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/pictures/cutout/4485/13603/carousel/serie_13603_c66d8d164efbafcaa6386a2e43975ebf.png', 2);
INSERT INTO ProductImages VALUES ('https://static.wixstatic.com/media/74c309_f113fb9c7f2b4ecb80fa90f24ac56529~mv2.jpg/v1/fill/w_740,h_992,al_c,q_90,usm_0.66_1.00_0.01/74c309_f113fb9c7f2b4ecb80fa90f24ac56529~mv2.webp', 2);
INSERT INTO ProductImages VALUES ('https://cdn.cdnparenting.com/articles/2019/05/18105348/394081159-H.jpg', 2);

INSERT INTO ProductImages VALUES ('https://media.timeout.com/images/105645687/750/422/image.jpg', 3);
INSERT INTO ProductImages VALUES ('https://cdn.idsitnetwork.net/wp-content/uploads/sites/23/2019/01/flower-shop-always-on-my-mind-65-167398.jpg', 3);
INSERT INTO ProductImages VALUES ('https://assets.vogue.com/photos/593f05fa9d94cb14039a9e4e/master/w_2560%2Cc_limit/00-lede%252520(3).jpg', 3);
INSERT INTO ProductImages VALUES ('https://vanbelleflowers.com/wp-content/uploads/untitled-8226.jpg', 3);
INSERT INTO ProductImages VALUES ('https://www.thespruce.com/thmb/R1GcbnStPiRnF48FtRp4uAtHAJc=/3024x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Bonsai-Juniper-Tree_GettyImages-1191078639-c86fffdd513648b6b2ee0d658710bc7d.jpg', 3);
INSERT INTO ProductImages VALUES ('https://cdn.shopify.com/s/files/1/0012/4832/9781/products/brussel-s-bonsai-bonsai-trees-dt-7079gmj-64_1000.jpg?v=1578069102', 3);
INSERT INTO ProductImages VALUES ('https://cdn.britannica.com/65/123265-050-F0F8FD6B/bonsai-cypress-National-Bonsai-and-Penjing-Museum.jpg', 3);

INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/v2/cropped/12827/main/carousel/913525_f5bfecbb66e0f409c0dbe9b28234f632.jpeg', 4);
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/v2/cropped/18161/main/carousel/844663_adc8773e2f315b22f65fe833b8220cfd.jpeg', 4);
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/v2/cropped/21795/main/carousel/703375_d1d0ac2b14ff7229b3b423751a707de6.jpeg', 4);
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/v2/cropped/21795/main/fhd/706107_66cbc5b3fc34b84656d9c416a5b953cd.jpeg', 4);
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/v2/cutout/10221/main/carousel/335265_ae4ed0606edc6d3343f99588f6f2b902.png', 4);
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/v2/cropped/18161/main/carousel/1059321_a799707b8df70420d8cc396a528e4b68.jpeg', 4);
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/v2/cropped/18161/main/carousel/844503_de938e1ab51268145622fcac395cf461.jpeg', 4);
INSERT INTO ProductImages VALUES ('https://financialtribune.com/sites/default/files/field/image/17january/04-ff-handicrafts_11_98_142-ab.jpg', 4);
INSERT INTO ProductImages VALUES ('https://timesofindia.indiatimes.com/thumb/msid-77546201,imgsize-197603,width-400,resizemode-4/77546201.jpg', 4);