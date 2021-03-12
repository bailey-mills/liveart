import React, {useState, useEffect} from "react";
import Event from "./Event"
import "./EventSection.css"


const EventSection = ({ events }) => {
    return (
      <div className="zone event-section">
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
      </div>
    );
  }

export default EventSection;