import React from "react";
import "./EventSection.css"
import Card from "react-bootstrap/Card";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Auction from "../Auction/Auction";
import "./Event.css";

const Event = ({ name, id, url }) => {
    return (
      // <a href="#" className='event-frame box zone'>
      //   <div>
      //     <img className="event-img" src={url} alt="event-pic" />
      //   </div>
      //   <div>
      //     <div className="event-name">
      //         <h2>{name}</h2> 
            
      //     </div>
      //     <div className="event-info">
      //         <p>ID: {id}</p>
      //     </div>
      //   </div>
      // </a>

      //target="_blank" rel="noopener noreferrer" -- open in new tab
    <Link to={"/auction/"+name} style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
    <Card className="box shadow p-2 mb-3 bg-body rounded" >
      <Card.Img className="event-img" variant="top" src={url} />
      <div className="card-body2">
        <Card.Title className="title">Title: {name}</Card.Title>
        <Card.Text className="description">
          <p>Description</p>
          <p>Host name:</p>

          {/* {id} */}
        </Card.Text>
        <div className="tags">
          tags:
        </div>
      </div>
    </Card>
    </Link>
    );
  }

export default Event;