import React from "react";
import "./EventSection.css"
import Card from "react-bootstrap/Card";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Event.css";
import moment from "moment";

function Event(props){
    return (
      //target="_blank" rel="noopener noreferrer" -- open in new tab
      <Link to={"/auction/"+props.event.EventID} style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
      <Card className="box shadow p-2 mb-3 bg-body rounded" >
        <Card.Img className="event-img" variant="top" src={props.event.EventURL} />
        <div className="card-body2">
          <Card.Title className="eventtitle">{props.event.EventName}</Card.Title>
          <Card.Text className="eventdescription">
            <ul>
              <li>@{props.event.EventHostUsername} </li>
              <li>Start Time: {moment(props.event.StartTime).format('h:mm a (MMM D, YYYY)')} </li>
              <li>End Time: {moment(props.event.EndTime).format('h:mm a (MMM D, YYYY)')} </li>
              <li>Category: {props.event.CategoryName}</li>
            </ul>
          </Card.Text>
          <div className="eventtags">
            
            <ul className="event-tags-ul">
            {
              props.event.EventTags.map((tag, index) => {
                return(
                  <li>{tag.Name}</li>
                );
              })
            }
            </ul>
            
            
          </div>
        </div>
      </Card>
      </Link>
    );
  }

export default Event;