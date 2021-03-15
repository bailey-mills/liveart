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
                  id={events[i].id}
                  name={events[i].name}
                  url={events[i].url}
                  />
              );
            })
          }
        </CardDeck>

    );
  }

export default EventSection;