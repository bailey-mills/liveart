use liveart_dg;

CREATE TABLE ProductImages (
    Value varchar(500) NOT NULL,
	CategoryID int,
	TagID int
);

-- Categories
-- ID 1: Painting
-- ID 2: Sculpture
-- ID 3: Flower
-- ID 4: Handicraft




-- (1) Paintings
-- 1 Realism
INSERT INTO ProductImages VALUES ('https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/storm-maiden-steve-henderson.jpg', 1, 1);
INSERT INTO ProductImages VALUES ('https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/serenity-steve-henderson.jpg', 1, 1);
INSERT INTO ProductImages VALUES ('https://images.fineartamerica.com/images-medium-large-5/apostles-peter-and-john-hurry-to-the-tomb-on-the-morning-of-the-resurrection-cambas.jpg', 1, 1);
INSERT INTO ProductImages VALUES ('https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/1/comtesse-d-haussonville-jean-auguste-dominique-ingres.jpg', 1, 1);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/14983890/d/il/de064e/2905622539/il_340x270.2905622539_bgzb.jpg?version=0', 1, 1);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/8987297/d/il/b9b302/1816794860/il_340x270.1816794860_t55p.jpg?version=0', 1, 1);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/5654812/d/il/b6e2d7/517943644/il_340x270.517943644_dkdd.jpg?version=3', 1, 1);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/20800859/d/il/a224ee/3029038801/il_340x270.3029038801_ohef.jpg?version=0', 1, 1);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/23295618/d/il/03257d/2981723414/il_340x270.2981723414_h2lo.jpg?version=0', 1, 1);
INSERT INTO ProductImages VALUES ('https://webneel.com/daily/sites/default/files/images/daily/10-2013/13-vermeer.jpg', 1, 1);
INSERT INTO ProductImages VALUES ('https://s31531.pcdn.co/wp-content/uploads/2015/05/4834.Courbet_2C002D00_The_2D00_Desperate_2D00_Man.jpg', 1, 1);
INSERT INTO ProductImages VALUES ('https://www.theartist.me/wp-content/uploads/2020/05/25-famous-realism-paintings.png', 1, 1);
INSERT INTO ProductImages VALUES ('https://www.theartist.me/wp-content/uploads/2017/05/modern-art-Christina%E2%80%99s-World-Andrew-Wyeth.jpg', 1, 1);
INSERT INTO ProductImages VALUES ('https://www.theartist.me/wp-content/uploads/2017/07/Skull-of-a-Skeleton-with-Burning-Cigarette-by-Vincent-van-Gogh.jpg', 1, 1);
INSERT INTO ProductImages VALUES ('https://www.theartist.me/wp-content/uploads/2017/07/Whistlers-Mother-by-James-McNeill-Whistler.jpg', 1, 1);
INSERT INTO ProductImages VALUES ('https://upload.wikimedia.org/wikipedia/commons/9/93/Gustave_Courbet_-_Bonjour_Monsieur_Courbet_-_Mus%C3%A9e_Fabre.jpg', 1, 1);
INSERT INTO ProductImages VALUES ('https://4.bp.blogspot.com/-oZsbsvl879s/XN8XXwz-dbI/AAAAAAAGZYc/Pjv8tRWt3HgOIWmV-hqppWhHjH-hqOlPwCLcBGAs/s1600/Gary-Hernandez-A-Warm-Gaze-1.jpg', 1, 1);
INSERT INTO ProductImages VALUES ('https://2.bp.blogspot.com/-AOiWeKBf2EA/XN8Xr9twUnI/AAAAAAAGZYw/t085tms4-zQxNbpWRPIqy8PgVtHszN9mACLcBGAs/s1600/Gary-Hernandez-Incognito.jpg', 1, 1);
INSERT INTO ProductImages VALUES ('https://2.bp.blogspot.com/-4VInnspTjac/XN8Xr_Kr3wI/AAAAAAAGZY0/8ebpiQKzoUsTK9dtZONGwKlJrjIB_Ky3ACLcBGAs/s1600/Gary-Hernandez-Lipstick.jpg', 1, 1);
INSERT INTO ProductImages VALUES ('https://2.bp.blogspot.com/-eacLmJZB5tY/XN8Xu9czzRI/AAAAAAAGZZI/gjaOVpFkMiYHnyXLgZgrjKcW9qMOk3e0QCLcBGAs/s1600/Gary-Hernandez-Matador-de-Toros.jpg', 1, 1);
INSERT INTO ProductImages VALUES ('https://1.bp.blogspot.com/-QdTojm46Gy8/XN8Xt_nUvaI/AAAAAAAGZZA/xqh9AyyBuqQUUYcsanZNENFOMmI35-kyQCLcBGAs/s1600/Gary-Hernandez-Muse.jpg', 1, 1);
INSERT INTO ProductImages VALUES ('https://1.bp.blogspot.com/-DTYjDgLsZGg/XN8Xwi9ksXI/AAAAAAAGZZM/p2jCGawImWgPwp23sSNisB2FbETIKmh-wCLcBGAs/s1600/Gary-Hernandez-Virgin-with-the-Host-after-Ingres.jpg', 1, 1);
INSERT INTO ProductImages VALUES ('https://1.bp.blogspot.com/-uosuCD8Ewjk/XN8XsoA0GGI/AAAAAAAGZY4/5kEah40bq_A-dxGFax8K-vCtftWfe01tACLcBGAs/s1600/Gary-Hernandez-The-Irishman.jpg', 1, 1);
INSERT INTO ProductImages VALUES ('https://4.bp.blogspot.com/-V0eVYLGjU2k/XN8XtlC0XMI/AAAAAAAGZY8/iYq_0ijVVr0mvhATBF6weqFc86bXsXXlwCLcBGAs/s1600/Gary-Hernandez-TuttArt.jpg', 1, 1);
INSERT INTO ProductImages VALUES ('https://1.bp.blogspot.com/-BIMcgGc2S-U/XN8XrT1uonI/AAAAAAAGZYs/qn2Zj26-h5cM_nya9fdYBaSHU6B0fnaigCLcBGAs/s1600/Gary-Hernandez-Blue-Moon.jpg', 1, 1);
INSERT INTO ProductImages VALUES ('https://render.fineartamerica.com/images/images-profile-flow/400/images-medium-large-5/1-summer-on-the-farm-robin-moline.jpg', 1, 1);
INSERT INTO ProductImages VALUES ('https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/1/birds-eye-view-robin-moline.jpg', 1, 1);

-- 2 Photorealism
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/pictures/cropped/7829/27089/carousel/serie_27089_e71cb3e8f70b10a283d8a54af1d8c6c3.jpeg', 1, 2);
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/v2/cropped/800/main/carousel/670931_ee51c8094957c5c66ebf888c3d7bc9b4.jpeg', 1, 2);
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/v2/cropped/59/main/carousel/1049577_7609804d00a5571dcc60c8fa685c21fb.jpeg', 1, 2);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/21783874/d/il/e8f503/2870790462/il_340x270.2870790462_j5j5.jpg?version=0', 1, 2);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/24397191/d/il/15ed40/2828279219/il_340x270.2828279219_8653.jpg?version=0', 1, 2);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/22296231/c/952/756/24/0/il/a80ddb/2851494619/il_340x270.2851494619_r7w6.jpg', 1, 2);
INSERT INTO ProductImages VALUES ('https://inspirationsoftheday.files.wordpress.com/2012/01/img_1199.jpg', 1, 2);
INSERT INTO ProductImages VALUES ('https://webneel.com/daily/sites/default/files/images/daily/03-2017/12-photorealistic-painting-by-ben-jeffery.jpg', 1, 2);
INSERT INTO ProductImages VALUES ('https://webneel.com/daily/sites/default/files/images/daily/04-2015/10-animal-painting-by-heather.jpg', 1, 2);
INSERT INTO ProductImages VALUES ('https://webneel.com/daily/sites/default/files/images/daily/12-2013/6-watercolor-painting-by-stevehanks.jpg', 1, 2);
INSERT INTO ProductImages VALUES ('https://webneel.com/daily/sites/default/files/images/daily/08-2013/24-icecream-painting-by-will-cotton.jpg', 1, 2);
INSERT INTO ProductImages VALUES ('https://render.fineartamerica.com/images/images-profile-flow/400/images-medium-large-5/inder-the-shade-graham-gercken.jpg', 1, 2);
INSERT INTO ProductImages VALUES ('https://www.boredart.com/wp-content/uploads/2015/11/Breathtaking-Examples-of-Photorealism-1.jpg', 1, 2);
INSERT INTO ProductImages VALUES ('https://www.boredart.com/wp-content/uploads/2015/11/Breathtaking-Examples-of-Photorealism-4.jpg', 1, 2);
INSERT INTO ProductImages VALUES ('https://www.boredart.com/wp-content/uploads/2015/11/Breathtaking-Examples-of-Photorealism-5.jpg', 1, 2);
INSERT INTO ProductImages VALUES ('https://www.boredart.com/wp-content/uploads/2015/11/Breathtaking-Examples-of-Photorealism-7.jpg', 1, 2);
INSERT INTO ProductImages VALUES ('https://www.boredart.com/wp-content/uploads/2015/11/Breathtaking-Examples-of-Photorealism-8.jpg', 1, 2);
INSERT INTO ProductImages VALUES ('https://www.boredart.com/wp-content/uploads/2015/11/Breathtaking-Examples-of-Photorealism-10.jpg', 1, 2);
INSERT INTO ProductImages VALUES ('https://www.boredart.com//wp-content/uploads/2015/11/Breathtaking-Examples-of-Photorealism-9.jpg', 1, 2);
INSERT INTO ProductImages VALUES ('https://www.boredart.com/wp-content/uploads/2015/11/Breathtaking-Examples-of-Photorealism-11.jpg', 1, 2);
INSERT INTO ProductImages VALUES ('https://www.boredart.com/wp-content/uploads/2015/11/Breathtaking-Examples-of-Photorealism-14.jpg', 1, 2);
INSERT INTO ProductImages VALUES ('https://www.boredart.com/wp-content/uploads/2015/11/Breathtaking-Examples-of-Photorealism-15.jpg', 1, 2);
INSERT INTO ProductImages VALUES ('https://www.boredart.com//wp-content/uploads/2015/11/Breathtaking-Examples-of-Photorealism-18.jpg', 1, 2);
INSERT INTO ProductImages VALUES ('https://www.boredart.com/wp-content/uploads/2015/11/Breathtaking-Examples-of-Photorealism-24.jpg', 1, 2);
INSERT INTO ProductImages VALUES ('https://www.boredart.com//wp-content/uploads/2015/11/Breathtaking-Examples-of-Photorealism-30.jpg', 1, 2);
INSERT INTO ProductImages VALUES ('https://www.boredart.com//wp-content/uploads/2015/11/Breathtaking-Examples-of-Photorealism-35.jpg', 1, 2);
INSERT INTO ProductImages VALUES ('https://www.boredart.com/wp-content/uploads/2015/11/Breathtaking-Examples-of-Photorealism-36.jpg', 1, 2);
INSERT INTO ProductImages VALUES ('https://www.boredart.com//wp-content/uploads/2015/11/Breathtaking-Examples-of-Photorealism-32.jpg', 1, 2);
INSERT INTO ProductImages VALUES ('https://www.boredart.com/wp-content/uploads/2015/11/Breathtaking-Examples-of-Photorealism-40.jpg', 1, 2);
INSERT INTO ProductImages VALUES ('https://media.istockphoto.com/photos/background-with-watercolor-looking-skies-with-pastel-sunset-picture-id985428634?k=6&m=985428634&s=612x612&w=0&h=mTA12hqdIP_DBG_qTL8g5FZGX8gP9D5IxRJ-5l2t_uQ=', 1, 2);


-- 3 Abstract
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/27970142/d/il/97ee6a/3040134983/il_340x270.3040134983_h4h4.jpg?version=0', 1, 3);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/17413572/c/761/604/243/0/il/db0db2/1886131081/il_340x270.1886131081_8axj.jpg', 1, 3);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/19100638/c/2220/1765/351/379/il/688cb0/2236953116/il_340x270.2236953116_14pl.jpg', 1, 3);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/13153295/d/il/ba8c7e/1419418002/il_340x270.1419418002_rhc3.jpg?version=0', 1, 3);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/6571804/d/il/68d2a2/1933805557/il_340x270.1933805557_ft72.jpg?version=0', 1, 3);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/6571804/d/il/58fe27/1937967563/il_340x270.1937967563_gn92.jpg?version=0', 1, 3);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/6571804/d/il/8e0bad/1888771430/il_340x270.1888771430_lpfk.jpg?version=0', 1, 3);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/13861920/c/745/589/168/31/il/569d31/2325961883/il_340x270.2325961883_lqhq.jpg', 1, 3);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/28215721/d/il/4e4f24/2953781032/il_340x270.2953781032_rh9l.jpg?version=0', 1, 3);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/25174102/d/il/5be293/2880923904/il_340x270.2880923904_4fg0.jpg?version=0', 1, 3);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/13153295/d/il/2e6497/1113077434/il_340x270.1113077434_q7lc.jpg?version=0', 1, 3);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/12692110/d/il/2951b9/2882288632/il_340x270.2882288632_t01i.jpg?version=0', 1, 3);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/6571804/d/il/b7d781/1835562278/il_340x270.1835562278_57fl.jpg?version=0', 1, 3);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/20259606/d/il/656500/2924334710/il_340x270.2924334710_elkk.jpg?version=0', 1, 3);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/6571804/d/il/f3b8a0/1883092525/il_340x270.1883092525_cy0e.jpg?version=0', 1, 3);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/6404470/d/il/6510f7/3005750324/il_340x270.3005750324_k2qr.jpg?version=0', 1, 3);
INSERT INTO ProductImages VALUES ('https://cdn.shopify.com/s/files/1/0969/9128/products/Stacked_-_Abstract_Expressionism_Painting_09c2bfc0-d901-4aed-90ad-1c51d20bb507.jpg?v=1581935800', 1, 3);
INSERT INTO ProductImages VALUES ('https://digitaldefynd.com/wp-content/uploads/2020/07/Best-Abstract-Art-course-tutorial-class-certification-training-online-1024x681.jpg', 1, 3);
INSERT INTO ProductImages VALUES ('https://mymodernmet.com/wp/wp-content/uploads/2020/12/jason-anderson-abstract-paintings-8.jpg', 1, 3);
INSERT INTO ProductImages VALUES ('https://mymodernmet.com/wp/wp-content/uploads/2020/12/jason-anderson-abstract-paintings-15.jpg', 1, 3);
INSERT INTO ProductImages VALUES ('http://www.thepluspaper.com/wp-content/uploads/2019/01/7.jpg', 1, 3);
INSERT INTO ProductImages VALUES ('http://www.thepluspaper.com/wp-content/uploads/2019/01/2.jpg', 1, 3);
INSERT INTO ProductImages VALUES ('http://www.thepluspaper.com/wp-content/uploads/2019/01/3.jpg', 1, 3);
INSERT INTO ProductImages VALUES ('http://www.thepluspaper.com/wp-content/uploads/2019/01/4.jpg', 1, 3);
INSERT INTO ProductImages VALUES ('https://media.istockphoto.com/photos/abstract-handpainted-art-background-picture-id1081157896?k=6&m=1081157896&s=612x612&w=0&h=qaFnbWyAjDeHrjp0OwD67LyLLiWGlhUJdxRoS1eyB-E=', 1, 3);
INSERT INTO ProductImages VALUES ('https://media.istockphoto.com/photos/watercolor-textured-background-picture-id1057023496?k=6&m=1057023496&s=612x612&w=0&h=WVZ3rtATSbKYJGxu3aPzKpNs-octRTNca0Zb9OGAJ1g=', 1, 3);


-- 4 Impressionism
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/v2/cropped/12975/main/carousel/395551_069850b63b870c3959c40ff243131413.jpeg', 1, 4);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/13370389/d/il/c33ec1/2905728894/il_340x270.2905728894_o13n.jpg?version=0', 1, 4);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/13911299/d/il/1f0036/3023304381/il_340x270.3023304381_9157.jpg?version=0', 1, 4);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/13911299/d/il/616f5a/2829997233/il_340x270.2829997233_epia.jpg?version=0', 1, 4);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/6404470/d/il/f2a850/3005790242/il_340x270.3005790242_dloy.jpg?version=0', 1, 4);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/23704962/d/il/1848e6/2860621758/il_340x270.2860621758_6h3t.jpg?version=0', 1, 4);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/6343170/d/il/c5a6f6/1171384313/il_340x270.1171384313_nwyw.jpg?version=0', 1, 4);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/27759313/d/il/a1849c/2945296005/il_340x270.2945296005_qpz0.jpg?version=1', 1, 4);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/23704962/d/il/f4d63f/2915457913/il_340x270.2915457913_ku07.jpg?version=0', 1, 4);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/14624482/d/il/83e091/2675531011/il_340x270.2675531011_i03f.jpg?version=0', 1, 4);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/6105001/d/il/7f6729/1973457912/il_340x270.1973457912_gped.jpg?version=0', 1, 4);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/5128758/d/il/1f298f/3020340526/il_340x270.3020340526_plvh.jpg?version=0', 1, 4);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/17997671/d/il/788eaa/2875236514/il_340x270.2875236514_aqmb.jpg?version=0', 1, 4);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/27999321/d/il/4a0732/2956342205/il_340x270.2956342205_fb9j.jpg?version=0', 1, 4);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/22139471/d/il/365a23/2894673782/il_340x270.2894673782_6hfs.jpg?version=0', 1, 4);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/26928982/d/il/7690c6/3022679066/il_340x270.3022679066_8khh.jpg?version=0', 1, 4);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/5711041/d/il/14fa7d/195064112/il_340x270.195064112.jpg?version=0', 1, 4);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/13911299/d/il/821b22/2827748097/il_340x270.2827748097_aaed.jpg?version=0', 1, 4);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/24901191/d/il/68178d/3009868527/il_340x270.3009868527_ejb0.jpg?version=0', 1, 4);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/16973944/c/2596/2063/0/11/il/759e2a/3069495307/il_340x270.3069495307_avl9.jpg', 1, 4);
INSERT INTO ProductImages VALUES ('https://s31531.pcdn.co/wp-content/uploads/2018/06/MMarino_Boats-on-the-Seine-1024x674.jpg', 1, 4);
INSERT INTO ProductImages VALUES ('https://s31531.pcdn.co/wp-content/uploads/2018/06/MMarino_Isle-of-Swans-1024x626.jpg', 1, 4);
INSERT INTO ProductImages VALUES ('https://s31531.pcdn.co/wp-content/uploads/2018/05/8-The-Pond-in-Spring_MMarino-1024x777.jpg', 1, 4);
INSERT INTO ProductImages VALUES ('https://shelburnemuseum.org/wp-content/uploads/2016/05/Collec_Impressionist_Primary-1800x600.jpg', 1, 4);
INSERT INTO ProductImages VALUES ('https://thecollector.b-cdn.net/wp-content/uploads/2020/11/what-is-impressionism-monet-1.jpg', 1, 4);
INSERT INTO ProductImages VALUES ('https://thecollector.b-cdn.net/wp-content/uploads/2020/11/impressionist-art-painting-renoir-lakeside-1-e1604882165704.jpg', 1, 4);
INSERT INTO ProductImages VALUES ('https://thecollector.b-cdn.net/wp-content/uploads/2020/11/caillebotte-rainy-day-paris-painting-impressionist-art-1-e1604882239724.jpg', 1, 4);


-- 5 Expressionism
INSERT INTO ProductImages VALUES ('https://artandcrafter.com/wp-content/uploads/2019/04/Expressionism.jpg', 1, 5);
INSERT INTO ProductImages VALUES ('https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/original-oil-painting-art-abstract-art-deco-realism-expressionism-portrait-signed-expressionism-david-padworny.jpg', 1, 5);
INSERT INTO ProductImages VALUES ('https://cdn.pixabay.com/photo/2020/04/01/18/52/expressionism-4992246_960_720.jpg', 1, 5);
INSERT INTO ProductImages VALUES ('https://upload.wikimedia.org/wikipedia/commons/c/c5/Francois-Joseph_Heim_001.jpg', 1, 5);
INSERT INTO ProductImages VALUES ('https://www.artsandcollections.com/wp-content/uploads/2018/08/Abstract-Expressionism.jpg', 1, 5);
INSERT INTO ProductImages VALUES ('https://macabregallery.com/wp-content/uploads/2018/12/marino-benigna-arte-267x400.jpg', 1, 5);
INSERT INTO ProductImages VALUES ('https://macabregallery.com/wp-content/uploads/2018/12/original-dark-fine-art-332x400.jpg', 1, 5);
INSERT INTO ProductImages VALUES ('https://macabregallery.com/wp-content/uploads/2021/03/Child-v2-final-370x250.jpg', 1, 5);
INSERT INTO ProductImages VALUES ('https://collectionapi.metmuseum.org/api/collection/v1/iiif/365806/1332741/main-image', 1, 5);
INSERT INTO ProductImages VALUES ('https://useumstorage.blob.core.windows.net/drupal-public/content-images/Written-Content/Curated-exhibitions/abstract-art/Expressionism/musicos-fabiano-millani-80107454.jpg', 1, 5);
INSERT INTO ProductImages VALUES ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk0l1hcsh7ZhZHMJM1-uay3k0YO5ZjHdFzh65_CR-H0O_bGzyXMm6dTUhDcLh28nJ3MBs&usqp=CAU', 1, 5);
INSERT INTO ProductImages VALUES ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeI-h7pA3jvssvbQigqaIfprFR_pguVBNkzkfd4CHhDnK_MLNTLujuS4P9Y1z9d7Swwhk&usqp=CAU', 1, 5);
INSERT INTO ProductImages VALUES ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKUaqVM3rT_JFfTFeVwLjfDKTZ3kFm6WGS7vBYAxNExOAF-G5F66YrXwhhhHH8AM0bUgw&usqp=CAU', 1, 5);
INSERT INTO ProductImages VALUES ('https://artist.com/photos/arts/big/girl-wave-1800117135.jpg', 1, 5);
INSERT INTO ProductImages VALUES ('https://s.wsj.net/public/resources/images/BN-CM451_0423WW_G_20140423093755.jpg', 1, 5);
INSERT INTO ProductImages VALUES ('https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/original-oil-painting-art-abstract-art-deco-realism-expressionism-portrait-signed-expressionism-david-padworny.jpg', 1, 5);
INSERT INTO ProductImages VALUES ('https://images.template.net/wp-content/uploads/2014/12/Yellow-Fins.jpg?width=600', 1, 5);
INSERT INTO ProductImages VALUES ('https://images.template.net/wp-content/uploads/2014/12/Large-Canvas-Abstract-Expressionist-Painting.jpg?width=600', 1, 5);
INSERT INTO ProductImages VALUES ('https://images.template.net/wp-content/uploads/2014/12/Expressionist-Painting2.jpg?width=600', 1, 5);
INSERT INTO ProductImages VALUES ('https://images.template.net/wp-content/uploads/2014/12/Expressionist-Oil-Painting4.jpg?width=600', 1, 5);
INSERT INTO ProductImages VALUES ('https://images.template.net/wp-content/uploads/2014/12/Source-Of-Strength.jpg?width=600', 1, 5);
INSERT INTO ProductImages VALUES ('https://images.template.net/wp-content/uploads/2014/12/Acrylic-Expressionist-Painting.jpg?width=600', 1, 5);
INSERT INTO ProductImages VALUES ('https://images.template.net/wp-content/uploads/2014/12/Music-Colors-And-Beauty.jpg?width=600', 1, 5);
INSERT INTO ProductImages VALUES ('https://images.template.net/wp-content/uploads/2014/12/Blue-Green-Expressionist-Oil-Painting.jpg?width=600', 1, 5);
INSERT INTO ProductImages VALUES ('https://images.template.net/wp-content/uploads/2014/12/Abstract-Expressionist-Oil-painting.jpg?width=600', 1, 5);
INSERT INTO ProductImages VALUES ('https://images.template.net/wp-content/uploads/2014/12/xpressionist-Painting-from-Africa.jpg?width=600', 1, 5);
INSERT INTO ProductImages VALUES ('https://images.template.net/wp-content/uploads/2014/12/Flamenco-Dancer-029.jpg?width=600', 1, 5);
INSERT INTO ProductImages VALUES ('https://images.template.net/wp-content/uploads/2014/12/Flamenco-Dancer.jpg?width=600', 1, 5);
INSERT INTO ProductImages VALUES ('https://thecollector.b-cdn.net/wp-content/uploads/2020/05/henri_matisse_red_room_1908-main.jpg', 1, 5);


-- 6 Painterly
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/27376756/d/il/9fc676/2976001848/il_340x270.2976001848_t7ct.jpg?version=0', 1, 6);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/29042926/d/il/b2c051/3068643159/il_340x270.3068643159_42te.jpg?version=0', 1, 6);
INSERT INTO ProductImages VALUES ('https://render.fineartamerica.com/images/images-profile-flow/400/images-medium-large-5/farewell-to-anger-leonid-afremov.jpg', 1, 6);
INSERT INTO ProductImages VALUES ('https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/1/1-freddie-mercury-portrait-suzanns-art.jpg', 1, 6);
INSERT INTO ProductImages VALUES ('http://2.bp.blogspot.com/-JPfFzr8ioYI/T_Xv6Ik91rI/AAAAAAAAXag/Tqtcr6bNJ9U/s1600/003.JPG', 1, 6);
INSERT INTO ProductImages VALUES ('http://1.bp.blogspot.com/-fa7A-Tj_EGo/T_Xv7z8LhFI/AAAAAAAAXaw/-pYZR6-CTkk/s1600/006.JPG', 1, 6);
INSERT INTO ProductImages VALUES ('http://1.bp.blogspot.com/-5RzgPeyN-JY/T_Xv7IHfikI/AAAAAAAAXao/4v72VZAEtmk/s1600/005.JPG', 1, 6);
INSERT INTO ProductImages VALUES ('http://2.bp.blogspot.com/-Itw9Tt8hEuA/T_Xv5H72-HI/AAAAAAAAXaY/viG67m6IHsc/s1600/002.JPG', 1, 6);
INSERT INTO ProductImages VALUES ('https://i1.wp.com/digital-photography-school.com/wp-content/uploads/2018/01/create-watercolor-art-from-your-photos-1.jpg?w=750&ssl=1', 1, 6);
INSERT INTO ProductImages VALUES ('https://i2.wp.com/digital-photography-school.com/wp-content/uploads/2018/01/create-watercolor-images-from-your-photos-10.jpg?w=500&ssl=1', 1, 6);
INSERT INTO ProductImages VALUES ('https://i1.wp.com/digital-photography-school.com/wp-content/uploads/2018/01/create-watercolor-images-from-your-photos-11.jpg?w=591&ssl=1', 1, 6);
INSERT INTO ProductImages VALUES ('https://i1.wp.com/digital-photography-school.com/wp-content/uploads/2018/01/create-watercolor-images-from-your-photos-13.jpg?resize=717%2C1103&ssl=1', 1, 6);
INSERT INTO ProductImages VALUES ('https://cdna.artstation.com/p/assets/images/images/031/592/378/large/ma-brushes-michael-adamidis-kunst-digital-painterly-style-oil-brushes-pinsel.jpg?1604054493', 1, 6);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/1200x/67/71/09/6771095c79cfb5fc60cb4334be8952cd.jpg', 1, 6);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/1200x/e3/70/b2/e370b2b962f4ffd344806dc5e199b7c0.jpg', 1, 6);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/1200x/a0/1d/43/a01d434466878dc548e2334b265e5f7f.jpg', 1, 6);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/1200x/ee/9d/2d/ee9d2d42d9b887cf0aebdc93486c0e00.jpg', 1, 6);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/1200x/a6/42/b9/a642b9062119956353d624f7d2321acb.jpg', 1, 6);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/1200x/7e/f6/20/7ef6200ed74eef133278b578e05596ae.jpg', 1, 6);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/1200x/75/52/c3/7552c32b1f7e294a2b4dee9caa4c8090.jpg', 1, 6);
INSERT INTO ProductImages VALUES ('https://emptyeasel.com/wp-content/uploads/2008/01/anjoupearsbyabbeyryan.jpg', 1, 6);
INSERT INTO ProductImages VALUES ('https://emptyeasel.com/wp-content/uploads/2008/01/candycanesbyabbeyryan.jpg', 1, 6);
INSERT INTO ProductImages VALUES ('https://emptyeasel.com/wp-content/uploads/2008/01/mmsspectrumbyabbeyryan.jpg', 1, 6);
INSERT INTO ProductImages VALUES ('https://media.istockphoto.com/photos/landscape-oil-painting-picture-id186321199?k=6&m=186321199&s=612x612&w=0&h=ACPn8ymBPhbbg7XxniFfuEYT_vo92cBaoR3CdoOXe2g=', 1, 6);
INSERT INTO ProductImages VALUES ('https://media.istockphoto.com/photos/abstract-painted-art-background-picture-id1124507971?k=6&m=1124507971&s=612x612&w=0&h=lPzxnRFFGa9o2lGlsAbeNIq9LH26ux0HmsJqIKOYJg8=', 1, 6);
INSERT INTO ProductImages VALUES ('https://media.istockphoto.com/photos/plastiras-lake-in-central-greece-picture-id642943356?k=6&m=642943356&s=612x612&w=0&h=RHeAzaRxEhwfhJqxhsWOM0LUOPhFiZN6_Dug9EQv13Y=', 1, 6);
INSERT INTO ProductImages VALUES ('https://media.istockphoto.com/photos/digital-painting-of-sete-cidades-on-sao-miguel-azores-picture-id1027172374?k=6&m=1027172374&s=612x612&w=0&h=6zDVxy8IgfgBSXGDuIl9iGgaZjZnfQjrHkKp1fdC3Rs=', 1, 6);
INSERT INTO ProductImages VALUES ('https://media.istockphoto.com/photos/digital-painting-of-sete-cidades-on-sao-miguel-azores-picture-id1027172338?k=6&m=1027172338&s=612x612&w=0&h=3UUyv__UElWo9bXKoBRqRLIctOMdgZnU9wmOlKWg_HA=', 1, 6);


-- 7 Oil painting
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/pictures/cropped/7829/26433/carousel/serie_26433_ec197229829ece358281532135867848.jpeg', 1, 7);
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/pictures/cropped/5223/16101/carousel/serie_16101_7bc4d1de3043d671e04733071dca1837.jpeg', 1, 7);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/13142407/c/959/763/0/590/il/e6f4e6/1065961887/il_340x270.1065961887_4968.jpg', 1, 7);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/24108979/d/il/20b8f9/3071722677/il_340x270.3071722677_b7jm.jpg?version=0', 1, 7);
INSERT INTO ProductImages VALUES ('https://www.allartclassic.com/img/Friedrich_von_Amerling_AMF022.jpg', 1, 7);
INSERT INTO ProductImages VALUES ('https://www.allartclassic.com/img/Ferdinand_Georg_Waldmuller_WAF005.jpg', 1, 7);
INSERT INTO ProductImages VALUES ('https://www.allartclassic.com/img/Rembrandt_Harmensz_van_Rijn_REH016.jpg', 1, 7);
INSERT INTO ProductImages VALUES ('https://www.allartclassic.com/img/Road-to-Emmaus-Zund-L.jpg', 1, 7);
INSERT INTO ProductImages VALUES ('https://www.allartclassic.com/img/Lord_Frederick_Leighton_FLL010.jpg', 1, 7);
INSERT INTO ProductImages VALUES ('https://www.allartclassic.com/img/author_pictures/Couple-with-umbrella-rainy-day-oil-painting.jpg', 1, 7);
INSERT INTO ProductImages VALUES ('https://www.allartclassic.com/img/Lawrence_Alma_Tadema_ALT005.jpg', 1, 7);
INSERT INTO ProductImages VALUES ('https://www.allartclassic.com/img/John_Singer_Sargent_SAJ029.jpg', 1, 7);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/236x/62/01/32/620132844e53e3d4f2b31f939fa052be--portrait-art-portrait-paintings.jpg', 1, 7);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/236x/05/07/92/050792f302e57824fb165e287f52ed5a--oil-portrait-portrait-paintings.jpg', 1, 7);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/236x/04/45/92/044592a0c4e313167cfeed6eb553e04b--figure-painting-art-paintings.jpg', 1, 7);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/236x/81/a6/9e/81a69ec12ec06d8c9bba3ac71740d215--thomas-saliot-saatchi-online.jpg', 1, 7);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/236x/88/f2/47/88f247ac2558360837c804a0aa2aa4b0--friedrich-oil-on-canvas.jpg', 1, 7);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/236x/f4/2a/92/f42a922e08179f19d19ced553bf91af2--portrait-art-portrait-paintings.jpg', 1, 7);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/236x/a4/80/60/a48060e61dcf88e3e85bd8c1bc5d863c--children-painting-art-children.jpg', 1, 7);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/236x/b7/29/d1/b729d11124e519c3c77e33fffa9f436a--cow-painting-cow-art.jpg', 1, 7);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/236x/a9/be/63/a9be63df0176c162ebbfde306b3b57e1--paris-paris-paris-france.jpg', 1, 7);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/236x/df/30/c1/df30c161f42ced569b6d4e46dc02db20--painting-art-oil-paintings.jpg', 1, 7);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/236x/7e/e0/70/7ee0702f4e143f2a1071bccea1118030--aldo-french-doors.jpg', 1, 7);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/236x/08/f7/ac/08f7ac1c0a5f81051899f67575ad6784--alexander-khokhlov-painted-faces.jpg', 1, 7);


-- (2) Sculptures
-- 8 Humanoid
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/236x/da/34/0e/da340e89a3bfbcab9aedd8b6bb8c6191--rabbit-head-rabbit-mask.jpg', 2, 8);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/236x/30/4a/4e/304a4e11b4fd5d0f82615c07a34deeb7--trash-art-organic-art.jpg', 2, 8);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/236x/78/22/78/782278b1816289a885e5d6a63eed2add--liquid-gold-face-off.jpg', 2, 8);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/236x/e9/ed/5f/e9ed5f2a4d6b9f38372dbf6dfbbfdfac.jpg', 2, 8);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/236x/12/4b/90/124b90e4aab2d3a28b616a3ea0e9db37.jpg', 2, 8);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/236x/45/10/3b/45103bf6d76119f8350513be43c753ad.jpg', 2, 8);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/236x/63/3c/96/633c96cd6c036d7d36e32bfbfc231108.jpg', 2, 8);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/236x/e9/32/20/e932209614e738e20509fd74fde3d0b7.jpg', 2, 8);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/236x/3b/58/4e/3b584e72db45104655c69fd1f98b7b77.jpg', 2, 8);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/236x/86/ba/a7/86baa7514b5db26c34cf53c0b1e2dff4.jpg', 2, 8);


-- 9 Metallic
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/5160780/c/900/714/0/3/il/f560cd/1774803704/il_340x270.1774803704_1adw.jpg', 2, 9);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/26070225/c/2222/1766/0/28/il/aa1116/2861043395/il_340x270.2861043395_i1y4.jpg', 2, 9);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/6780594/d/il/c4833b/2156104951/il_340x270.2156104951_6l29.jpg?version=0', 2, 9);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/26070225/d/il/817e71/3010295832/il_340x270.3010295832_edic.jpg?version=0', 2, 9);


-- 10 Classic
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/26951270/d/il/d8bff1/2849304590/il_340x270.2849304590_c7w4.jpg?version=0', 2, 10);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/5801272/c/2250/1786/0/226/il/42e0d8/1846574545/il_340x270.1846574545_6lb0.jpg', 2, 10);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/24849964/d/il/40fbf7/2575834972/il_340x270.2575834972_t6v9.jpg?version=0', 2, 10);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/5801272/d/il/a677ae/778721733/il_340x270.778721733_m4wp.jpg?version=0', 2, 10);


-- 11 Abstract
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/v2/cutout/10221/main/carousel/326799_f027ca15fc469f6451d9eddccb542ff4.png', 2, 11);
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/v2/cutout/86/main/carousel/356231_82535f130bc9f4f4ccc3bc733bad5f20.png', 2, 11);
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/v2/cropped/21795/main/fhd/706107_66cbc5b3fc34b84656d9c416a5b953cd.jpeg', 2, 11);
INSERT INTO ProductImages VALUES ('https://cdn.singulart.com/artworks/v2/cropped/12827/main/carousel/913525_f5bfecbb66e0f409c0dbe9b28234f632.jpeg', 2, 11);


-- (3) Flower
-- 12 Flower bouquet
INSERT INTO ProductImages VALUES ('https://assets.vogue.com/photos/593f05fa9d94cb14039a9e4e/master/w_2560%2Cc_limit/00-lede%252520(3).jpg', 3, 12);
INSERT INTO ProductImages VALUES ('https://assets.vogue.com/photos/593f0623a9698d22f373a8b0/master/w_1600%2Cc_limit/01-embed.jpg', 3, 12);
INSERT INTO ProductImages VALUES ('https://assets.vogue.com/photos/593ef831c44c1d2a8ddbab9a/master/w_1600%2Cc_limit/Step%2525202_2.jpg', 3, 12);
INSERT INTO ProductImages VALUES ('https://vanbelleflowers.com/wp-content/uploads/IMG_E1801-scaled.jpg', 3, 12);
INSERT INTO ProductImages VALUES ('https://pyxis.nymag.com/v1/imgs/040/318/81aea041c4043594f53d254c6549888d29-flowers.rsquare.w700.jpg', 3, 12);
INSERT INTO ProductImages VALUES ('https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Spring21/Spring%20Refresh/SpringRefresh_Vogue_Carousel.jpg', 3, 12);

-- 13 Potted plant
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/22623632/d/il/7904ab/2245401548/il_340x270.2245401548_rp6z.jpg?version=0', 3, 13);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/7020371/c/1828/1459/431/784/il/21d44b/2542870515/il_340x270.2542870515_k59h.jpg', 3, 13);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/19217281/d/il/0f9290/2862711508/il_340x270.2862711508_jmn6.jpg?version=0', 3, 13);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/7020371/c/2392/1901/92/531/il/5dca30/2192781053/il_340x270.2192781053_m3oj.jpg', 3, 13);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/14448469/c/1838/1461/667/204/il/585a38/3069569531/il_340x270.3069569531_q2by.jpg', 3, 13);

-- 14 Bonsai
INSERT INTO ProductImages VALUES ('https://media.gettyimages.com/photos/bonsai-tree-picture-id184114153?k=6&m=184114153&s=612x612&w=0&h=Szcd1tscuIk_y6oyZCeSsk65ridoZk-32SoI9rhx_2Q=', 3, 14);
INSERT INTO ProductImages VALUES ('https://media.gettyimages.com/photos/bonsai-picture-id94379656?k=6&m=94379656&s=612x612&w=0&h=IcN_HFF0PzZmvPnXV1vhsgMYyL6IitdkMtWf3XrT59o=', 3, 14);
INSERT INTO ProductImages VALUES ('https://media.gettyimages.com/photos/isolated-bonsai-tree-picture-id141318784?k=6&m=141318784&s=612x612&w=0&h=m0MycJ_aHiJ0530QmzJRWLoX9W4p_vTs8RKjooWknrA=', 3, 14);
INSERT INTO ProductImages VALUES ('https://media.gettyimages.com/photos/potted-plant-picture-id156851696?k=6&m=156851696&s=612x612&w=0&h=t7QNHzTptPpmK_BuqZEVirSQQi5GdayhIcCxuuvQL-A=', 3, 14);
INSERT INTO ProductImages VALUES ('https://media.gettyimages.com/photos/pinus-massoniana-bonsai-picture-id157678579?k=6&m=157678579&s=612x612&w=0&h=hEEHxLiLdxneAgw3KnMi8zR7JPUeWoz-HP5Mqqwm0Eg=', 3, 14);
INSERT INTO ProductImages VALUES ('https://media.gettyimages.com/photos/bonsai-juniper-picture-id522285622?k=6&m=522285622&s=612x612&w=0&h=pEG58pYZBU9ldyxbKC-d0oaE5366nh-2e5VIt0w7chQ=', 3, 14);


-- (4) Handicraft
-- 15 Glass
INSERT INTO ProductImages VALUES ('https://financialtribune.com/sites/default/files/field/image/17january/04-ff-handicrafts_11_98_142-ab.jpg', 4, 15);
INSERT INTO ProductImages VALUES ('https://images-na.ssl-images-amazon.com/images/I/81KGJ9xvBGL._AC_SX679_.jpg', 4, 15);
INSERT INTO ProductImages VALUES ('https://i.pinimg.com/236x/57/76/dd/5776dd4475f3256617414af13f5298df--teal-art-aqua-color.jpg', 4, 15);
INSERT INTO ProductImages VALUES ('https://www.ideashomegarden.com/storage/posts/gallery/2020/Feb/15291/venini-novilites-glass-artwork.jpg', 4, 15);
INSERT INTO ProductImages VALUES ('https://www.ideashomegarden.com/storage/posts/gallery/2020/Feb/15293/venini-novilites-glass-artwork.jpg', 4, 15);
INSERT INTO ProductImages VALUES ('https://www.ideashomegarden.com/storage/posts/gallery/2020/Feb/15294/venini-novilites-glass-artwork.jpg', 4, 15);
INSERT INTO ProductImages VALUES ('https://www.ideashomegarden.com/storage/posts/gallery/2020/Feb/15292/venini-novilites-glass-artwork.jpg', 4, 15);

-- 16 Embroidery
INSERT INTO ProductImages VALUES ('https://mymodernmet.com/wp/wp-content/uploads/archive/CKTZKzcXjEsXK1W-OSSh_AnaTeresaBarboza3.jpg', 4, 16);
INSERT INTO ProductImages VALUES ('https://mymodernmet.com/wp/wp-content/uploads/archive/2d6HB-MgZ1o1Qot1WCcl_Severija2.jpg', 4, 16);
INSERT INTO ProductImages VALUES ('https://mymodernmet.com/wp/wp-content/uploads/archive/NGLtJSuQyFESXP2GtpfF_artofsilk2.jpg', 4, 16);
INSERT INTO ProductImages VALUES ('https://mymodernmet.com/wp/wp-content/uploads/archive/u95FhOGgYxTKxwQmeBQb_Smirnova1.jpg', 4, 16);
INSERT INTO ProductImages VALUES ('https://mymodernmet.com/wp/wp-content/uploads/archive/jJM3Bqml2DycugKLJsau_lisasmirnova2.jpg', 4, 16);
INSERT INTO ProductImages VALUES ('https://mymodernmet.com/wp/wp-content/uploads/archive/OsVkQ9OaV2KwmGOGsH7i_Clough1.jpg', 4, 16);
INSERT INTO ProductImages VALUES ('https://mymodernmet.com/wp/wp-content/uploads/archive/d5TRs3HnPer2gFa3sECH_Clough2.jpg', 4, 16);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/25051748/d/il/63d78a/3073129897/il_340x270.3073129897_tpdn.jpg?version=0', 4, 16);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/24150888/d/il/72055e/2412217572/il_340x270.2412217572_l223.jpg?version=1', 4, 16);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/20217532/d/il/b5f18c/2526639866/il_340x270.2526639866_czx1.jpg?version=0', 4, 16);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/27657494/c/2244/1784/0/1020/il/5e4d57/2938731488/il_340x270.2938731488_35sr.jpg', 4, 16);

-- 17 Cutlery
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/20857969/d/il/4a30b8/2911153761/il_340x270.2911153761_2uo1.jpg?version=0', 4, 17);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/23027958/d/il/a0ac9a/2975918035/il_340x270.2975918035_loeq.jpg?version=0', 4, 17);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/17089118/d/il/81a79d/2027555574/il_340x270.2027555574_3d7s.jpg?version=0', 4, 17);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/13168750/c/2094/1664/161/295/il/33ea32/2860054278/il_340x270.2860054278_78yk.jpg', 4, 17);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/10676639/c/2000/1589/0/854/il/068e53/2247626260/il_340x270.2247626260_dvlb.jpg', 4, 17);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/23288270/c/1982/1573/85/0/il/8b888a/3017364301/il_340x270.3017364301_qqd2.jpg', 4, 17);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/28926522/d/il/c16447/3016197832/il_340x270.3016197832_r9qp.jpg?version=0', 4, 17);
INSERT INTO ProductImages VALUES ('https://i.etsystatic.com/29094200/d/il/a3219f/3076908373/il_340x270.3076908373_j7he.jpg?version=0', 4, 17);


/*

-- OLD STATEMENTS HERE

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

*/