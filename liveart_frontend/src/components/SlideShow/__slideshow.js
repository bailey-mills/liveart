import React from "react";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import "./__slideshowstyle.css";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function Slideshow() {
  return (
    <>
      {/* <h1 style={{ textAlign: "center" }}>Example to setup your carousel in react</h1> */}
      <div className="App">
        <Carousel style={{width: "1300px",}}breakPoints={breakPoints}>
          <Item> <img className="slideshow-img" src="https://i.pinimg.com/564x/b6/f4/a0/b6f4a01ddc7d82eff528915c2247207d.jpg" alt="artwork1" style={{width: "100%"}}/> </Item>
          <Item> <img className="slideshow-img" src="https://media.timeout.com/images/105590782/630/472/image.jpg" alt="artwork2" style={{width: "100%"}}/> </Item>
          <Item> <img className="slideshow-img" src="https://static.boredpanda.com/blog/wp-content/uploads/2019/11/Interesting-Stories-Behind-Famous-Masterpieces-5dcd8d865681c__880.jpg" alt="artwork3" style={{width: "100%"}}/> </Item>
          <Item> <img className="slideshow-img" src="https://cdn.theculturetrip.com/wp-content/uploads/2019/01/vincent_van_gogh_-_the_church_in_auvers-sur-oise_view_from_the_chevet_-_google_art_project.jpg" alt="artwork4" style={{width: "100%"}}/> </Item>
          <Item> <img className="slideshow-img" src="https://learnodo-newtonic.com/wp-content/uploads/2019/03/Famous-Paintings-Featured-1.jpg" alt="artwork5" style={{width: "100%"}}/> </Item>
          <Item> <img className="slideshow-img" src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2010/12/02/23/508581.bin?width=1200" alt="artwork6" style={{width: "100%"}}/> </Item>
          <Item> <img className="slideshow-img" src="https://investorplace.com/wp-content/uploads/2020/03/masterworks-review-fine-art-investing.jpg" alt="artwork7" style={{width: "100%"}}/> </Item>
          <Item> <img className="slideshow-img" src="https://image.jimcdn.com/app/cms/image/transf/none/path/sa6549607c78f5c11/image/i6b743a5bd2529b6a/version/1500387064/unmissable-paintings-in-europe-la-clairvoyance-by-magritte.jpg" alt="artwork8" style={{width: "100%"}}/> </Item>
        </Carousel>
      </div>
    </>
  );
}


export default Slideshow;