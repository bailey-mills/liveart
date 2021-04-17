import React from "react";
// import Carousel from "react-elastic-carousel";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
                  <Link to={"/auction/"+event.EventID}>
                    <img
                      className="d-block slideshow-img-size "
                      src={event.EventURL}
                      alt={event.EventName}
                    />
                  </Link>
                  <Carousel.Caption>
                    <Link to={"/auction/"+event.EventID} style={{ textDecoration: 'none' }} rel="noopener noreferrer">
                      <h3 className="slideshow-title">{event.EventName}</h3>
                    </Link>
                    <Link to={"/user/"+event.EventHostUsername}>
                      <p className="slideshow-host">{event.EventHostUsername}</p>
                    </Link>
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