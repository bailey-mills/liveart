import React, {useState, useEffect} from "react";
import Event from "./Event"
import "./EventSection.css"
import CardDeck from "react-bootstrap/Card";

const EventSection = ({ events, eventClass }) => {
  return (
    <CardDeck style={{display: 'flex', flexDirection: 'row'}} className={eventClass}>
      {
        events.map((event, index) => {
          return (
            <Event event={event} />
          );
        })
      }
    </CardDeck>
  );
}

export default EventSection;