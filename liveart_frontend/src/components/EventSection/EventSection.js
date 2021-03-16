import React, {useState, useEffect} from "react";
import Event from "./Event"
import "./EventSection.css"
import CardDeck from "react-bootstrap/Card";


const EventSection = ({ events }) => {
    return (

        <CardDeck style={{display: 'flex', flexDirection: 'row'}} className="zone event-section">
          {
            events.map((user, i) => {
              return (
                <Event
                  id={events[i].ID}
                  name={events[i].Title}
                  url={events[i].ThumbNailURL}
                  />
              );
            })
          }
        </CardDeck>

    );
  }

export default EventSection;