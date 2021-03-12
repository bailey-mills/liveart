import React from "react";
import "./EventSection.css"

const Event = ({ name, id, url }) => {
    return (
      <a href="#" className='event-frame box zone'>
        <div>
          <img className="event-img" src={url} alt="event-pic" />
        </div>
        <div className="event-name">
            <h2>{name}</h2>
          
        </div>
        <div className="event-info">
            <p>ID: {id}</p>
        </div>
      </a>
    );
  }

export default Event;