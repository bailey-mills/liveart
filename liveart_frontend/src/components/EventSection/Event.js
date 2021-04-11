import React from "react";
import "./EventSection.css"
import Card from "react-bootstrap/Card";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Event.css";

function Event(props){


    const tags = [
      {
          "ID": 3,
          "Name": "Abstraction"
      },
      {
          "ID": 4,
          "Name": "Impressionism"
      }
  ];

    return (
      //target="_blank" rel="noopener noreferrer" -- open in new tab
    <Link to={"/auction/"+props.event.EventID} style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
    <Card className="box shadow p-2 mb-3 bg-body rounded" >
      <Card.Img className="event-img" variant="top" src={props.event.URL} />
      <div className="card-body2">
        <Card.Title className="eventtitle">Title: {props.event.EventName}</Card.Title>
        <Card.Text className="eventdescription">
          <ul>
          <li>Host name: {props.event.EventHostUsername} </li>
          <li>Start Time: {props.event.StartTime} </li>
          <li>End Time: {props.event.EndTime} </li>
          <li>Category: {props.event.CategoryName}</li>
          </ul>
          {/* {id} */}
        </Card.Text>
        <div className="eventtags">
          
          <ul className="event-tags-ul">
          {tags.map((tag, index) => {
            return(
              <li>{tag.Name}</li>
            );
          })}
          </ul>
          
          
        </div>
      </div>
    </Card>
    </Link>
    );
  }

export default Event;