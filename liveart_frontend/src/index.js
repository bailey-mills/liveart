import React from "react";
import ReactDOM from "react-dom";
import Slideshow from "./__slideshow";
import Navbar from "./components/Navbar/Navbar";
import './components/Navbar/Navbar.css';
import './index.css'
import EventSection from "./components/EventSection/EventSection"
// import events from "./components/EventSection/eventsSample"

// import Navbar from 'react-bootstrap/Navbar';


const events = [
  {
    id: 1,
    name: 'event1',
    url: "https://kwag.ca/sites/default/files/styles/homepage_slider/public/slider-images/untitled-28.jpg?itok=pd3GJKUg"
  },
  {
    id: 2,
    name: 'event2',
    url: "https://www.tucmag.net/wp-content/uploads/2018/06/HK_Overview_Exhibitors.jpg"

  },
  {
      id: 3,
      name: 'event3',
      url:"https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F84129047%2F197010627980%2F1%2Foriginal.20191210-163245?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C55%2C2414%2C1207&s=70cba5c497adc17584d57e5818c55872"
  },
  {
    id: 4,
    name: 'event4',
    url:"https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F84129047%2F197010627980%2F1%2Foriginal.20191210-163245?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C55%2C2414%2C1207&s=70cba5c497adc17584d57e5818c55872"
  },
  {
    id: 5,
    name: 'event5',
    url:"https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F84129047%2F197010627980%2F1%2Foriginal.20191210-163245?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C55%2C2414%2C1207&s=70cba5c497adc17584d57e5818c55872"
  },
  {
    id: 6,
    name: 'event6',
    url:"https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F84129047%2F197010627980%2F1%2Foriginal.20191210-163245?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C55%2C2414%2C1207&s=70cba5c497adc17584d57e5818c55872"
  },
  {
    id: 7,
    name: 'event7',
    url:"https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F84129047%2F197010627980%2F1%2Foriginal.20191210-163245?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C55%2C2414%2C1207&s=70cba5c497adc17584d57e5818c55872"
  },
  {
    id: 8,
    name: 'event8',
    url:"https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F84129047%2F197010627980%2F1%2Foriginal.20191210-163245?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C55%2C2414%2C1207&s=70cba5c497adc17584d57e5818c55872"
  }

];

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    
    <Navbar />
    <Slideshow />
    <hr/>
    <h1> Events You Subscribed</h1>
    <EventSection events={events}/>
    <hr/>
    <h1> Events You Might be interested in</h1>
    <EventSection events={events}/>
    
  </React.StrictMode>
    
    , rootElement);
