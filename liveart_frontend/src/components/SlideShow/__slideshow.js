import React from "react";
// import Carousel from "react-elastic-carousel";
import Carousel from 'react-bootstrap/Carousel'
import "./__slideshowstyle.css";

const Slideshow = ({ events }) => {
  return (
    <>
      {/* <h1 style={{ textAlign: "center" }}>Example to setup your carousel in react</h1> */}
      <div className="App">
        <Carousel className="shadow p-2 mb-3 bg-body rounded carousel-cus-size">
          {
            events.map((event, index) => {
              return (
                <Carousel.Item>
                  <img
                    className="d-block slideshow-img-size "
                    src={event.EventURL}
                    alt={event.EventName}
                  />
                  <Carousel.Caption>
                    <h3 className="slideshow-title">{event.EventName}</h3>
                    <p className="slideshow-host">{event.EventHostUsername}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })
          }
        </Carousel>
      </div>
    </>
  );
}

export default Slideshow;