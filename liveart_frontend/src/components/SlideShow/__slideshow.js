import React from "react";
// import Carousel from "react-elastic-carousel";
import Carousel from 'react-bootstrap/Carousel'
import "./__slideshowstyle.css";


function Slideshow() {
  return (
    <>
      {/* <h1 style={{ textAlign: "center" }}>Example to setup your carousel in react</h1> */}
      <div className="App">
        <Carousel interval="7000" className="shadow p-2 mb-3 bg-body rounded carousel-cus-size">
          <Carousel.Item  >
            <img
              className="d-block  slideshow-img-size "
              src="https://i.pinimg.com/564x/b6/f4/a0/b6f4a01ddc7d82eff528915c2247207d.jpg"
              alt="First event"
            />
            <Carousel.Caption>
              <h3>First Event</h3>
              <p> Host: </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item >
            <img
              className="d-block slideshow-img-size"
              src="https://media.timeout.com/images/105590782/630/472/image.jpg"
              alt="Second event"
            />
            <Carousel.Caption>
              <h3>Second Event</h3>
              <p> Host: </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item >
            <img
              className="d-block slideshow-img-size"
              src="https://static.boredpanda.com/blog/wp-content/uploads/2019/11/Interesting-Stories-Behind-Famous-Masterpieces-5dcd8d865681c__880.jpg"
              alt="Third event"
            />
            <Carousel.Caption>
              <h3>Third Event</h3>
              <p> Host: </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block slideshow-img-size"
              src="https://cdn.theculturetrip.com/wp-content/uploads/2019/01/vincent_van_gogh_-_the_church_in_auvers-sur-oise_view_from_the_chevet_-_google_art_project.jpg"
              alt="Forth event"
            />
            <Carousel.Caption>
              <h3>Forth event</h3>
              <p> Host: </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block slideshow-img-size"
              src="https://learnodo-newtonic.com/wp-content/uploads/2019/03/Famous-Paintings-Featured-1.jpg"
              alt="Fifth event"
            />
            <Carousel.Caption>
              <h3>Fifth event</h3>
              <p> Host: </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block slideshow-img-size"
              src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2010/12/02/23/508581.bin?width=1200"
              alt="Sixth event"
            />
            <Carousel.Caption>
              <h3>Sixth Event</h3>
              <p> Host: </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block slideshow-img-size"
              src="https://investorplace.com/wp-content/uploads/2020/03/masterworks-review-fine-art-investing.jpg"
              alt="Seventh event"
            />
            <Carousel.Caption>
              <h3>Seventh Event</h3>
              <p> Host: </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block slideshow-img-size"
              src="https://image.jimcdn.com/app/cms/image/transf/none/path/sa6549607c78f5c11/image/i6b743a5bd2529b6a/version/1500387064/unmissable-paintings-in-europe-la-clairvoyance-by-magritte.jpg"
              alt="eighth event"
            />
            <Carousel.Caption>
              <h3>Eighth Event</h3>
              <p> Host: </p>
            </Carousel.Caption>
          </Carousel.Item>





        </Carousel>
        
        </div>
    </>
  );
}


export default Slideshow;